import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export const reasons = [
  {
    title: "We're Different",
    color: "#687DDA",
    icon: "/images/different.png",
    text: "Most Salesforce partners just sell hours. We sell outcomes. Every engagement starts with understanding what the business actually needs, not what is easiest to configure. Our consultants challenge requirements before building anything, so the solution that goes live is the one that holds up six months later."
  },
  {
    title: "We're Better",
    color: "#A670DD",
    icon: "/images/better.png",
    text: "Certified across every core Salesforce platform. Experienced across six industry verticals. Built on a delivery framework that has never relied on 'we'll figure it out as we go.' While other partners staff projects with junior consultants and learn on the job, our team brings deep platform knowledge and real implementation experience to every engagement."
  },
  {
    title: "We're a Leading Salesforce Partner in the UK",
    color: "#00A1E0",
    icon: "/images/salesforce-partner.png",
    text: "ProvidusCRM combines the technical depth of a large consultancy with the responsiveness of a specialist partner. Certified consultants across Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Experience Cloud, and Agentforce. A delivery track record across nonprofit, financial services, healthcare, education, manufacturing, and commerce."
  }
];

interface WhyChooseSectionProps {
  title?: string;
  customReasons?: typeof reasons;
}

export function WhyChooseSection({ title, customReasons }: WhyChooseSectionProps) {
  const displayReasons = customReasons || reasons;
  const defaultTitle = "Why Choose ProvidusCRM As Your Salesforce Solutions Partner";

  return (
    <section className="relative py-24 min-h-[900px] flex items-center overflow-hidden">
      {/* Background and Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/why-choose-bg.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#4EAAFF]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#4EAAFF]/40" />
      </div>

      <Container className="relative z-10">
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
            <Heading as="h2" className="text-white max-w-4xl !text-[36px] md:!text-[50px] leading-tight">
              {title || defaultTitle}
            </Heading>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side - 3 Boxes */}
          <div className="flex flex-col gap-4 h-full">
            <Reveal direction="right" delay={0.3}>
              <div className="flex flex-col gap-4">
                {displayReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 md:p-8 rounded-md flex flex-col md:flex-row gap-6 shadow-sm flex-1"
                  >
                    <div className="shrink-0">
                      <Image
                        src={reason.icon}
                        alt=""
                        width={70}
                        height={70}
                        className="w-[70px] h-[70px] object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Heading as="h4" style={{ color: reason.color }} className="mb-2">
                        {reason.title}
                      </Heading>
                      <Text variant="p4" className="text-gray-600 leading-relaxed">
                        {reason.text}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side - Large Image with White Border */}
          <Reveal direction="left" delay={0.4} width="100%" height="100%">
            <div className="bg-white p-3 rounded-md shadow-2xl h-full min-h-[600px] lg:min-h-0">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/images/why-choose.png"
                  alt="Salesforce Specialist"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
