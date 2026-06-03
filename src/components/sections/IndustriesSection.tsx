import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export interface IndustrySectionItem {
  title: string;
  image: string;
  description: string;
}

interface IndustriesSectionProps {
  title?: string;
  items?: IndustrySectionItem[];
}

const industries: IndustrySectionItem[] = [
  {
    title: "Non-Profit Cloud",
    image: "/images/non-profit.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day."
  },
  {
    title: "Education Cloud",
    image: "/images/education-cloud.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day."
  },
  {
    title: "Commerce Cloud",
    image: "/images/commerce-cloud.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day."
  },
  {
    title: "Health Cloud",
    image: "/images/health-cloud.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day.  "
  },
  {
    title: "Manufacturing Cloud",
    image: "/images/manufacturing-cloud.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day."
  },
  {
    title: "Finance Services Cloud",
    image: "/images/finance-services-cloud.png",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day."
  }
];

export function IndustriesSection({ title, items }: IndustriesSectionProps) {
  const displayItems = items && items.length > 0 ? items : industries;

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-20">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="w-16 h-auto mb-6"
            />
            <Heading as="h2" className="max-w-4xl !text-[40px] md:!text-[50px] leading-tight">
              {title || "How We Implement Salesforce Across Industries"}
            </Heading>
          </div>
        </Reveal>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
          {displayItems.map((item, index) => (
            <Reveal 
              key={index} 
              direction={index % 2 === 0 ? "right" : "left"} 
              delay={0.1 * (index % 3 + 1)}
            >
              <div
                className="flex flex-col md:flex-row gap-8 p-2 pr-10 h-full"
                style={{
                  background: "linear-gradient(221.48deg, #F6FFE8 26.54%, #C7EA92 118.63%)",
                  boxShadow: "0px 4.55px 24.57px 0px #0000001C",
                  borderRadius: "50px"
                }}
              >
                {/* Image Container */}
                <div className="shrink-0">
                  <div
                    className="overflow-hidden"
                    style={{
                      borderRadius: "43.68px",
                      width: "202px",
                      height: "294px",
                      position: "relative"
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center">
                  <Text variant="p1" className="text-black font-bold mb-4">
                    {item.title}
                  </Text>
                  <Text variant="p4" className="text-[#4F4D4B] leading-relaxed">
                    {item.description}
                  </Text>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
