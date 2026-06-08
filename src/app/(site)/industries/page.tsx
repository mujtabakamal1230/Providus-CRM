import {
  HeroSection,
  IndustryDetailSection,
  PlatformsSection,
  CtaSection
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";

export default async function IndustriesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Industries We Serve | Providus CRM",
    "description": "Deep technical knowledge across every core Salesforce platform. We implement Salesforce effectively for Nonprofit, Education, Commerce, Healthcare, Financial Services, and Manufacturing industries.",
    "url": "https://providuscrm.co.uk/industries",
    "about": [
      {
        "@type": "Service",
        "name": "Salesforce for Nonprofit",
        "description": "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Education",
        "description": "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Commerce",
        "description": "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Healthcare",
        "description": "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Financial Services",
        "description": "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Manufacturing",
        "description": "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning."
      }
    ]
  };
  const jsonLd = await getSitePageJsonLd("industries", schema);

  const heroTitle = (
    <>
      Industries We Serve{" "}
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
      <JsonLdScript data={jsonLd} />
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

