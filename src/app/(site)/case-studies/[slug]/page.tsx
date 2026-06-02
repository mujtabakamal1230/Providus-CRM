import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableContent } from "@/components/sanity/PortableContent";
import { CtaSection } from "@/components/sections";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";
import { sanityFetch } from "@/sanity/lib/fetch";
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

  const recentCaseStudies = (allCaseStudies ?? []).slice(0, 3);

  return (
    <>
      <main className="bg-white">
        <Container size="xl" className="pt-4 md:pt-6">
          {caseStudy.coverImage?.asset && (
            <div className="relative aspect-[2.22/1] overflow-hidden rounded-[20px] bg-brand-blue-light">
              <SanityImage
                image={caseStudy.coverImage}
                altFallback={caseStudy.title}
                className="object-cover object-center"
                priority
                sizes="(min-width: 1440px) 1376px, calc(100vw - 48px)"
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
            className="mx-auto mt-5 max-w-4xl text-black !text-[36px] !leading-[1.08] md:!text-[52px]"
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

        <RelatedProjects caseStudies={recentCaseStudies} />
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

function RelatedProjects({ caseStudies }: { caseStudies: CaseStudyListItem[] }) {
  return (
    <section className="bg-[#EEFFE9] py-16 md:py-20 border-y border-[#38A81B]">
      <Container size="xl">
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mt-5 text-black">
            More projects that made a mark.
          </Heading>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.map((caseStudy, index) => (
            <Link
              key={`${caseStudy._id}-${index}`}
              href={`/case-studies/${caseStudy.slug.current}`}
              className="group relative flex aspect-[0.95/1] flex-col justify-end overflow-hidden rounded-[18px] bg-black p-5 shadow-sm"
            >
              <div className="absolute inset-0">
                {caseStudy.coverImage?.asset ? (
                  <SanityImage
                    image={caseStudy.coverImage}
                    altFallback={caseStudy.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                ) : (
                  <Image
                    src="/images/case-studies/case-study.png"
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/90" />
              </div>

              <div className="relative">
                <Heading
                  as="h3"
                  level="h4"
                  className="max-w-[18rem] text-white !text-[21px] !leading-[1.05]"
                >
                  {caseStudy.title}
                </Heading>
                <span className="mt-4 inline-flex items-center rounded-full bg-brand-green px-4 py-2 text-[12px] font-semibold text-white">
                  View Project <span className="ml-2">-&gt;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
