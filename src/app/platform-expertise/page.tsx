import {
  HeroSection,
  PartnersSection,
  ExpertiseStackSection,
  CtaSection
} from "@/components/sections";

export default function PlatformExpertisePage() {
  const heroTitle = (
    <>
      Platform Expertise{" "}
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
    </>
  );

  return (
    <>
      <HeroSection
        title={heroTitle}
        description="Deep technical knowledge across every core Salesforce platform. We don't just configure; we engineer CRM systems that drive real business outcomes."
        image="/images/platform-experties.png"
        imageClassName="object-contain"
      />
      <PartnersSection />
      <ExpertiseStackSection />
      <CtaSection />
    </>
  );
}
