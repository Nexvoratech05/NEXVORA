import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/server/leads";

/**
 * GET /api/inquiries
 * Retrieves all stored leads and inquiries with statistics.
 */
export async function GET(req: NextRequest) {
  try {
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
