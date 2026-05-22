import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const caseStudies = [
  {
    title: "AI-Enabled Fund Operations and Compliance Automation",
    description: "A private investment firm manages funds in real estate and private equity. Their operations team handles monthly reports, investor letters, and compliance checks across hundreds of files.",
    image: "/images/case-studies/case-study.png",
    badges: ["Python", "Llama 3.1", "Pinecone", "Docker", "Azure", "PostgreSQL", "LangChain", "FastAPI"],
  },
  {
    title: "Salesforce CRM Implementation for Global Non-Profit",
    description: "Streamlined donor management and automated volunteer onboarding workflows for a global NGO, leading to a 35% increase in operational efficiency.",
    image: "/images/case-study.png",
    badges: ["Salesforce", "Apex", "LWC", "Flows", "MuleSoft", "Data Cloud", "Tableau", "NPSP"],
  },
  {
    title: "Automated Patient Intake & Health Cloud Migration",
    description: "Migrated legacy patient records to Salesforce Health Cloud with zero downtime, integrating real-time scheduling and secure HL7 messaging.",
    image: "/images/case-studies/case-study.png",
    badges: ["Health Cloud", "HL7", "MuleSoft", "Apex", "React", "AWS", "HIPAA", "Shield"],
  }
];

export function CaseStudiesSection() {
  return (
    <Section className="py-12 md:py-20 bg-white">
      <Container>
        <div className="flex flex-col gap-10">
          {caseStudies.map((cs, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.1} width="100%">
              <div className="group relative w-full min-h-[460px] md:min-h-[480px] rounded-[20px] overflow-hidden flex flex-col justify-end p-8 md:p-12 shadow-lg">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-300 group-hover:opacity-95"
                    style={{
                      background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 91.35%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full relative z-20">
                  {/* Left Column - Title & Description */}
                  <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                    <Heading
                      as="h3"
                      className="text-white !text-[32px] md:!text-[40px] font-bold font-heading !leading-tight tracking-[-0.24px]"
                    >
                      {cs.title}
                    </Heading>
                    <Text variant="p3" className="text-white/85 max-w-2xl font-body font-normal">
                      {cs.description}
                    </Text>
                  </div>

                  {/* Right Column - Button & Badges */}
                  <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
                    <Button
                      variant="green"
                      className="shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>View Project</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1">➔</span>
                    </Button>

                    <div className="flex flex-wrap gap-2 justify-start lg:justify-end max-w-md">
                      {cs.badges.map((badge, bIdx) => (
                        <Badge
                          key={bIdx}
                          variant="outline-white"
                          className="!rounded-[18px] font-body font-normal text-[12px] border-white/80 py-1.5 px-4"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
