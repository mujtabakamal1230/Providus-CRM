import { resendFromEmail, serviceFormRecipient } from "./config";
import {
  formatHtmlFields,
  formatPlainTextFields,
  getStringField,
  hasMeaningfulText,
  validateEmail,
  validateName,
  validatePhone,
  type ValidationResult,
} from "./formUtils";
import { getResendClient } from "./resendClient";

export interface ServiceInquiryPayload {
  serviceTitle: string;
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

export function parseServiceInquiryPayload(
  body: unknown
): ValidationResult<ServiceInquiryPayload> {
  if (!isRecord(body)) {
    return { error: "Invalid service inquiry payload." };
  }

  const serviceTitle = getStringField(body, "serviceTitle", "Service", 250);
  const name = getStringField(body, "name", "Name", 100);
  const email = getStringField(body, "email", "Email", 100);
  const contactNumber = getStringField(
    body,
    "contactNumber",
    "Contact number",
    20
  );
  const message = getStringField(body, "message", "Message", 1000);

  if (!serviceTitle.ok) return { error: serviceTitle.error };
  if (!name.ok) return { error: name.error };
  if (!email.ok) return { error: email.error };
  if (!contactNumber.ok) return { error: contactNumber.error };
  if (!message.ok) return { error: message.error };

  if (!validateName(name.value)) {
    return {
      error:
        "Name can only include letters, spaces, apostrophes, periods, and hyphens.",
    };
  }

  if (!validateEmail(email.value)) {
    return { error: "Please enter a valid email address." };
  }

  if (!validatePhone(contactNumber.value)) {
    return { error: "Contact number must contain 7 to 20 digits only." };
  }

  if (!hasMeaningfulText(message.value)) {
    return { error: "Message must include letters or numbers." };
  }

  return {
    data: {
      serviceTitle: serviceTitle.value,
      name: name.value,
      email: email.value,
      contactNumber: contactNumber.value,
      message: message.value,
    },
  };
}

export async function sendServiceFormEmail(payload: ServiceInquiryPayload) {
  const fields: Array<[string, string]> = [
    ["Service", payload.serviceTitle],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Contact number", payload.contactNumber],
    ["Message", payload.message],
  ];

  const result = await getResendClient().emails.send({
    from: resendFromEmail,
    to: [serviceFormRecipient],
    replyTo: payload.email,
    subject: `New service inquiry: ${payload.serviceTitle}`,
    text: formatPlainTextFields(fields),
    html: `
      <div style="font-family:Arial,sans-serif;color:#111827;">
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;">New service inquiry</h1>
        ${formatHtmlFields(fields)}
      </div>
    `,
  });

  if (result.error) {
    throw new Error(result.error.message || "Failed to send service inquiry email.");
  }

  return result.data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
