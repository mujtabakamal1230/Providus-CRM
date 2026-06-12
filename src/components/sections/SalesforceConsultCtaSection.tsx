import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";
import { CtaButton } from "@/components/ui/CtaButton";

interface SalesforceConsultCtaSectionProps {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundColor?: string;
  image?: string;
  imageAlt?: string;
}

export function SalesforceConsultCtaSection({
  title = "Connect With Our Salesforce Consultants To Discuss Your CRM Needs And Business Goals.",
  buttonLabel = "Let's Connect",
  buttonHref = "/contact",
  backgroundColor = "#2898FF",
  image = "/images/consult.png",
  imageAlt = "",
}: SalesforceConsultCtaSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24 mt-24">
      <Container>
        <div
          className="relative overflow-visible rounded-[8px] px-6 py-10 md:px-14 md:py-16 lg:min-h-[320px]"
          style={{ backgroundColor }}
        >
          <div className="relative z-10 max-w-[500px]">
            <Heading
              as="h3"
              className="max-w-[500px] text-white [&&]:!leading-[36px] md:[&&]:!leading-[43px]"
            >
              {title}
            </Heading>

            <Link href={buttonHref} className="mt-8 inline-block">
              <CtaButton variant="filled" size="sm">
                {buttonLabel}
              </CtaButton>
            </Link>
          </div>

          <div className="pointer-events-none mt-8 flex justify-center lg:absolute lg:bottom-0 lg:right-8 lg:mt-0 lg:w-[58%] lg:justify-end max-h-[450px]">
            <Image
              src={image}
              alt={imageAlt}
              width={647}
              height={446}
              className="h-auto w-full max-w-[620px] object-contain lg:max-w-none"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
