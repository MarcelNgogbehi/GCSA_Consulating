import { NextResponse } from "next/server";
import {
  checkCredentials,
  createSessionToken,
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!checkCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
