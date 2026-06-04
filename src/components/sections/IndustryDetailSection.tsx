"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

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
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative py-24 bg-white pb-32">
      <Container>
        <div className="flex flex-col relative">
          {industries.map((item, index) => (
            <IndustryCard
              key={index}
              item={item}
              index={index}
              progress={scrollYProgress}
              totalCards={industries.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface IndustryCardProps {
  item: typeof industries[0];
  index: number;
  progress: MotionValue<number>;
  totalCards: number;
}

function IndustryCard({ item, index, progress, totalCards }: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isImageLeft = index % 2 === 0;

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;

  // Unconditionally calculate ranges to adhere strictly to React Rules of Hooks
  const isFirstCard = index === 0;
  const entryStart = (index - 1) / totalCards;
  const entryEnd = index / totalCards;

  let scaleInputRange: number[];
  let scaleOutputRange: number[];

  if (isFirstCard) {
    scaleInputRange = [0, 1];
    scaleOutputRange = [1, targetScale];
  } else if (entryStart === 0) {
    // Avoid duplicate keys [0, 0, ...] when entryStart is 0 for the second card (index = 1)
    scaleInputRange = [0, entryEnd, 1];
    scaleOutputRange = [0.85, 1, targetScale];
  } else {
    scaleInputRange = [0, entryStart, entryEnd, 1];
    scaleOutputRange = [0.85, 0.85, 1, targetScale];
  }

  const scale = useTransform(progress, scaleInputRange, scaleOutputRange);

  // Set up local scroll tracking on the card container for smooth image parallax
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(cardScrollProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div
      ref={cardContainerRef}
      className="h-[70vh] md:h-[80vh] flex items-start justify-center sticky pt-4"
      style={{
        zIndex: index,
        top: `calc(5.5rem + ${index * 24}px)`
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-8 md:gap-16 p-6 md:p-8 md:pl-8 md:pr-16 overflow-hidden transition-shadow duration-500",
          !isImageLeft && "md:flex-row-reverse md:pr-8 md:pl-16",
          isHovered && "shadow-2xl border-white/30"
        )}
        style={{
          scale,
          background: "linear-gradient(217.87deg, #FFFFFF -13.97%, #1D70C5 78.47%)",
          boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.15), inset 0px 1px 1px rgba(255,255,255,0.2)",
          borderRadius: "40px",
        }}
      >


        {/* Image Container */}
        <div className="w-full md:w-[48%] shrink-0 overflow-hidden rounded-[30px]">
          <div className="relative aspect-[4/3] w-full h-full overflow-hidden border border-white/10">
            <motion.div
              style={{ scale: imageScale, width: "100%", height: "100%" }}
              className="relative w-full h-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index < 2}
              />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-white py-4 flex flex-col gap-4">
          <Heading as="h3" className="text-white !text-[28px] !leading-[32px] md:!text-[40px] md:!leading-[25px] font-heading font-bold">
            {item.title}
          </Heading>
          <Text variant="p2" className="text-white/90 !text-[15px] md:!text-[18px] leading-relaxed">
            {item.description}
          </Text>
        </div>
      </motion.div>
    </div>
  );
}

