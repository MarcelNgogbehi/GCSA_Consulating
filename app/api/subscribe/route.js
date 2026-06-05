import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { notifyNewSubscriber } from "@/lib/email";

/**
 * POST /api/subscribe
 *
 * Newsletter sign-up from the footer form. Idempotent on email: a repeat
 * sign-up counts as success. Notifies the team only on a genuinely new
 * subscriber.
 *
 * Body: { email, firstName?, lastName?, source? }
 */

export const runtime = "nodejs";

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());
const str = (v, max = 200) => String(v ?? "").trim().slice(0, max);

export async function POST(req) {
  try {
    const body = await req.json();
    const email = str(body.email).toLowerCase();
    const firstName = str(body.firstName, 100);
    const lastName = str(body.lastName, 100);
    const source = str(body.source, 60) || "footer";

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    const doc = await prisma.subscriber.create({
      data: { email, firstName, lastName, source },
    });
    await Promise.allSettled([notifyNewSubscriber(doc)]);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    // Unique-constraint race: another request inserted the same email first.
    if (err && err.code === "P2002") {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error("[/api/subscribe] error:", err);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 }
    );
  }
}
