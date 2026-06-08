import { author } from "./author";
import { blockContent } from "./blockContent";
import { caseStudy } from "./caseStudy";
import { category } from "./category";
import { jsonLd } from "./jsonLd";
import { post } from "./post";
import { seo } from "./seo";
import { servicePage } from "./servicePage";
import { sitePageJsonLd } from "./sitePageJsonLd";

export const schemaTypes = [
  post,
  caseStudy,
  servicePage,
  sitePageJsonLd,
  author,
  category,
  blockContent,
  seo,
  jsonLd,
];
