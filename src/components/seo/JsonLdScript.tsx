import type { JsonLdValue } from "@/lib/jsonLd";
import { stringifyJsonLd } from "@/lib/jsonLd";

interface JsonLdScriptProps {
  data?: JsonLdValue | null;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
