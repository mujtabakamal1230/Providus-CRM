import type { JsonLdField } from "@/sanity/lib/types";

export type JsonLdValue =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export function resolveJsonLd(
  jsonLd?: JsonLdField,
  fallback?: JsonLdValue
): JsonLdValue | null {
  if (jsonLd?.enabled === false) {
    return null;
  }

  if (jsonLd?.schemaJson) {
    try {
      return JSON.parse(jsonLd.schemaJson) as JsonLdValue;
    } catch {
      return fallback || null;
    }
  }

  return fallback || null;
}

export function stringifyJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
