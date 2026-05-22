import type { Metadata } from "next";
import {
  HeroSection,
  PartnersSection,
  CaseStudiesSection,
  CtaSection
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore our real-world success stories, custom Salesforce implementations, and compliance automation case studies.",
};

export default function CaseStudiesPage() {
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
        <path d="M10 29C20 29 23 5 37 5" stroke="#38A81B" strokeWidth="8" strokeLinecap="round" />
        <path d="M28 29C38 29 41 5 55 5" stroke="#A0FF88" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </>
  );

  return (
    <>
      <HeroSection
        title={heroTitle}
        hideImage={true}
      />
      <PartnersSection />
      <CaseStudiesSection />
      <CtaSection />
    </>
  );
}
