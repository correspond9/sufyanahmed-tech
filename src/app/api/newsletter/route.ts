import { NextResponse } from "next/server";
import { sendNewsletterSignup } from "@/lib/newsletter";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: { email?: string; website?: string };

  try {
    body = (await request.json()) as { email?: string; website?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  if (body.website) return NextResponse.json({ ok: true });

  const email = body.email?.trim() ?? "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  try {
    await sendNewsletterSignup(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      return NextResponse.json(
        { ok: false, code: "NOT_CONFIGURED" },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "Could not subscribe. Try again later." },
      { status: 502 },
    );
  }
}
