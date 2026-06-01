"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
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
  {
    id: 5,
    title: "Marketing Cloud",
    icon: "/images/marketing-cloud.png",
    text: "Run email campaigns, build automated journeys, and segment audiences based on real CRM data. We implement Marketing Cloud with proper data extensions, journey logic, and attribution tracking so every campaign connects back to a measurable pipeline.",
    shadow: "0px 4.36px 0px 0px #F4AC3B",
  },
  {
    id: 5,
    title: "Sales Cloud",
    icon: "/images/sales-cloud.png",
    text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
    shadow: "0px 4.36px 0px 0px #8A8FD2",
  },
];

interface ExpertiseSectionProps {
  title?: string;
  items?: typeof expertiseItems;
}

export function ExpertiseSection({ title, items }: ExpertiseSectionProps) {
  const displayItems = items || expertiseItems;
  const carouselItems =
    displayItems.length > 0 && displayItems.length < 8
      ? [...displayItems, ...displayItems]
      : displayItems;
  const defaultTitle = "Our End-to-End Salesforce Platform Expertise";

  return (
    <Section className="overflow-hidden">
      <Container>
        <Reveal direction="up" delay={0.1}>
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="w-16 h-auto mb-6"
            />
            <Heading as="h2" className="max-w-lg">
              {title || defaultTitle}
            </Heading>
          </div>
        </Reveal>
      </Container>

      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full"
        aria-label="Salesforce platform expertise"
      >
        <CarouselContent className="pb-2 pt-2">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              className="basis-[84%] sm:basis-[48%] lg:basis-[31%] xl:basis-[26%]"
            >
              <div
                className="flex min-h-[310px] h-full w-full flex-col items-center rounded-[8px] bg-gradient-to-b from-white to-brand-blue-light p-8 text-center transition-transform hover:-translate-y-1"
                style={{
                  boxShadow: item.shadow,
                }}
              >
                <div className="w-[60px] h-[60px] relative mb-8 shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <Text variant="p1" className="text-black mb-4 shrink-0">
                  {item.title}
                </Text>

                <div className="w-full h-[1px] bg-gray-200 mb-6 shrink-0" />

                <Text variant="p4" className="text-gray-600 flex-1">
                  {item.text}
                </Text>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-10 flex justify-center gap-4">
          <CarouselPrevious className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
          <CarouselNext className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
        </div>
      </Carousel>
    </Section>
  );
}
