import type { Metadata } from "next";
import { ContactSection, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Providus CRM. Speak to our certified Salesforce experts and CRM consultants today.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <CtaSection />
    </>
  );
}
