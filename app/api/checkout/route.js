import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { notifyRegistration } from "@/lib/email";
import { getProgramme } from "@/lib/programmes";

/**
 * POST /api/checkout
 *
 * One-step trainee registration.
 *
 * Flow:
 *   1. Capture the trainee (name, email, mobile, experience) to Postgres so
 *      they appear in the admin dashboard immediately, marked
 *      "awaiting_payment".
 *   2. Return the hosted Stripe Payment Link; the browser redirects there to
 *      take the payment. No Stripe secret key / API checkout session is used.
 *
 * Request body:
 *   {
 *     programmeId: "transition-to-architecture",
 *     name: "Jane Doe",          // or firstName / lastName
 *     email, phone, experience
 *   }
 *
 * Response:
 *   200 → { url: "https://buy.stripe.com/..." }
 *   400/404/500 → { error: "..." }
 *
 * Required env vars:
 *  - NEXT_PUBLIC_SITE_URL  (used only for absolute links in notifications)
 */

export const runtime = "nodejs";

// Trim + cap a value to keep DB columns tidy.
const clamp = (v, max = 490) => String(v ?? "").trim().slice(0, max);

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());

// Split "Jane Mary Doe" → { firstName: "Jane", lastName: "Mary Doe" }.
function splitName(name, firstName, lastName) {
  if (firstName || lastName) {
    return { firstName: clamp(firstName, 100), lastName: clamp(lastName, 100) };
  }
  const parts = clamp(name, 200).split(/\s+/).filter(Boolean);
  return {
    firstName: clamp(parts[0] || "", 100),
    lastName: clamp(parts.slice(1).join(" "), 100),
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { programmeId, name, firstName, lastName, email, phone, experience } =
      body || {};

    // ── Validate ─────────────────────────────────────────────────────
    if (!programmeId || typeof programmeId !== "string") {
      return NextResponse.json({ error: "Missing programmeId" }, { status: 400 });
    }
    const programme = getProgramme(programmeId);
    if (!programme) {
      return NextResponse.json({ error: "Unknown programme" }, { status: 404 });
    }

    const { firstName: fn, lastName: ln } = splitName(name, firstName, lastName);
    if (!fn) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!clamp(phone)) {
      return NextResponse.json(
        { error: "Please enter your mobile number." },
        { status: 400 }
      );
    }

    // ── Trainee record ───────────────────────────────────────────────
    const details = {
      programmeId: clamp(programme.id, 100),
      plan: "registration",
      firstName: fn,
      lastName: ln,
      email: clamp(String(email).toLowerCase(), 200),
      phone: clamp(phone, 50),
      experience: clamp(experience, 50),
    };

    // Persist so it shows in the admin dashboard. Each submission is its own
    // lead (keyed by a generated id); the Payment Link itself takes the money.
    await prisma.registration.create({
      data: {
        ...details,
        stripeSessionId: `link_${randomUUID()}`,
        amountTotal: programme.registrationFeeInPence,
        currency: programme.currency,
        paymentStatus: "awaiting_payment",
      },
    });

    // Notify the team (best-effort, never blocks the redirect).
    notifyRegistration(details).catch(() => {});

    // ── Hand back the Stripe Payment Link (with the email pre-filled) ──
    const url = new URL(programme.paymentLink);
    url.searchParams.set("prefilled_email", details.email);

    return NextResponse.json({ url: url.toString() });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json(
      { error: err?.message || "Could not start registration" },
      { status: 500 }
    );
  }
}
