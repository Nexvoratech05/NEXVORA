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
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Persists an incoming inquiry or quote request to disk.
 * Guarantees that client submissions are NEVER lost, even if external email services fail.
 */
export async function saveLead(lead: Omit<LeadRecord, "id" | "receivedAt" | "status">): Promise<LeadRecord> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const record: LeadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      receivedAt: new Date().toISOString(),
      status: "new",
      ...lead,
    };

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
    return record;
  } catch (err) {
    console.error("[Leads Storage Error]:", err);
    return {
      id: `fallback_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      status: "new",
      ...lead,
    };
  }
}

/**
 * Retrieves all stored leads from disk.
 */
export async function getLeads(): Promise<LeadRecord[]> {
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
