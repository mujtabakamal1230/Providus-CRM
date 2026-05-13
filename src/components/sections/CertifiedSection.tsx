import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

export function CertifiedSection() {
  return (
    <section
      className="relative py-24 md:py-40 overflow-hidden bg-white rounded-b-[60px] md:rounded-b-[120px]"
      style={{
        background: "linear-gradient(180deg, rgba(223, 241, 255, 0) 59.05%, #DFF1FF 101.46%)",
      }}
    >
      <Container className="relative">
        {/* Arch Layout Wrapper */}
        <div className="relative w-full max-w-[1100px] mx-auto min-h-[500px] md:min-h-[600px] flex flex-col items-center">

          {/* Salesforce Partner Logo at the Top */}
          <div className="relative z-20 mb-4 md:mb-6">
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl">
              <Image
                src="/images/salesforce-partner.png"
                alt="Salesforce Partner"
                width={160}
                height={160}
                className="w-28 md:w-36 h-auto"
              />
            </div>
          </div>

          {/* Arch Images - Absolute positioned to meet in the middle under the logo */}
          <div className="absolute top-[40px] md:top-[60px] left-0 w-full flex justify-between pointer-events-none gap-[185px]">
            <div className="w-[48%] max-w-[500px]">
              <Image
                src="/images/certified-left.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-[48%] max-w-[500px]">
              <Image
                src="/images/certified-right.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Central Content - Positioned inside/under the arch */}
          <div className="relative z-10 flex flex-col items-center text-center mt-20 md:mt-32 max-w-2xl">
            {/* Squiggle */}
            <div className="mb-6">
              <Image
                src="/images/green-line.svg"
                alt=""
                width={60}
                height={20}
                className="w-16 h-auto"
              />
            </div>

            {/* Heading */}
            <Heading as="h2" className="text-[#111] mb-6 leading-[1.1] !text-[32px] md:!text-[50px]">
              Professional Salesforce Services Grounded in Certified Expertise
            </Heading>

            {/* Text */}
            <Text variant="p2" className="text-[#444] max-w-xl mx-auto !text-[16px] md:!text-[20px] leading-relaxed">
              Future-proof customer operations and business processes with
              ProvidusCRM, a certified Salesforce partner, reinventing CRM
              systems for organisations in the UK.
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
