import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableContent } from "@/components/sanity/PortableContent";
import { CtaSection, ServiceCaseStudiesSection } from "@/components/sections";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getSanityImageAspectRatio } from "@/lib/sanityImage";
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { CaseStudy, CaseStudyListItem } from "@/sanity/lib/types";

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
  const [caseStudy, allCaseStudies] = await Promise.all([
    sanityFetch<CaseStudy>({
      query: CASE_STUDY_QUERY,
      params: { slug },
      tags: ["case-studies"],
    }),
    sanityFetch<CaseStudyListItem[]>({
      query: CASE_STUDIES_QUERY,
      tags: ["case-studies"],
    }),
  ]);


  if (!caseStudy) {
    notFound();
  }

  const recentCaseStudies = (allCaseStudies ?? []).filter((cs) => cs.slug.current !== slug).slice(0, 2);

  const mappedCaseStudies = recentCaseStudies.map((cs) => ({
    title: cs.title,
    slug: cs.slug.current,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: cs.coverImage ? urlForImage(cs.coverImage as any).url() : "/images/case-studies/case-study.png",
    category: cs.industry,
  }));

  return (
    <>
      <main className="bg-white">
        <Container size="xl" className="pt-4 md:pt-6">
          {caseStudy.coverImage?.asset && (
            <div
              className="relative overflow-hidden rounded-[20px] bg-brand-blue-light"
              style={{
                aspectRatio: getSanityImageAspectRatio(caseStudy.coverImage),
              }}
            >
              <SanityImage
                image={caseStudy.coverImage}
                altFallback={caseStudy.title}
                className="object-contain"
                priority
                sizes="(min-width: 1800px) 1536px, (min-width: 1440px) 1376px, calc(100vw - 48px)"
                unoptimized
              />
            </div>
          )}
        </Container>

        <Container size="xl" className="py-12 text-center md:py-16">
          {caseStudy.industry && (
            <Badge
              variant="blue"
              className="border-2! border-brand-blue px-4 py-1 text-sm font-semibold bg-transparent"
            >
              {caseStudy.industry}
            </Badge>
          )}
          <Heading
            as="h1"
            className="mx-auto mt-5 max-w-4xl text-black !text-[32px] !leading-[1.12] md:!text-[52px] md:!leading-[1.08]"
          >
            {caseStudy.title}
          </Heading>
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <Text
              variant="p3"
              className="mx-auto mt-5 max-w-4xl text-[#5F5F5F]"
            >
              {caseStudy.technologies.map((technology) => technology.trim()).join(" | ")}
            </Text>
          )}
        </Container>

        <Container size="xl" className="pb-16 md:pb-24">
          <article className="flex flex-col gap-8 md:gap-10">
            <EditorialContent value={caseStudy.challenge} />
            <EditorialContent value={caseStudy.solution} />
            <EditorialContent value={caseStudy.results} />
            <EditorialContent value={caseStudy.body} />
          </article>
        </Container>

        <ServiceCaseStudiesSection caseStudies={mappedCaseStudies} />
      </main>
      <CtaSection />
    </>
  );
}

function EditorialContent({ value }: { value?: CaseStudy["challenge"] }) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableContent value={value} contained={false} />;
}
