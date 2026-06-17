import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";

interface CtaSectionProps {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: string;
}

export function CtaSection({
  title,
  buttonLabel = "Let's Connect",
  buttonHref = "/contact",
  backgroundImage = "/images/cta-bg.webp",
}: CtaSectionProps) {
  const displayTitle = title || "Explore How We Align Your CRM Systems With Your Business Initiatives.";

  return (
    <section className="relative h-[386px] flex items-center overflow-hidden mt-24 md:mt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={82}
        />
        {/* Overlay Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(270deg, rgba(255, 255, 255, 0) 14.76%, #FFFFFF 80.37%)"
          }}
        />
      </div>

      <Container className="relative z-20">
        <div className="max-w-2xl">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="text-black mb-8 !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[60.9px]">
            {displayTitle.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </Heading>

          <Link href={buttonHref} className="inline-block">
            <button className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full hover:bg-[#2e8b16] transition-colors group cursor-pointer">
              <div className="bg-white rounded-full p-1 group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="var(--color-brand-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              </div>
              <span className="font-semibold">{buttonLabel}</span>
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
