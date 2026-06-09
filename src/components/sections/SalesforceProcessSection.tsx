"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  DraftingCompass,
  Target,
  CodeXml,
  Rocket,
  Headset,
} from "lucide-react";
import React from "react";

const processSteps = [
  {
    title: "Analysis",
    description:
      "We learn how your business runs and where your CRM falls short today. Every requirement gets written down and agreed before anything is built.",
    icon: ClipboardCheck,
    colorTheme: "green",
  },
  {
    title: "Design",
    description:
      "Next, our developers design the data model, automation, and technical approach. You review the plan and sign it off before the build starts.",
    icon: DraftingCompass,
    colorTheme: "blue",
  },
  {
    title: "Strategy",
    description:
      "We sequence the work into phases with clear priorities. The highest-value features come first, so ROI starts landing sooner.",
    icon: Target,
    colorTheme: "green",
  },
  {
    title: "Development",
    description:
      "Our developers build your custom Salesforce org in sandboxes using version control and proper testing.",
    icon: CodeXml,
    colorTheme: "blue",
  },
  {
    title: "Release",
    description:
      "We deploy through structured pipelines with regression testing at each stage. Releases reach production cleanly, without breaking what already works.",
    icon: Rocket,
    colorTheme: "green",
  },
  {
    title: "Support",
    description:
      "After release, our team offers ongoing support. We proactively monitor your org and handle enhancements as your needs evolve.",
    icon: Headset,
    colorTheme: "blue",
  },
];

export function SalesforceProcessSection() {
  return (
    <Section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          {/* Green logo icon to match the image header */}
          <img
            src="/images/green-line.svg"
            alt=""
            aria-hidden="true"
            className="inline-block h-10 w-auto align-baseline ml-1"
          />
          <Heading as="h2" className="text-slate-900 mb-6 font-bold">
            Our Salesforce<br />Development Process
          </Heading>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 relative mx-auto z-10">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isGreen = step.colorTheme === "green";
            const isLeft = index % 2 === 0;
            const isLast = index === processSteps.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "relative w-full md:w-[calc(50%-2rem)]",
                  isLeft ? "self-start" : "self-end"
                )}
              >
                <div
                  className={cn(
                    "relative rounded-[1.5rem] p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 h-full z-10",
                    isGreen
                      ? "bg-[#F5FFF2] border-[#D9D9D9] shadow-[0px_4px_23px_10px_rgba(0,0,0,0.05)]"
                      : "bg-[#F0F7FF] border-[#D9D9D9] shadow-[0px_4px_23px_10px_rgba(0,0,0,0.05)]"
                  )}
                  style={{ borderWidth: "1px" }}
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center shadow-sm text-white shrink-0",
                        isGreen ? "bg-[#2FA113]" : "bg-[#2271CE]"
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <Heading as="h4" className="text-slate-900 m-0">
                      0{index + 1} - {step.title}
                    </Heading>
                  </div>
                  <Text variant="p2" className="text-slate-800 leading-relaxed">
                    {step.description}
                  </Text>
                </div>

                {/* Connector Line for Left Card */}
                {!isLast && isLeft && (
                  <div
                    className="hidden md:block absolute border-t-2 border-r-2 border-dashed border-slate-300 rounded-tr-[1.5rem] z-[-1]"
                    style={{
                      top: "50%",
                      left: "100%",
                      width: "calc(50% + 4rem)",
                      height: "calc(50% + 3rem)",
                    }}
                  >
                    <svg
                      className="absolute -bottom-[2px] -right-[11px] w-5 h-5 text-slate-300 translate-y-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                )}

                {/* Connector Line for Right Card */}
                {!isLast && !isLeft && (
                  <div
                    className="hidden md:block absolute border-t-2 border-l-2 border-dashed border-slate-300 rounded-tl-[1.5rem] z-[-1]"
                    style={{
                      top: "50%",
                      right: "100%",
                      width: "calc(50% + 4rem)",
                      height: "calc(50% + 3rem)",
                    }}
                  >
                    <svg
                      className="absolute -bottom-[1px] -left-[11px] w-5 h-5 text-slate-300 translate-y-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
