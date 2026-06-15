import { NextResponse } from "next/server";
import {
  parseServiceInquiryPayload,
  sendServiceFormEmail,
} from "@/lib/email/sendServiceFormEmail";
import { getEmailDeliveryErrorMessage } from "@/lib/email/errors";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedPayload = parseServiceInquiryPayload(body);

  if (!parsedPayload.data) {
    return NextResponse.json(
      { message: parsedPayload.error || "Invalid service inquiry request." },
      { status: 400 }
    );
  }

  try {
    await sendServiceFormEmail(parsedPayload.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Service inquiry email failed", error);

    return NextResponse.json(
      { message: getEmailDeliveryErrorMessage(error) },
      { status: 500 }
    );
  }
}
