import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Typography";

const QuoteIcon = () => (
  <svg width="60" height="44" viewBox="0 0 60 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.4286 0C6.90738 0 0 6.90738 0 15.4286V43.2857H25.7143V15.4286H8.57143C8.57143 11.6429 11.6429 8.57143 15.4286 8.57143V0ZM49.7143 0C41.1931 0 34.2857 6.90738 34.2857 15.4286V43.2857H60V15.4286H42.8571C42.8571 11.6429 45.9286 8.57143 49.7143 8.57143V0Z" />
  </svg>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-full px-4 py-1.5 flex items-center gap-2 w-fit mb-6 shadow-sm">
    <div className="w-2 h-2 rounded-full bg-[#38A81B]" />
    <span className="text-[14px] font-medium text-black">{children}</span>
  </div>
);

export function BentoSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Box 1 - Green Testimonial */}
          <div className="md:col-span-8 bg-gradient-to-b from-[#A0FF88] to-[#55D334] rounded-[20px] p-8 md:p-12 relative flex flex-col justify-between min-h-[380px]">
            <div className="flex justify-between items-start">
              <Tag>Testimonial</Tag>
              <div className="text-white opacity-40">
                <QuoteIcon />
              </div>
            </div>

            <div className="mt-4">
              <Text variant="p2" className="text-black font-medium leading-snug max-w-2xl">
                &quot;We went through two partners before ProvidusCRM. Their consultants did not just reconfigure Service Cloud. They redesigned our entire case escalation logic, and our first-contact resolution rate jumped from 54% to 81%.&quot;
              </Text>
              <div className="mt-8 text-right">
                <Text variant="p2" className="text-black/80 font-medium">
                  — Daniel Owusu, <span className="font-normal">Director of Customer Operations</span>
                </Text>
              </div>
            </div>
          </div>

          {/* Box 2 - Yellow Stat */}
          <div className="md:col-span-4 bg-[#FFE072] rounded-[20px] p-8 md:p-10 flex flex-col justify-between min-h-[380px]">
            <Tag>Impact Stat</Tag>
            <div>
              <span className="text-[60px] md:text-[80px] font-bold text-black leading-none tracking-tight">62%</span>
              <Text variant="p2" className="text-[#735E13] mt-6 ]">
                Reduction in lead response time after Sales Cloud automation and round-robin assignment for a UK financial services firm
              </Text>
            </div>
          </div>

          {/* Box 3 - Blue Testimonial with Image BG */}
          <div className="md:col-span-7 rounded-[20px] overflow-hidden relative min-h-[450px] flex flex-col justify-end p-8 md:p-12">
            <Image
              src="/images/testimonial-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#306897]/90" />

            <div className="relative z-10 w-full">
              <div className="flex justify-between items-start w-full">
                <Tag>Testimonial</Tag>
                <div className="text-white opacity-40">
                  <QuoteIcon />
                </div>
              </div>

              <Text variant="p2" className="text-white mt-4">
                &quot;ProvidusCRM migrated our entire legacy CRM to Sales Cloud in eight weeks without a single day of downtime. Their team mapped every custom object and workflow before touching a line of configuration.&quot;
              </Text>

              <div className="mt-8 text-right">
                <Text variant="p2" className="text-white font-medium">
                  — Sarah Mitchell, <span className="font-normal">Head of Commercial Operations</span>
                </Text>
              </div>
            </div>
          </div>

          {/* Box 4 - Pink Case Study */}
          <div className="md:col-span-5 bg-[#FAD2FFFC] rounded-[20px] overflow-hidden flex flex-col h-full">
            <div className="h-[145px] relative w-full">
              <Image
                src="/images/case-study.png"
                alt="Case Study"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col gap-6 h-full justify-between">
              <div>
                <Tag>Case Studies</Tag>
                <Text variant="p2" className="text-black font-bold! leading-snug mt-2">
                  Rebuilding a UK Logistics Company&apos;s Field Operations on Salesforce Service Cloud and Field Service
                </Text>
              </div>

              <Text variant="p2" className="text-[#631655]">
                71% faster job scheduling | £920K saved in operational costs in year one | 8-week delivery from scoping to production go-live
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
