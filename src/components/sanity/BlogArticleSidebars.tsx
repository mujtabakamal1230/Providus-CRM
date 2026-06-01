import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/ui/Typography";
import type { Category } from "@/sanity/lib/types";
import type { ArticleHeading } from "@/lib/portableText";
import { BlogTableOfContents } from "./BlogTableOfContents";

interface BlogArticleSidebarsProps {
  categories?: Category[];
  headings: ArticleHeading[];
  shareTitle: string;
  shareUrl: string;
}

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "News & Updates" },
  { href: "/contact", label: "Contact Us" },
];

export function BlogArticleLeftSidebar({
  headings,
  shareTitle,
  shareUrl,
}: Pick<BlogArticleSidebarsProps, "headings" | "shareTitle" | "shareUrl">) {
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <aside className="flex flex-col gap-8 lg:sticky lg:top-24">
      <BlogTableOfContents headings={headings} />

      <div className="overflow-hidden rounded-[8px] bg-brand-blue p-5">
        <Text variant="p4" className="text-white">
          Share with your community!
        </Text>
        <div className="mt-3 flex items-center gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on Facebook"
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-white"
          >
            <Image
              src="/images/facebook.svg"
              alt=""
              width={20}
              height={20}
              className="brightness-0 saturate-100"
              aria-hidden="true"
            />
          </a>
          <a
            href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-white bg-white text-black"
          >
            <span aria-hidden="true" className="typography-p1 leading-none">
              X
            </span>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-white"
          >
            <Image
              src="/images/linkedin.svg"
              alt=""
              width={20}
              height={20}
              className="brightness-0 saturate-100"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}

export function BlogArticleRightSidebar({
  categories,
}: Pick<BlogArticleSidebarsProps, "categories">) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="rounded-[20px] border border-[#B6B6B6] bg-white p-5">
        <Text variant="p3" className="font-semibold text-[#4A4A4A]">
          Quick Links:
        </Text>
        <ul className="mt-4 flex flex-col gap-3">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 text-p4 text-black transition-colors hover:text-brand-blue"
              >
                {item.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {categories && categories.length > 0 && (
        <div className="rounded-[20px] border border-[#B6B6B6] bg-white p-5">
          <Text variant="p3" className="font-semibold text-[#4A4A4A]">
            Category
          </Text>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.slug.current}
                className="rounded-full border border-[#D4D4D4] bg-[#F8F8F8] px-4 py-1 text-p4 text-[#5F5F5F]"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
