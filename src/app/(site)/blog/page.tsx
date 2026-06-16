import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/sections/BlogIndexClient";
import { CtaSection } from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { formatDate } from "@/lib/format";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { BlogPostListItem, Category } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("blog", {
    title: "Blog",
    description:
      "Read Providus CRM insights on Salesforce implementation, CRM strategy, automation, and customer operations.",
    canonicalPath: "/blog",
    image: "/images/case-study.png",
  });
}

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog | Providus CRM",
    "description": "Read Providus CRM insights on Salesforce implementation, CRM strategy, automation, and customer operations.",
    "url": "https://providuscrm.co.uk/blog",
    "blogPost": (posts ?? []).map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt ?? "",
      "image": post.heroImage?.asset?.url ?? "https://providuscrm.co.uk/images/case-study.png",
      "datePublished": post.publishedAt,
      "url": `https://providuscrm.co.uk/blog/${post.slug.current}`,
      "publisher": {
        "@type": "Organization",
        "name": "Providus CRM",
        "logo": {
          "@type": "ImageObject",
          "url": "https://providuscrm.co.uk/images/salesforce-partner.png"
        }
      }
    }))
  };
  const jsonLd = await getSitePageJsonLd("blog", schema);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <BlogIndexClient
        posts={blogItems}
        categories={(categories ?? []).map((category) => category.title)}
      />
      <CtaSection />
    </>
  );
}
