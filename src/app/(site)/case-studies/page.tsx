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
      <svg
        width="65"
        height="34"
        viewBox="0 0 65 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block ml-4 align-middle"
        aria-hidden="true"
      >
        <path
          d="M10 29C20 29 23 5 37 5"
          stroke="#38A81B"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M28 29C38 29 41 5 55 5"
          stroke="#A0FF88"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
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
