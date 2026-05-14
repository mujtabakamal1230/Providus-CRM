import { 
  HeroSection, 
  PartnersSection, 
  WhyChooseSection, 
  CertifiedSection, 
  CtaSection,
  CategoriesSection,
  reasons 
} from "@/components/sections";

export default function ServicesPage() {
  const servicesHeroTitle = (
    <>
      Our Services{" "}
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
    </>
  );

  const servicesReasons = [
    reasons[0],
    {
      ...reasons[1],
      text: "We provide you with experienced, certified Salesforce talent who've solved the challenges you're facing today many times for multiple organisations across the UK. You get proven expertise, defined delivery frameworks, documented decisions, and a track record of going live on time with solutions teams actually adopt."
    },
    reasons[2]
  ];

  return (
    <>
      <HeroSection 
        title={servicesHeroTitle}
        description="End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals."
        image="/images/our-services-hero.png"
      />
      <PartnersSection />
      <CategoriesSection />
      <WhyChooseSection 
        title="Why Choose ProvidusCRM As Your Salesforce Services Partner"
        customReasons={servicesReasons}
      />
      <CertifiedSection 
        title="Certified Salesforce Expertise Behind Every Solution We Deliver"
        description="Our consultants, developers, and architects are certified across platform administration, app building, data architecture, and every major Salesforce cloud. Every engagement is backed by certified expertise."
      />
      <CtaSection />
    </>
  );
}
