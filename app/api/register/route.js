import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { notifyRegistration, confirmRegistration } from "@/lib/email";
import { getProgramme } from "@/lib/programmes";

/**
 * POST /api/register
 *
 * One-step training registration (data capture only, no payment).
 *
 * Flow:
 *   1. Capture the trainee (name, email, mobile, experience) to Postgres so
 *      they appear in the admin dashboard immediately, marked "registered".
 *   2. Email the team + the dedicated registrations inbox, and send the
 *      registrant a confirmation. All emails are best-effort and never block
 *      the response.
 *   3. Return { ok: true }; the browser shows an in-place confirmation.
 *
 * Request body:
 *   { programmeId, name (or firstName/lastName), email, phone, experience }
 *
 * Response:
 *   200 → { ok: true }
 *   400/404/500 → { error: "..." }
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
    // lead, keyed by a generated id in the (still unique) stripeSessionId column.
    await prisma.registration.create({
      data: {
        ...details,
        stripeSessionId: `reg_${randomUUID()}`,
        paymentStatus: "registered",
      },
    });

    // Notify the team + registrant (best-effort, never blocks the response).
    notifyRegistration(details).catch(() => {});
    confirmRegistration(details).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/register] error:", err);
    return NextResponse.json(
      { error: err?.message || "Could not complete registration" },
      { status: 500 }
    );
  }
}
