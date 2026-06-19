import type { Metadata } from "next";
import { ContactSection, CtaSection } from "@/components/sections";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("contact", {
    title: "Contact Us",
    description:
      "Get in touch with ProvidusCRM. Speak to our certified Salesforce experts and CRM consultants today.",
    canonicalPath: "/contact",
    image: "/images/hero-bg.webp",
  });
}

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <CtaSection />
    </>
  );
}
