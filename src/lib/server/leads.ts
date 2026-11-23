import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  type: "contact_inquiry" | "quote_request";
  receivedAt: string;
  fullName: string;
  email: string;
  phone?: string;
  details: Record<string, unknown>;
  ip?: string;
  status: "new" | "reviewed" | "contacted";
  storageEngine?: "redis_distributed" | "filesystem_fallback";
}

// In serverless environments (like Vercel), the root file system is read-only.
// Use /tmp on Vercel/AWS Lambda, or local ./data directory during development.
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless ? "/tmp" : path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/**
 * Persists an incoming inquiry or quote request.
 * Primary: Distributed Upstash Redis / Vercel KV REST API.
 * Secondary: Filesystem container fallback (/tmp in serverless, ./data locally).
 */
export async function saveLead(lead: Omit<LeadRecord, "id" | "receivedAt" | "status" | "storageEngine">): Promise<LeadRecord> {
  const record: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    receivedAt: new Date().toISOString(),
    status: "new",
    ...lead,
  };

  const redis = getRedisConfig();

  // 1. Primary: Distributed Redis persistence
  if (redis) {
    try {
      const res = await fetch(`${redis.url}/lpush/nexvora:leads/${encodeURIComponent(JSON.stringify(record))}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redis.token}`,
        },
      });

      if (res.ok) {
        record.storageEngine = "redis_distributed";
        return record;
      }
      console.warn("[Leads Redis Warning] Non-OK status from Redis:", res.status);
    } catch (err) {
      console.error("[Leads Redis Network Error]:", err);
    }
  }

  // 2. Secondary / Local Container Fallback
  record.storageEngine = "filesystem_fallback";
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let existing: LeadRecord[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const content = fs.readFileSync(LEADS_FILE, "utf-8");
        existing = JSON.parse(content || "[]");
      } catch {
        existing = [];
      }
    }

    existing.unshift(record);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existing, null, 2), "utf-8");

    if (process.env.NODE_ENV === "production" && !redis) {
      console.warn(
        "[Security Audit Warning] Lead saved to temporary container file system (/tmp/leads.json). " +
        "Configure UPSTASH_REDIS_REST_URL or KV_REST_API_URL in production for durable cross-instance persistence."
      );
    }
  } catch (err) {
    console.error("[Leads File System Storage Error]:", err);
  }

  return record;
}

/**
 * Retrieves leads from distributed Redis or local container fallback.
 */
export async function getLeads(): Promise<LeadRecord[]> {
  const redis = getRedisConfig();

  // 1. Try Redis first
  if (redis) {
    try {
      const res = await fetch(`${redis.url}/lrange/nexvora:leads/0/99`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${redis.token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.result)) {
          return data.result.map((item: string | LeadRecord) => {
            if (typeof item === "string") {
              try {
                return JSON.parse(item);
              } catch {
                return null;
              }
            }
            return item;
          }).filter(Boolean);
        }
      }
    } catch (err) {
      console.error("[Leads Redis Retrieve Error]:", err);
    }
  }

  // 2. Fallback to file system
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return [];
    }
    const content = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}
