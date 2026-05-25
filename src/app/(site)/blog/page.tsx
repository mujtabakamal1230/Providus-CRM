import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/sections/BlogIndexClient";
import { CtaSection } from "@/components/sections";
import { formatDate } from "@/lib/format";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { BlogPostListItem, Category } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Providus CRM insights on Salesforce implementation, CRM strategy, automation, and customer operations.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<BlogPostListItem[]>({
      query: BLOG_POSTS_QUERY,
      tags: ["posts"],
    }),
    sanityFetch<Category[]>({
      query: BLOG_CATEGORIES_QUERY,
      tags: ["categories"],
    }),
  ]);

  const blogItems = (posts ?? []).map((post) => ({
    title: post.title,
    slug: post.slug.current,
    date: formatDate(post.publishedAt),
    excerpt: post.excerpt ?? "",
    image: post.heroImage?.asset?.url ?? "/images/case-study.png",
    categories: post.categories?.map((category) => category.title) ?? [],
  }));

  return (
    <>
      <BlogIndexClient
        posts={blogItems}
        categories={(categories ?? []).map((category) => category.title)}
      />
      <CtaSection />
    </>
  );
}
