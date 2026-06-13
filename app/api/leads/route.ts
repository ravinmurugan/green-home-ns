import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type EmailLead = {
  type: "email";
  email: string;
  source: string;
};

type InstallerLead = {
  type: "installer-lead";
  name: string;
  email: string;
  phone: string;
  postal: string;
  service: string;
  installerSlug: string;
  installerName: string;
  message?: string;
};

type Lead = EmailLead | InstallerLead;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isInstallerLead(body: Record<string, unknown>): boolean {
  return body.type === "installer-lead";
}

async function fireWebhook(payload: Record<string, unknown>): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("lead_webhook_error", err);
  }
}

async function sendNotifyEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const subject =
    lead.type === "installer-lead"
      ? `New quote request: ${lead.installerName} — ${lead.name}`
      : `New email signup (${lead.source})`;

  const lines = Object.entries(lead)
    .map(([k, v]) => `<strong>${k}:</strong> ${String(v ?? "")}`)
    .join("<br>");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "GreenHomeNS Leads <leads@greenhomens.com>",
        to: [to],
        subject,
        html: `<h2>${subject}</h2><p>${lines}</p>`,
      }),
    });
  } catch (err) {
    console.error("lead_notify_email_error", err);
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  if (isInstallerLead(body)) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }
  }

  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "";
  const ua = request.headers.get("user-agent") ?? "";
  const ts = new Date().toISOString();

  const lead = { ...body, email } as Lead;

  // Single-line JSON for Vercel logs
  console.log(JSON.stringify({ event: "lead", ...lead, ts, ip, ua }));

  // Fire-and-forget external integrations — never block or break the response.
  void fireWebhook({ ...lead, ts, ip, ua });
  void sendNotifyEmail(lead);

  return NextResponse.json({ ok: true });
}
