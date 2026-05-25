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
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { CaseStudy } from "@/sanity/lib/types";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["case-studies"],
    revalidate: 60,
    metadata: true,
  });

  return (slugs ?? []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await sanityFetch<CaseStudy>({
    query: CASE_STUDY_QUERY,
    params: { slug },
    tags: ["case-studies"],
    metadata: true,
  });

  if (!caseStudy) {
    return {
      title: "Case study",
    };
  }

  const title = caseStudy.seo?.metaTitle || caseStudy.title;
  const description = caseStudy.seo?.metaDescription || caseStudy.excerpt;
  const image =
    caseStudy.seo?.ogImage?.asset?.url || caseStudy.coverImage?.asset?.url;

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

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await sanityFetch<CaseStudy>({
    query: CASE_STUDY_QUERY,
    params: { slug },
    tags: ["case-studies"],
  });

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Section background="blue" className="pb-12 pt-10 md:pt-16">
        <Container size="lg">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Link href="/case-studies" className="text-p3 text-white/80">
                Back to case studies
              </Link>
              <div className="flex flex-wrap gap-2">
                {caseStudy.industry && (
                  <Badge variant="green">{caseStudy.industry}</Badge>
                )}
                {caseStudy.clientName && (
                  <Badge variant="blue">{caseStudy.clientName}</Badge>
                )}
              </div>
              <Heading as="h1" className="text-white">
                {caseStudy.title}
              </Heading>
              {caseStudy.excerpt && (
                <Text variant="p2" className="max-w-3xl text-white/85">
                  {caseStudy.excerpt}
                </Text>
              )}
              <Text variant="p3" className="text-white/70">
                {formatDate(caseStudy.publishedAt)}
              </Text>
            </div>

            <div className="lg:col-span-5">
              {caseStudy.resultSummary && (
                <div className="rounded-[20px] bg-white p-6">
                  <Text variant="p4" className="uppercase text-brand-blue">
                    Result
                  </Text>
                  <Heading as="h4" className="mt-2 text-black">
                    {caseStudy.resultSummary}
                  </Heading>
                </div>
              )}
            </div>
          </div>

          {caseStudy.coverImage?.asset && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[24px] bg-brand-blue-light">
              <SanityImage
                image={caseStudy.coverImage}
                altFallback={caseStudy.title}
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          )}
        </Container>
      </Section>

      {caseStudy.technologies && caseStudy.technologies.length > 0 && (
        <Section background="white" className="py-10">
          <Container size="md">
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((technology) => (
                <Badge key={technology} variant="blue">
                  {technology}
                </Badge>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {caseStudy.challenge && (
        <ContentBlock title="Challenge" value={caseStudy.challenge} />
      )}
      {caseStudy.solution && (
        <ContentBlock title="Solution" value={caseStudy.solution} />
      )}
      {caseStudy.results && (
        <ContentBlock title="Results" value={caseStudy.results} />
      )}
      {caseStudy.body && <PortableContent value={caseStudy.body} />}
      <CtaSection />
    </>
  );
}

function ContentBlock({
  title,
  value,
}: {
  title: string;
  value: NonNullable<CaseStudy["challenge"]>;
}) {
  return (
    <Section background="white" className="py-0">
      <Container size="md">
        <div className="border-t border-gray-100 pt-10">
          <Heading as="h2" className="mb-6 text-black">
            {title}
          </Heading>
        </div>
      </Container>
      <PortableContent value={value} />
    </Section>
  );
}
