"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const expertiseData = [
  {
    title: "Experience Cloud",
    subtitle: "Give customers, partners, and teams a self-service portal that works.",
    text: "When customers cannot find answers or partners cannot access what they need, support tickets pile up. Our Experience Cloud team builds branded portals, partner communities, and self-service hubs connected directly to Salesforce data. In addition, access controls and record visibility are configured so external users see exactly what they should.",
    color: "#0C8CC3",
    icon: "/images/experience-cloud.png",
    image: "/images/experience-cloud-expertise.png",
  },
  {
    title: "Service Cloud",
    subtitle: "Resolve cases faster with the right context on every ticket.",
    text: "Slow response times and repeated customer explanations damage trust. Our Service Cloud consultants build structured case queues, automated escalation rules, entitlement processes, and knowledge base integration. Therefore, agents see full customer history before picking up the phone, and resolution times drop without adding headcount.",
    color: "#AC2C6D",
    icon: "/images/service-cloud.png",
    image: "/images/service-cloud-expertise.png",
  },
  {
    title: "Marketing Cloud",
    subtitle: "Connect every campaign to a measurable pipeline.",
    text: "Running campaigns without clear attribution is spending without knowing what works. Our Marketing Cloud specialists set up email journeys, audience segmentation, data extensions, and campaign attribution tracking. Every send, click, and conversion ties back to real CRM data, so marketing proves its impact instead of guessing at it.",
    color: "#E97601",
    icon: "/images/marketing-cloud.png",
    image: "/images/marketing-cloud-expertise.png",
  },
  {
    title: "Data Cloud",
    subtitle: "Unify customer data from every source into one profile.",
    text: "Scattered data across multiple systems means no team has the full picture. Our Data Cloud specialists connect website activity, transaction records, support history, and third-party data into a single unified customer profile inside Salesforce. Segmentation, personalisation, and reporting across every cloud get sharper and more reliable.",
    color: "#8A8FD2",
    icon: "/images/data-cloud.png",
    image: "/images/data-cloud-expertise.png",
  },
  {
    title: "Agentforce",
    subtitle: "Deploy AI agents that handle real workflows.",
    text: "Most AI tools answer questions. Agentforce takes action. Our certified specialists deploy autonomous AI agents that qualify leads, route cases, trigger follow-ups, and complete tasks within existing Salesforce workflows. Every agent runs on real business rules, so automation behaves the way the organisation expects it to.",
    color: "#0D9DDA",
    icon: "/images/agent-force.png",
    image: "/images/agentforce-expertise.png",
  },
  {
    title: "Revenue Cloud",
    subtitle: "Stop losing revenue to manual quoting and pricing errors.",
    text: "Complex product catalogues, discount approvals, and contract renewals managed in spreadsheets create pricing errors that cost real money. Our Revenue Cloud consultants configure CPQ rules, product bundles, pricing logic, and billing automation inside Salesforce. Quotes go out faster, approvals follow a clear path, and revenue recognition stays accurate.",
    color: "#C65EFE",
    icon: "/images/revenue-cloud.png",
    image: "/images/revenue-cloud-expertise.png",
  },
  {
    title: "Sales Cloud",
    subtitle: "Close deals faster with full pipeline visibility.",
    text: "When leads slip through the cracks and forecasts rely on gut feeling, revenue suffers. Our Sales Cloud consultants configure pipeline stages, lead assignment rules, opportunity tracking, and forecast categories around how sales teams actually sell. As a result, reps spend less time updating records and more time closing deals.",
    color: "#06BCAA",
    icon: "/images/sales-cloud.png",
    image: "/images/sales-cloud-expertise.png",
  },
];

export function ExpertiseStackSection() {
  return (
    <section className="relative bg-white pb-32">
      <Container>
        <div className="flex flex-col relative">
          {expertiseData.map((item, index) => (
            <Card 
              key={index} 
              index={index} 
              {...item} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface CardProps {
  index: number;
  title: string;
  subtitle: string;
  text: string;
  color: string;
  icon: string;
  image: string;
}

function Card({ index, title, subtitle, text, color, icon, image }: CardProps) {
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
      className="h-[80vh] md:h-[90vh] flex items-start justify-center sticky pt-8"
      style={{ 
        zIndex: index,
        top: `7rem`
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #FAFDFF 0%, #EAF7FF 100%)",
          borderRadius: "18px",
          boxShadow: `0px 4.49px 0px 0px ${color}`,
        }}
        className="relative w-full max-w-[1200px] overflow-hidden flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-12 border border-white/20 min-h-[500px]"
      >
        {/* Left Side - Image (40%) with Parallax zoom */}
        <div className="h-[250px] md:h-auto md:w-[40%] relative rounded-xl overflow-hidden shrink-0">
          <motion.div 
            style={{ scale: imageScale, width: "100%", height: "100%" }}
            className="relative w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Right Side - Content (60%) */}
        <div className="flex-1 flex flex-col justify-center py-2 md:py-6">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] relative shrink-0">
                <Image
                  src={icon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <Heading as="h4" className="text-black">
                {title}
              </Heading>
            </div>
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all hover:bg-white shrink-0"
              style={{ borderColor: color, color: color }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-[24px] md:h-[24px]"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>

          {/* Border line */}
          <div
            className="w-full h-[1px] mb-6 md:mb-8"
            style={{ backgroundColor: color, opacity: 0.2 }}
          />

          {/* Subheading */}
          <h3
            className="font-roboto font-semibold text-[16px] md:text-[18px] leading-[1.5] mb-4 md:mb-6"
            style={{ color: color }}
          >
            {subtitle}
          </h3>

          {/* Text */}
          <Text variant="p3" className="text-black leading-relaxed">
            {text}
          </Text>
        </div>
      </div>
    </div>
  );
}

