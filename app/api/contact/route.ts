import { NextResponse } from "next/server";
import { parseLead, type Lead } from "@/src/lib/lead";

/*
 * Recibe el formulario de calificación.
 * Transportes (al menos uno en producción):
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ RESEND_FROM con dominio verificado)
 *   LEAD_WEBHOOK_URL (+ LEAD_WEBHOOK_SECRET opcional) para n8n/Make
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadRows(lead: Lead): [string, string][] {
  return [
    ["Empresa", lead.company],
    ["Necesita", lead.needs.join(", ")],
    ["Momento de marca", lead.stage],
    ["Si no lo resuelve en 90 días", lead.stakes],
    ["Presupuesto", lead.budget],
    ["Plazo", lead.timing],
    ["Nombre", lead.name],
    ["Correo", lead.email],
    ["Canal preferido", lead.channel],
    ["WhatsApp", lead.phone || "-"],
    ["Idioma", lead.locale],
  ];
}

async function sendEmail(lead: Lead): Promise<void> {
  const html = `<h2>Nueva solicitud de ${escapeHtml(lead.company)}</h2><table cellpadding="6">${leadRows(lead)
    .map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Cree Studio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: lead.email,
      subject: `Nuevo lead: ${lead.company} (${lead.budget})`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function sendWebhook(lead: Lead): Promise<void> {
  const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET ? { "x-webhook-secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({ type: "lead", receivedAt: new Date().toISOString(), lead }),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot relleno: respondemos OK para no dar pistas al bot, y no enviamos nada.
  if (typeof body === "object" && body !== null && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const tasks: Promise<void>[] = [];
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) tasks.push(sendEmail(lead));
  if (process.env.LEAD_WEBHOOK_URL) tasks.push(sendWebhook(lead));

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Lead recibido (sin transporte configurado en local):", lead);
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] Falta configurar RESEND_API_KEY/CONTACT_TO_EMAIL o LEAD_WEBHOOK_URL.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[contact]", r.reason);
  });
  if (results.every((r) => r.status === "rejected")) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
