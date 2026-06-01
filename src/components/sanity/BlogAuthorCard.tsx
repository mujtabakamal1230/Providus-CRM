import Image from "next/image";
import { Text } from "@/components/ui/Typography";
import type { Author } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";

interface BlogAuthorCardProps {
  author: Author;
}

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="flex items-center gap-5 rounded-[20px] border border-[#B6B6B6] bg-white p-4">
      <div className="rounded-[18px] bg-white  [box-shadow:0px_5.72px_12.52px_0px_#0000000A,0px_22.54px_22.54px_0px_#0000000A]">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[14px] bg-brand-blue">
          {author.image?.asset?.url ? (
            <SanityImage
              image={author.image}
              altFallback={author.name}
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <Text variant="p1" className="text-white">
              {initials}
            </Text>
          )}
        </div>
        <Text variant="p4" className="text-center py-1 text-[#5F5F5F]">
          Author
        </Text>
      </div>

      <div className="flex min-w-0 flex-col">
        <Text variant="p1" className="text-black">
          {author.name}
        </Text>
        {author.role && (
          <Text variant="p3" className="text-[#5F5F5F]">
            {author.role}
          </Text>
        )}

        {(author.linkedinUrl || author.xUrl) && (
          <div className="mt-4 flex items-center gap-4">
            {author.linkedinUrl && (
              <a
                href={author.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${author.name} on LinkedIn`}
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#0A66C2] transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/linkedin.svg"
                  alt=""
                  width={21}
                  height={21}
                  aria-hidden="true"
                />
              </a>
            )}

            {author.xUrl && (
              <a
                href={author.xUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${author.name} on X`}
                className="flex h-9 w-9 items-center justify-center text-black transition-opacity hover:opacity-70"
              >
                <span aria-hidden="true" className="typography-h4">
                  X
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
