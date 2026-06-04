import {
  HeroSection,
  PartnersSection,
  CertifiedSection,
  BelieveSection,
  BentoSection,
  TeamThoughtsSection,
  PlatformsSection,
  ExploreSection,
  CtaSection
} from "@/components/sections";

export default function AboutPage() {
  const heroTitle = (
    <>
      Get to Know Your <br />
      CRM Experts{" "}
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
      <HeroSection
        title={heroTitle}
        description="Professional Salesforce Services Grounded in Certified Expertise"
        image="/images/about-us-hero.png"
        imageClassName="object-contain p-4"
      />
      <PartnersSection />
      <CertifiedSection
        title="Who We Are"
        description="We're not a generic Salesforce consultancy providing run-of-the-mill implementations. We align your CRM org with your challenges, building solutions that drive impact. ProvidusCRM, a subsidiary of Providus, is a certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more to implement Salesforce effectively across their workflows, challenges, and goals."
      />
      <BelieveSection />
      <BentoSection />
      <PlatformsSection
        title="Built On Partnerships With the World's Top Platforms"
        limit={4}
      />
      <TeamThoughtsSection />
      <ExploreSection />
      <CtaSection />
    </>
  );
}
