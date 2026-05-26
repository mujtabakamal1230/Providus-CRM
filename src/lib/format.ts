export function formatDate(date?: string): string {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
