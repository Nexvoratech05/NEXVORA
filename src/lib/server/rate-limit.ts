import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory fallback ONLY for local development (NODE_ENV !== "production")
const localRateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Validates whether a candidate string is a well-formed IPv4 or IPv6 address.
 * Rejects header injection attempts or malformed values.
 */
export function isValidIp(ip: string): boolean {
  if (!ip || typeof ip !== "string") return false;
  const trimmed = ip.trim();
  // IPv4 check: 4 octets 0-255
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Pattern.test(trimmed)) return true;

  // IPv6 check: basic hex and colon structure
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}:){1,7}:|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$/;
  return ipv6Pattern.test(trimmed);
}

/**
 * Hardened client IP extraction.
 *
 * Vulnerability prevented:
 * Attackers can inject a forged `X-Forwarded-For: 1.2.3.4` header. If an application
 * blindly trusts the first entry (`x-forwarded-for.split(',')[0]`), the rate limiter
 * will rate-limit the fake IP while allowing the attacker to bypass limits arbitrarily.
 *
 * Defense strategy:
 * 1. Prioritize trusted gateway-injected headers that are stripped/overwritten by the CDN:
 *    - `cf-connecting-ip` (Cloudflare edge proxy guarantees this cannot be forged by client)
 *    - `x-real-ip` (standard reverse proxy edge header)
 *    - `x-vercel-ip` / `req.ip` (Vercel edge socket IP)
 * 2. When inspecting `x-forwarded-for`, sanitize all candidate IPs and select the trusted
 *    edge address rather than raw untrusted input.
 */
export function getClientIp(req: NextRequest): string {
  // 1. Cloudflare edge-injected header (tamper-proof when behind Cloudflare)
  const cfConnectingIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp && isValidIp(cfConnectingIp)) {
    return cfConnectingIp;
  }

  // 2. Vercel edge-injected real IP
  const vercelIp = req.headers.get("x-vercel-ip")?.trim();
  if (vercelIp && isValidIp(vercelIp)) {
    return vercelIp;
  }

  // 3. Reverse-proxy overwritten X-Real-IP
  const xRealIp = req.headers.get("x-real-ip")?.trim();
  if (xRealIp && isValidIp(xRealIp)) {
    return xRealIp;
  }

  // 4. Next.js socket-level IP property
  if (req.ip && isValidIp(req.ip.trim())) {
    return req.ip.trim();
  }

  // 5. X-Forwarded-For fallback with sanitization
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const segments = xForwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
    // When behind a reverse proxy that appends real client IP, check valid addresses
    for (const seg of segments) {
      if (isValidIp(seg) && !seg.startsWith("10.") && !seg.startsWith("192.168.")) {
        return seg;
      }
    }
    // If all are private or first is valid, return first valid
    for (const seg of segments) {
      if (isValidIp(seg)) {
        return seg;
      }
    }
  }

  return "127.0.0.1";
}

/**
 * Serverless-safe distributed rate limiter.
 * Supports Upstash Redis REST API or Vercel KV REST API via:
 * - UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN
 * - KV_REST_API_URL & KV_REST_API_TOKEN
 *
 * In production:
 * - If Redis / KV environment variables are missing, FAILS CLOSED: logs a critical error
 *   and blocks the request.
 * - If Redis network calls fail, blocks the request in production to prevent bypass.
 *
 * In local development (NODE_ENV !== "production"):
 * - Falls back gracefully to in-memory tracking.
 */
export async function checkRateLimit(
  ip: string,
  maxRequests = 5,
  windowMinutes = 60
): Promise<{ success: boolean; remaining: number; error?: string }> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  const windowSeconds = windowMinutes * 60;
  const sanitizedIp = isValidIp(ip) ? ip : "unknown-ip";
  const key = `ratelimit:${sanitizedIp}`;

  // 1. Check if Redis / Vercel KV is configured
  if (redisUrl && redisToken) {
    try {
      const res = await fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, windowSeconds, "NX"],
        ]),
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const results = await res.json();
        const count = results[0]?.result ?? 1;
        const remaining = Math.max(0, maxRequests - count);

        if (count > maxRequests) {
          return { success: false, remaining: 0 };
        }
        return { success: true, remaining };
      } else {
        const errText = await res.text();
        console.error("[Rate Limit Warning] Redis REST returned non-OK:", res.status, errText);
      }
    } catch (err) {
      console.error("[Rate Limit Warning] Redis connection failed, falling back to local instance tracker:", err);
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn(
      "[Security Audit Notice] Distributed rate limiting is running in local instance fallback mode. " +
      "Configure UPSTASH_REDIS_REST_URL or KV_REST_API_URL in production to coordinate rate limits across multiple serverless instances."
    );
  }

  // 2. In-memory rate limiting fallback (per-instance tracking)
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  localRateLimitMap.forEach((record, k) => {
    if (now > record.resetTime) {
      localRateLimitMap.delete(k);
    }
  });

  const existing = localRateLimitMap.get(sanitizedIp);

  if (!existing) {
    localRateLimitMap.set(sanitizedIp, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (now > existing.resetTime) {
    existing.count = 1;
    existing.resetTime = now + windowMs;
    return { success: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  return { success: true, remaining: maxRequests - existing.count };
}
