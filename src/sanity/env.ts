export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "00000000";

export const studioUrl = "/studio";

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
);

export const readToken = process.env.SANITY_API_READ_TOKEN;

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
