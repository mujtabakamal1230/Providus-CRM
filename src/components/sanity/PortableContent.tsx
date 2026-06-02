import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { SanityImage } from "./SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { getArticleHeadingId } from "@/lib/portableText";

interface PortableContentProps {
  value?: PortableTextBlock[];
  contained?: boolean;
}

interface LinkMarkValue {
  href?: string;
  openInNewTab?: boolean;
}

interface PortableImageValue extends SanityImageType {
  caption?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text variant="p3" className="text-[#4A4A4A]">
        {children}
      </Text>
    ),
    h2: ({ children, value }) => (
      <Heading
        as="h2"
        level="h4"
        id={getArticleHeadingId(value._key)}
        className="scroll-mt-28 text-brand-blue"
      >
        {children}
      </Heading>
    ),
    h3: ({ children, value }) => (
      <Heading
        as="h3"
        level="h4"
        id={getArticleHeadingId(value._key)}
        className="scroll-mt-28 text-brand-blue"
      >
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-green pl-6">
        <Text variant="p2" className="text-black">
          {children}
        </Text>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-3 pl-6 text-p3 text-[#4A4A4A]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 pl-6 text-p3 text-[#4A4A4A]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const link = value as LinkMarkValue | undefined;
      const href = link?.href || "#";
      const isExternal = href.startsWith("http");

      if (isExternal || link?.openInNewTab) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-brand-blue underline-offset-4 hover:underline"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-brand-blue underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableImageValue;

      if (!image.asset?.url) {
        return null;
      }

      return (
        <figure className="my-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-blue-light h-100.5 w-full">
            <SanityImage
              image={image}
              altFallback={image.caption || "Article image"}
              className="object-cover"
            />
          </div>
          {image.caption && (
            <Text variant="p4" className="mt-2 text-center text-[#6B6B6B]">
              {image.caption}
            </Text>
          )}
        </figure>
      );
    },
  },
};

export function PortableContent({
  value,
  contained = true,
}: PortableContentProps) {
  if (!value || value.length === 0) {
    return null;
  }

  const content = (
    <div className="flex flex-col gap-7">
      <PortableText value={value} components={components} />
    </div>
  );

  return contained ? (
    <Container size="md">
      <div className="py-12 md:py-16">{content}</div>
    </Container>
  ) : (
    content
  );
}
