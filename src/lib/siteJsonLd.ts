import "server-only";

import { resolveJsonLd, type JsonLdValue } from "@/lib/jsonLd";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_PAGE_JSON_LD_QUERY } from "@/sanity/lib/queries";
import type { SitePageJsonLd } from "@/sanity/lib/types";

export async function getSitePageJsonLd(
  pageKey: string,
  fallback: JsonLdValue
) {
  const pageJsonLd = await sanityFetch<SitePageJsonLd>({
    query: SITE_PAGE_JSON_LD_QUERY,
    params: { pageKey },
    tags: ["json-ld"],
  });

  return resolveJsonLd(pageJsonLd?.jsonLd, fallback);
}
