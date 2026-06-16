import {
  HeroSection,
  CtaSection,
  PartnersSection,
  CertifiedSection,
  BentoSection,
  WhatWeDoSection,
  ExpertiseSection,
  IndustriesSection,
  WhyChooseSection,
  TeamSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("home", {
    title: "Providus CRM | Certified Salesforce Partner UK",
    description:
      "Providus CRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
    canonicalPath: "/",
    image: "/images/salesforce-partner.png",
  });
}

export default async function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://providuscrm.co.uk/#organization",
        "name": "Providus CRM",
        "url": "https://providuscrm.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://providuscrm.co.uk/images/salesforce-partner.png"
        },
        "description": "Providus CRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
        "email": "info@providuscrm.co.uk",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GB"
        },
        "knowsAbout": [
          "Salesforce Consulting",
          "Salesforce Development",
          "Salesforce Implementation",
          "Salesforce Integration",
          "Salesforce Migration",
          "Salesforce Managed Services",
          "CRM Consulting"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://providuscrm.co.uk/#website",
        "url": "https://providuscrm.co.uk",
        "name": "Providus CRM",
        "publisher": {
          "@id": "https://providuscrm.co.uk/#organization"
        }
      }
    ]
  };
  const jsonLd = await getSitePageJsonLd("home", schema);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection />
      <PartnersSection />
      <CertifiedSection />
      <BentoSection />
      <WhatWeDoSection />
      <ExpertiseSection />
      <IndustriesSection />
      <WhyChooseSection />
      <TeamSection />
      <CtaSection />
    </>
  );
}
