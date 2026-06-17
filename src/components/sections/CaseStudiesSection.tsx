import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export interface CaseStudyCardItem {
  title: string;
  description: string;
  image: string;
  slug: string;
  badges: string[];
  resultSummary?: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudyCardItem[];
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  return (
    <Section className="py-12 md:py-20 bg-white">
      <Container>
        {caseStudies.length === 0 ? (
          <div className="py-16 text-center">
            <Heading as="h2" className="text-black">
              Case studies are coming soon
            </Heading>
            <Text variant="p2" className="mx-auto mt-4 max-w-2xl text-[#5F5F5F]">
              We are preparing detailed Salesforce and automation stories for
              the CMS. Once published in Sanity, they will appear here.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {caseStudies.map((caseStudy, index) => (
              <Reveal
                key={caseStudy.slug}
                direction="up"
                delay={index * 0.1}
                width="100%"
              >
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group relative flex min-h-115 w-full flex-col justify-end overflow-hidden rounded-lg p-8 shadow-lg md:min-h-134.5 md:p-12 cursor-pointer"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      sizes="(min-width: 1800px) 1536px, (min-width: 1440px) 1376px, calc(100vw - 48px)"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      quality={82}
                    />
                    <div className="absolute inset-0 z-10 bg-linear-to-b from-black/0 to-black transition-opacity duration-300 group-hover:opacity-95" />
                  </div>

                  <div className="relative z-20 grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12">
                    <div className="flex flex-col gap-4 text-left lg:col-span-7">
                      <Heading
                        as="h3"
                        className="text-white !text-[28px] !leading-tight tracking-[-0.24px] md:!text-[40px]"
                      >
                        {caseStudy.title}
                      </Heading>
                      <Text
                        variant="p3"
                        className="max-w-2xl text-white/85"
                      >
                        {caseStudy.description}
                      </Text>
                      {caseStudy.resultSummary && (
                        <Text
                          variant="p3"
                          className="font-semibold text-brand-green-light"
                        >
                          {caseStudy.resultSummary}
                        </Text>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
                      <div
                        className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-p3 text-white shadow-md transition-all group-hover:scale-105 active:scale-95"
                      >
                        <span>View Project</span>
                        <ArrowRight size={16} />
                      </div>

                      <div className="flex max-w-md flex-wrap justify-start gap-2 lg:justify-end">
                        {caseStudy.badges.map((badge) => (
                          <Badge
                            key={badge}
                            variant="outline-white"
                            className="!rounded-[18px] border-white/80 px-4 py-1.5 text-[12px] font-normal"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
