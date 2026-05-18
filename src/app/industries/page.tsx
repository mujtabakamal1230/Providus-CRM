import {
  HeroSection,
  IndustryDetailSection,
  PlatformsSection,
  CtaSection
} from "@/components/sections";

export default function IndustriesPage() {
  const heroTitle = (
    <>
      Salesforce for{" "}
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
      <br />
      Every Industry
    </>
  );

  return (
    <>
      <HeroSection
        title={heroTitle}
        description="Deep technical knowledge across every core Salesforce platform. We don't just configure; we engineer CRM systems that drive real business outcomes."
        image="/images/industries.png"
        imageClassName="object-contain"
      />
      <IndustryDetailSection />
      <PlatformsSection />
      <CtaSection />
    </>
  );
}
