import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { notifyContactMessage, confirmContactMessage } from "@/lib/email";

/**
 * POST /api/contact
 *
 * Receives a submission from the /contact page form, stores it in Postgres,
 * emails the team, and sends the visitor a confirmation.
 *
 * Body: { firstName, lastName, email, phone?, company?, subject?, message }
 */

export const runtime = "nodejs";

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());
const str = (v, max = 5000) => String(v ?? "").trim().slice(0, max);

export async function POST(req) {
  try {
    const body = await req.json();
    const firstName = str(body.firstName, 100);
    const lastName = str(body.lastName, 100);
    const email = str(body.email, 200).toLowerCase();
    const phone = str(body.phone, 50);
    const company = str(body.company, 200);
    const subject = str(body.subject, 120) || "General Enquiry";
    const message = str(body.message, 5000);

    if (!firstName || !lastName || !isEmail(email) || !message) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const doc = await prisma.contactMessage.create({
      data: { firstName, lastName, email, phone, company, subject, message },
    });

    // Emails are best-effort and run in parallel; failures don't 500.
    await Promise.allSettled([
      notifyContactMessage(doc),
      confirmContactMessage(doc),
    ]);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
