import {
  HeroSection,
  PartnersSection,
  ExpertiseStackSection,
  CtaSection
} from "@/components/sections";

export default function PlatformExpertisePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Certified Platform Expertise | Providus CRM",
    "description": "Certified Salesforce Platform expertise across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce, and Revenue Cloud.",
    "url": "https://providuscrm.co.uk/platform-expertise",
    "about": [
      {
        "@type": "Service",
        "name": "Experience Cloud Consulting",
        "description": "Give customers, partners, and teams a self-service portal that works."
      },
      {
        "@type": "Service",
        "name": "Service Cloud Consulting",
        "description": "Resolve cases faster with the right context on every ticket."
      },
      {
        "@type": "Service",
        "name": "Marketing Cloud Consulting",
        "description": "Connect every campaign to a measurable pipeline based on CRM data."
      },
      {
        "@type": "Service",
        "name": "Data Cloud Consulting",
        "description": "Unify customer data from every source into one profile inside Salesforce."
      },
      {
        "@type": "Service",
        "name": "Agentforce Implementation",
        "description": "Deploy autonomous AI agents that handle real workflows and tasks."
      },
      {
        "@type": "Service",
        "name": "Revenue Cloud & CPQ Implementation",
        "description": "Configure CPQ rules, product bundles, pricing logic, and billing automation."
      },
      {
        "@type": "Service",
        "name": "Sales Cloud Implementation",
        "description": "Close deals faster with full pipeline visibility and lead assignment rules."
      }
    ]
  };

  const heroTitle = (
    <>
      Certified Platform Expertise Across Every Salesforce Cloud{" "}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

