import "server-only";

import { resolveJsonLd, type JsonLdValue } from "@/lib/jsonLd";
import { getStaticPageSeo, type StaticPageKey } from "@/lib/staticPageSeo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_PAGE_JSON_LD_QUERY } from "@/sanity/lib/queries";
import type { SitePageJsonLd } from "@/sanity/lib/types";

export async function getSitePageJsonLd(
  pageKey: StaticPageKey,
  fallback: JsonLdValue
) {
  const [pageSeo, pageJsonLd] = await Promise.all([
    getStaticPageSeo(pageKey),
    sanityFetch<SitePageJsonLd>({
      query: SITE_PAGE_JSON_LD_QUERY,
      params: { pageKey },
      tags: ["json-ld"],
    }),
  ]);

  return resolveJsonLd(pageSeo?.jsonLd || pageJsonLd?.jsonLd, fallback);
}
