import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";

const teamMembers = [
  { id: 1, image: "/images/team/1.png" },
  { id: 2, image: "/images/team/2.png" },
  { id: 3, image: "/images/team/3.png" },
  { id: 4, image: "/images/team/4.png" },
  { id: 5, image: "/images/team/5.png" },
  { id: 6, image: "/images/team/6.png" },
  { id: 7, image: "/images/team/7.png" },
  { id: 8, image: "/images/team/8.png" },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="max-w-4xl !text-[36px] md:!text-[50px] leading-tight">
            Work With Experts Across CRM, AI, Sales, Marketing, and More!
          </Heading>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative w-full aspect-square rounded-[12px] overflow-hidden shadow-md transition-transform hover:-translate-y-2 duration-300"
            >
              <Image
                src={member.image}
                alt={`Team Member ${member.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
