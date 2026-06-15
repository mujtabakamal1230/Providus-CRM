export function getEmailDeliveryErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Unable to send your message right now.";
  }

  if (error.message === "RESEND_API_KEY is not configured.") {
    return "Email service is not configured.";
  }

  if (error.message.toLowerCase().includes("domain is not verified")) {
    return "Email sender domain is not verified in Resend.";
  }

  return "Unable to send your message right now.";
}
