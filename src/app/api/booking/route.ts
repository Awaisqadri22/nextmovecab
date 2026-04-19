import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  bookingRequestSchema,
  type BookingRequestPayload,
} from "@/lib/booking-schema";

const DEFAULT_NOTIFY_EMAIL = "rizaam70@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const KIND_LABEL: Record<BookingRequestPayload["kind"], string> = {
  "airport-pickup": "Airport pickup",
  "airport-dropoff": "Airport drop-off",
  "city-tour": "City tour",
  custom: "Custom ride",
};

function buildEmailHtml(data: BookingRequestPayload): string {
  const rows: [string, string][] = [
    ["Booking type", KIND_LABEL[data.kind]],
    ["Service", data.serviceTitle],
    ["Full name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Pickup", data.pickupLocation],
    ["Drop-off", data.dropoffLocation],
  ];

  const bodyRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb">${escapeHtml(k)}</th><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
<h1 style="font-size:1.25rem">New booking request</h1>
<table style="border-collapse:collapse;max-width:640px">${bodyRows}</table>
<p style="font-size:0.875rem;color:#6b7280">Reply to this message to reach the customer at their email.</p>
</body></html>`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid data",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Booking email is not configured. Add RESEND_API_KEY to the server environment.",
      },
      { status: 503 },
    );
  }

  const to =
    process.env.BOOKING_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL;
  const from =
    process.env.BOOKING_FROM_EMAIL?.trim() ||
    "Next Move Bookings <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `Booking: ${data.serviceTitle} — ${data.fullName}`,
    html: buildEmailHtml(data),
  });

  if (error) {
    console.error("[booking] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send booking email. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
