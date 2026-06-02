import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

interface CertifiedSectionProps {
  title?: string;
  description?: string;
}

export function CertifiedSection({ title, description }: CertifiedSectionProps) {
  const defaultDescription =
    "Future-proof customer operations and business processes with ProvidusCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK.";

  return (
    <Section
      className="relative overflow-hidden rounded-b-[60px] bg-linear-to-b from-transparent to-certified-blue py-0 md:rounded-b-[120px] md:py-0"
    >
      <div className="relative mx-auto min-h-[460px] max-w-[1440px] sm:min-h-[520px] md:min-h-[clamp(515px,50vw,720px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block"
        >
          <Image
            src="/images/certified-left.png"
            alt=""
            width={1236}
            height={1385}
            className="absolute bottom-0 left-[7%] h-auto w-[42.5%]"
          />
          <Image
            src="/images/certified-right.png"
            alt=""
            width={1236}
            height={1385}
            className="absolute bottom-0 right-[7%] h-auto w-[42.5%]"
          />
        </div>

        <div className="absolute left-1/2 top-[5%] z-20 w-[112px] -translate-x-1/2 sm:w-[128px] md:w-[13%] md:max-w-[160px]">
          <Reveal direction="up" delay={0.1}>
            <Image
              src="/images/salesforce-partner.png"
              alt="Salesforce Partner"
              width={446}
              height={474}
              className="h-auto w-full"
            />
          </Reveal>
        </div>

        <div className="absolute inset-x-4 bottom-[16%] z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal direction="up" delay={0.3}>
            <div className="mb-4 flex justify-center">
              <Image
                src="/images/green-line.svg"
                alt=""
                width={60}
                height={20}
                className="h-auto w-16"
              />
            </div>

            <Heading as="h2" className="mb-4 text-black">
              {title || (
                <>
                  Professional Salesforce
                  <br />
                  Services Grounded in
                  <br />
                  Certified Expertise
                </>
              )}
            </Heading>

            <Text variant="p3" className="mx-auto max-w-md text-black">
              {description || defaultDescription}
            </Text>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
