import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";

const logos = [
  "/images/partners/1.png",
  "/images/partners/2.png",
  "/images/partners/3.png",
  "/images/partners/4.png",
  "/images/partners/5.png",
  "/images/partners/6.png",
  "/images/partners/7.png",
  "/images/partners/8.png",
  "/images/partners/9.png",
  "/images/partners/10.png",
  "/images/partners/11.png",
  "/images/partners/12.png",
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="bg-brand-green-pale shadow-partner rounded-3xl py-6 px-8 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden">
          <Heading as="h4" className="shrink-0 text-[#2D2D2D] whitespace-nowrap text-[22px] md:text-[24px]">
            Trusted by.
          </Heading>

          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-12 md:gap-20 animate-marquee w-fit">
              {/* First set of logos */}
              {logos.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className="shrink-0 h-[40px] md:h-[62px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Partner logo"
                    width={180}
                    height={62}
                    className="max-h-[30px] md:max-h-[45px] w-auto object-contain brightness-0 opacity-70 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className="shrink-0 h-[40px] md:h-[62px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Partner logo"
                    width={180}
                    height={62}
                    className="max-h-[30px] md:max-h-[45px] w-auto object-contain brightness-0 opacity-70 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
