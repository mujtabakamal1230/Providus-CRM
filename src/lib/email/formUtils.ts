export interface ValidationResult<T> {
  data?: T;
  error?: string;
}

type StringFieldResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}\s'.-]+$/u;
const phonePattern = /^\d{7,20}$/;
const meaningfulTextPattern = /[\p{L}\p{N}]/u;

export function getStringField(
  body: Record<string, unknown>,
  field: string,
  label: string,
  maxLength = 2000
): StringFieldResult {
  const value = body[field];

  if (typeof value !== "string") {
    return { ok: false, error: `${label} is required.` };
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { ok: false, error: `${label} is required.` };
  }

  if (trimmedValue.length > maxLength) {
    return { ok: false, error: `${label} is too long.` };
  }

  return { ok: true, value: trimmedValue };
}

export function validateEmail(value: string) {
  return emailPattern.test(value);
}

export function validateName(value: string) {
  return namePattern.test(value);
}

export function validatePhone(value: string) {
  return phonePattern.test(value);
}

export function hasMeaningfulText(value: string) {
  return meaningfulTextPattern.test(value);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatPlainTextFields(fields: Array<[string, string]>) {
  return fields.map(([label, value]) => `${label}: ${value}`).join("\n");
}

export function formatHtmlFields(fields: Array<[string, string]>) {
  return `
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111827;">
      <tbody>
        ${fields
          .map(
            ([label, value]) => `
              <tr>
                <td style="width:160px;padding:10px 12px;border:1px solid #e5e7eb;font-weight:700;background:#f9fafb;">${escapeHtml(label)}</td>
                <td style="padding:10px 12px;border:1px solid #e5e7eb;white-space:pre-line;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}
