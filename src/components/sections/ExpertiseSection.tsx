"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export const expertiseItems = [
  {
    id: 1,
    title: "Service Cloud",
    icon: "/images/service-cloud.png",
    text: "Solve cases faster with structured queues, automated workflows, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing handle times and giving agents the context they need before picking up the phone.",
    shadow: "0px 4.36px 0px 0px #3276BA",
  },
  {
    id: 2,
    title: "Experience Cloud",
    icon: "/images/experience-cloud.png",
    text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
    shadow: "0px 4.36px 0px 0px #F45A3E",
  },
  {
    id: 3,
    title: "Data Cloud",
    icon: "/images/data-cloud.png",
    text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
    shadow: "0px 4.36px 0px 0px #8A8FD2",
  },
  {
    id: 4,
    title: "Agentforce",
    icon: "/images/agent-force.png",
    text: "Deploy autonomous AI agents that handle customer queries, qualify leads, and trigger workflows without human input. At ProvidusCRM, we set up Agentforce to work within existing Salesforce workflows so automation runs on real business data.",
    shadow: "0px 4.36px 0px 0px #0D9DDA",
  },
];

interface ExpertiseSectionProps {
  title?: string;
  items?: typeof expertiseItems;
}

export function ExpertiseSection({ title, items }: ExpertiseSectionProps) {
  const displayItems = items || expertiseItems;
  const defaultTitle = "Our End-to-End Salesforce Platform Expertise";

  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-16">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="w-16 h-auto mb-6"
            />
            <Heading as="h2" className="max-w-3xl !text-[36px] md:!text-[50px] leading-tight">
              {title || defaultTitle}
            </Heading>
          </div>
        </Reveal>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayItems.map((item, index) => (
            <Reveal key={item.id} direction="up" delay={0.1 * (index + 1)}>
              <div
                className="p-8 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-1"
                style={{
                  background: "linear-gradient(180deg, #FAFDFF 0%, #EAF7FF 100%)",
                  borderRadius: "18px",
                  boxShadow: item.shadow,
                }}
              >
                <div className="w-[60px] h-[60px] relative mb-8">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <Text variant="p1" className="text-black mb-4">
                  {item.title}
                </Text>

                <div className="w-full h-[1px] bg-gray-200 mb-6" />

                <Text variant="p4" className="text-gray-600">
                  {item.text}
                </Text>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Carousel Arrows */}
        <div className="flex justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-[#429CF8] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#429CF8] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
