import { NextResponse } from "next/server";
import {
  parseContactFormPayload,
  sendContactFormEmail,
} from "@/lib/email/sendContactFormEmail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedPayload = parseContactFormPayload(body);

  if (!parsedPayload.data) {
    return NextResponse.json(
      { message: parsedPayload.error || "Invalid contact form request." },
      { status: 400 }
    );
  }

  try {
    await sendContactFormEmail(parsedPayload.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      { message: getEmailErrorMessage(error) },
      { status: 500 }
    );
  }
}

function getEmailErrorMessage(error: unknown) {
  if (
    error instanceof Error &&
    error.message === "RESEND_API_KEY is not configured."
  ) {
    return "Email service is not configured.";
  }

  return "Unable to send your message right now.";
}
