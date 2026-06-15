import { Resend } from "resend";
import { resendApiKey } from "./config";

let resendClient: Resend | undefined;

export function getResendClient() {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  resendClient ??= new Resend(resendApiKey);

  return resendClient;
}
