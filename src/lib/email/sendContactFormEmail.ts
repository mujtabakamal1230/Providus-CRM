import { contactFormRecipient, resendFromEmail } from "./config";
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

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function parseContactFormPayload(
  body: unknown
): ValidationResult<ContactFormPayload> {
  if (!isRecord(body)) {
    return { error: "Invalid contact form payload." };
  }

  const name = getStringField(body, "name", "Name", 100);
  const email = getStringField(body, "email", "Email", 100);
  const phone = getStringField(body, "phone", "Phone", 20);
  const company = getStringField(body, "company", "Company", 150);
  const message = getStringField(body, "message", "Message", 1000);

  if (!name.ok) return { error: name.error };
  if (!email.ok) return { error: email.error };
  if (!phone.ok) return { error: phone.error };
  if (!company.ok) return { error: company.error };
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

  if (!validatePhone(phone.value)) {
    return { error: "Phone must contain 7 to 20 digits only." };
  }

  if (!hasMeaningfulText(company.value)) {
    return { error: "Company must include letters or numbers." };
  }

  if (!hasMeaningfulText(message.value)) {
    return { error: "Message must include letters or numbers." };
  }

  return {
    data: {
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      message: message.value,
    },
  };
}

export async function sendContactFormEmail(payload: ContactFormPayload) {
  const fields: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Company", payload.company],
    ["Message", payload.message],
  ];

  const result = await getResendClient().emails.send({
    from: resendFromEmail,
    to: [contactFormRecipient],
    replyTo: payload.email,
    subject: `New contact form submission from ${payload.name}`,
    text: formatPlainTextFields(fields),
    html: `
      <div style="font-family:Arial,sans-serif;color:#111827;">
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;">New contact form submission</h1>
        ${formatHtmlFields(fields)}
      </div>
    `,
  });

  if (result.error) {
    throw new Error(result.error.message || "Failed to send contact form email.");
  }

  return result.data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
