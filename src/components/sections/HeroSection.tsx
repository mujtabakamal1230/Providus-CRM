import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
  image?: string;
}

export function HeroSection({ 
  title, 
  description, 
  image = "/images/hero-img.png" 
}: HeroSectionProps) {
  const defaultTitle = (
    <>
      Custom Salesforce Solutions For Your CRM Innovation Goals{" "}
      <img
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        className="inline-block h-[0.7em] w-auto align-baseline ml-1"
      />
    </>
  );

  const defaultDescription = "Future-proof customer operations and business processes with ProviduseCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK.";

  return (
    <section className="mt-4">
      <Container>
        <div
          className="rounded-3xl overflow-hidden bg-cover bg-center h-[calc(100vh-120px)] min-h-[620px]"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
          }}
        >
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left — content */}
          <div className="flex flex-col justify-center gap-7 px-10 py-16 md:px-16">
            <Reveal direction="up" delay={0.1}>
              {/* Salesforce Partner Badge */}
              <div className="flex items-center gap-4 w-fit">
                <div className="shrink-0 bg-white rounded-sm overflow-hidden">
                  <Image
                    src="/images/salesforce-partner.png"
                    alt="Salesforce Partner"
                    width={66}
                    height={71}
                    className="object-contain bg-white"
                  />
                </div>
                <div className="flex flex-col">
                  <Text variant="p4" className="text-white/85 leading-tight">
                    Certified
                  </Text>
                  <Text variant="p4" className="text-white font-semibold leading-snug">
                    Salesforce Partner
                  </Text>
                  <Text variant="p4" className="text-white/85 leading-tight">
                    in the UK
                  </Text>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              {/* Heading + squiggle */}
              <div>
                <Heading as="h1" className="text-white">
                  {title || defaultTitle}
                </Heading>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              {/* Subtext */}
              <Text variant="p2" className="text-white/85 max-w-md">
                {description || defaultDescription}
              </Text>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              {/* CTA */}
              <div>
                <CtaButton variant="white" size="md">
                  Book a Call
                </CtaButton>
              </div>
            </Reveal>
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block p-4 pl-0 py-8 pr-8 h-full">
            <Reveal direction="left" delay={0.3} width="100%" height="100%">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                <Image
                  src={image}
                  alt="Business meeting"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
