import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

/**
 * GET /api/inquiries
 * Retrieves all stored leads and inquiries with statistics.
 * SECURITY: Protected endpoint requiring ADMIN_API_KEY authentication.
 */
export async function GET(req: NextRequest) {
  try {
    const adminKey = process.env.ADMIN_API_KEY;
    const authHeader = req.headers.get("authorization");
    const adminHeader = req.headers.get("x-admin-key");

    const providedKey =
      adminHeader || (authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null);

    // Authentication verification
    if (process.env.NODE_ENV === "production" || adminKey) {
      if (!adminKey || !providedKey || providedKey !== adminKey) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Valid ADMIN_API_KEY required in Authorization header or x-admin-key header.",
          },
          { status: 401 }
        );
      }
    } else {
      console.warn(
        "[Security Notice] /api/inquiries accessed in development without ADMIN_API_KEY configured."
      );
    }

    const { searchParams } = new URL(req.url);
    const typeFilter = searchParams.get("type"); // "contact_inquiry" | "quote_request"
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const allLeads = await getLeads();

    let filtered = allLeads;
    if (typeFilter && (typeFilter === "contact_inquiry" || typeFilter === "quote_request")) {
      filtered = allLeads.filter((l) => l.type === typeFilter);
    }

    const inquiriesCount = allLeads.filter((l) => l.type === "contact_inquiry").length;
    const quotesCount = allLeads.filter((l) => l.type === "quote_request").length;

    return NextResponse.json({
      success: true,
      total: allLeads.length,
      stats: {
        contactInquiries: inquiriesCount,
        quoteRequests: quotesCount,
      },
      leads: filtered.slice(0, limit),
    });
  } catch (err) {
    console.error("[API /api/inquiries Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve inquiries" },
      { status: 500 }
    );
  }
}
