"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useState } from "react";

const industries = [
  {
    title: "Nonprofit",
    image: "/images/industries/non-profit.png",
    description: "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data. Teams spend less time on admin and more time on mission delivery."
  },
  {
    title: "Education",
    image: "/images/industries/education.png",
    description: "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform. No student record falls through the gaps, and no department works in isolation."
  },
  {
    title: "Commerce",
    image: "/images/industries/commerce.png",
    description: "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. One platform powers the full buying experience."
  },
  {
    title: "Healthcare",
    image: "/images/industries/healthcare.png",
    description: "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance. Additionally, clinical and non-clinical teams work from the same data, so nothing gets lost between departments."
  },
  {
    title: "Financial Services",
    image: "/images/industries/financial-services.png",
    description: "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts. Furthermore, KYC processes and advisor dashboards run from one platform built for how regulators expect firms to operate."
  },
  {
    title: "Manufacturing",
    image: "/images/industries/manufacturing.png",
    description: "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning. As a result, commercial teams get accurate visibility into the pipeline and run-rate business without relying on disconnected spreadsheets."
  }
];

export function IndustryDetailSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col gap-10">
          {industries.map((item, index) => (
            <IndustryCard 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndustryCard({ item, index }: { item: typeof industries[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isImageLeft = index % 2 === 0;

  return (
    <Reveal 
      direction={isImageLeft ? "left" : "right"} 
      delay={0.1}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "flex flex-col md:flex-row items-center gap-8 md:gap-16 md:p-6 md:pl-6 md:pr-14 overflow-hidden transition-all duration-500",
          !isImageLeft && "md:flex-row-reverse md:pr-6 md:pl-14",
          isHovered && "shadow-2xl scale-[1.01]"
        )}
        style={{
          background: "linear-gradient(217.87deg, #FFFFFF -13.97%, #1D70C5 78.47%)",
          boxShadow: "0px 4.55px 24.57px 0px #0000001C",
          borderRadius: "50px",
        }}
      >
        {/* Image Container */}
        <div className="w-full md:w-[50%] shrink-0">
          <div className="relative aspect-[4/3] rounded-[50px] overflow-hidden shadow-lg border border-white/20">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered && "scale-110"
              )}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-white py-4">
          <Heading as="h2" className="text-white mb-6">
            {item.title}
          </Heading>
          <Text variant="p2" className="text-white/90 leading-relaxed">
            {item.description}
          </Text>
        </div>
      </div>
    </Reveal>
  );
}
