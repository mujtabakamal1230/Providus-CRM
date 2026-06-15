export const resendApiKey = process.env.RESEND_API_KEY;

export const resendFromEmail =
  process.env.RESEND_FROM_EMAIL || "Providus CRM <connect@providuscrm.co.uk>";

export const contactFormRecipient =
  process.env.CONTACT_FORM_TO_EMAIL || "connect@providuscrm.co.uk";

export const serviceFormRecipient =
  process.env.SERVICE_FORM_TO_EMAIL || contactFormRecipient;
