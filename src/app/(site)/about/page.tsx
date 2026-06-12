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
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";

export default async function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us | Providus CRM",
    "description": "Professional Salesforce Services Grounded in Certified Expertise. We are a certified Salesforce partner in the UK, specializing in tailored CRM consulting.",
    "url": "https://providuscrm.co.uk/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Providus CRM",
      "url": "https://providuscrm.co.uk",
      "logo": "https://providuscrm.co.uk/images/salesforce-partner.png",
      "description": "Certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more."
    }
  };
  const jsonLd = await getSitePageJsonLd("about", schema);

  const heroTitle = (
    <>
      Get to Know Your <br />
      CRM Experts{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
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

