import type { Metadata } from "next";
import {
  HeroSection,
  PartnersSection,
  CaseStudiesSection,
  CtaSection,
} from "@/components/sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import type { CaseStudyListItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore real-world Providus CRM Salesforce implementations, automation projects, and customer operations success stories.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await sanityFetch<CaseStudyListItem[]>({
    query: CASE_STUDIES_QUERY,
    tags: ["case-studies"],
  });

  const caseStudyCards = (caseStudies ?? []).map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    description: caseStudy.excerpt ?? "",
    image: caseStudy.coverImage?.asset?.url ?? "/images/case-study.png",
    badges: caseStudy.technologies ?? [],
    resultSummary: caseStudy.resultSummary,
  }));

  const heroTitle = (
    <>
      Our Case Studies
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-10 w-auto align-baseline ml-1"
      />
    </>
  );

  return (
    <>
      <HeroSection title={heroTitle} hideImage />
      <PartnersSection />
      <CaseStudiesSection caseStudies={caseStudyCards} />
      <CtaSection />
    </>
  );
}
