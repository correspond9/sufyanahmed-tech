import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 120 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "One or more fields exceed the maximum length." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          ok: false,
          code: "NOT_CONFIGURED",
          error: "Contact form email is not configured on the server.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to send your message right now. Please email hello@sufyanahmed.tech directly.",
      },
      { status: 502 },
    );
  }
}
