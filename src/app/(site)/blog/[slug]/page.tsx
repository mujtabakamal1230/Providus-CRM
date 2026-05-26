import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableContent } from "@/components/sanity/PortableContent";
import { CtaSection } from "@/components/sections";
import { formatDate } from "@/lib/format";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: BLOG_POST_SLUGS_QUERY,
    tags: ["posts"],
    revalidate: 60,
    metadata: true,
  });

  return (slugs ?? []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_QUERY,
    params: { slug },
    tags: ["posts"],
    metadata: true,
  });

  if (!post) {
    return {
      title: "Blog post",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const image = post.seo?.ogImage?.asset?.url || post.heroImage?.asset?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_QUERY,
    params: { slug },
    tags: ["posts"],
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <Section background="white" className="pb-0 pt-10 md:pt-16">
        <Container size="lg">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <Link href="/blog" className="text-p3 text-brand-blue">
              Back to blog
            </Link>
            <div className="flex flex-wrap justify-center gap-2">
              {post.categories?.map((category) => (
                <Badge key={category.slug.current} variant="green">
                  {category.title}
                </Badge>
              ))}
            </div>
            <Heading as="h1" className="text-black">
              {post.title}
            </Heading>
            {post.excerpt && (
              <Text variant="p2" className="max-w-3xl text-[#5F5F5F]">
                {post.excerpt}
              </Text>
            )}
            <Text variant="p3" className="text-[#8C8C8C]">
              {formatDate(post.publishedAt)}
              {post.author?.name ? ` by ${post.author.name}` : ""}
            </Text>
          </div>

          {post.heroImage?.asset && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[24px] bg-brand-blue-light">
              <SanityImage
                image={post.heroImage}
                altFallback={post.title}
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          )}
        </Container>
      </Section>

      <PortableContent value={post.body} />
      <CtaSection />
    </>
  );
}
