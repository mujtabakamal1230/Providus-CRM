import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CertifiedSection,
  ExpertiseSection,
  IndustriesSection,
  PartnersSection,
  SalesforceConsultCtaSection,
  SalesforceServiceHero,
  ServiceBenefitsSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  WhyChooseSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import type {
  ExpertiseItem,
} from "@/components/sections/ExpertiseSection";
import type {
  IndustrySectionItem,
} from "@/components/sections/IndustriesSection";
import type {
  WhatWeDoTab,
} from "@/components/sections/WhatWeDoSection";
import type {
  WhyChooseReason,
} from "@/components/sections/WhyChooseSection";
import {
  SALESFORCE_CONSULTING_SERVICES_SLUG,
  salesforceConsultingServicesFallback,
} from "@/data/salesforceServicePage";
import { resolveJsonLd } from "@/lib/jsonLd";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  CASE_STUDIES_QUERY,
  SERVICE_PAGE_QUERY,
  SERVICE_PAGE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  CaseStudyListItem,
  SanityImage,
  ServiceBenefitItem,
  ServicePage,
} from "@/sanity/lib/types";

interface SalesforceServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: SERVICE_PAGE_SLUGS_QUERY,
    tags: ["service-pages"],
    revalidate: 60,
    metadata: true,
  });

  const uniqueSlugs = new Set([
    SALESFORCE_CONSULTING_SERVICES_SLUG,
    ...(slugs ?? []).map((item) => item.slug),
  ]);

  return Array.from(uniqueSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SalesforceServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const fetchedPage = await getServicePage(slug, true);

  if (!fetchedPage) {
    return {
      title: "Salesforce service",
    };
  }

  const title = fetchedPage.seo?.metaTitle || fetchedPage.title;
  const description =
    fetchedPage.seo?.metaDescription || fetchedPage.hero?.description;
  const image =
    fetchedPage.seo?.ogImage?.asset?.url ||
    fetchedPage.hero?.backgroundImage?.asset?.url;

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

export default async function SalesforceServicePage({
  params,
}: SalesforceServicePageProps) {
  const { slug } = await params;
  const [fetchedPage, fallbackCaseStudies] = await Promise.all([
    getServicePage(slug),
    sanityFetch<CaseStudyListItem[]>({
      query: CASE_STUDIES_QUERY,
      tags: ["case-studies"],
    }),
  ]);

  const page =
    fetchedPage ||
    (slug === SALESFORCE_CONSULTING_SERVICES_SLUG
      ? salesforceConsultingServicesFallback
      : null);

  if (!page) {
    notFound();
  }

  const caseStudySource =
    page.caseStudies && page.caseStudies.length > 0
      ? page.caseStudies
      : fetchedPage
        ? []
        : fallbackCaseStudies ?? [];

  const serviceCaseStudies = caseStudySource.map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    image: imageUrl(caseStudy.coverImage) || "/images/case-study.png",
    label: caseStudy.technologies?.[0] || "Salesforce Consulting",
    category: caseStudy.industry,
  }));
  const consultantCta = page.consultantCta;
  const legacyCta = page.cta;
  const jsonLd = resolveJsonLd(page.jsonLd);

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />
      <SalesforceServiceHero
        badgeTitle={page.hero?.badgeTitle}
        badgeSubtitle={page.hero?.badgeSubtitle}
        title={page.hero?.heading || page.title}
        description={page.hero?.description}
        bullets={page.hero?.bullets}
        formTitle={page.hero?.formTitle}
        formButtonLabel={page.hero?.formButtonLabel}
        backgroundImage={imageUrl(page.hero?.backgroundImage)}
      />
      <PartnersSection />
      <CertifiedSection
        title={page.certified?.title}
        description={page.certified?.description}
      />
      <ServiceCaseStudiesSection caseStudies={serviceCaseStudies} />
      <WhatWeDoSection
        title={page.tabsSection?.title}
        tabs={toWhatWeDoTabs(page)}
        backgroundOverlayColor="#616161"
      />
      <SalesforceConsultCtaSection
        title={consultantCta?.title || legacyCta?.title}
        buttonLabel={consultantCta?.buttonLabel || legacyCta?.buttonLabel}
        buttonHref={consultantCta?.buttonHref || legacyCta?.buttonHref}
        backgroundColor={consultantCta?.backgroundColor}
        image={imageUrl(consultantCta?.image)}
        imageAlt={consultantCta?.image?.alt}
      />
      <ServiceBenefitsSection
        title={page.benefitsSection?.title}
        items={toBenefitCards(page.benefitsSection?.items)}
      />
      <ExpertiseSection
        title={page.expertiseSection?.title}
        items={toExpertiseItems(page)}
      />
      <IndustriesSection
        title={page.industriesSection?.title}
        items={toIndustryItems(page)}
      />
      <WhyChooseSection
        title={page.whyChooseSection?.title}
        customReasons={toWhyChooseReasons(page)}
        image={imageUrl(page.whyChooseSection?.image)}
        imageAlt={page.whyChooseSection?.image?.alt}
        backgroundOverlayColor="#616161"
      />

    </div>
  );
}

async function getServicePage(slug: string, metadata = false) {
  return sanityFetch<ServicePage>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ["service-pages"],
    metadata,
  });
}

function imageUrl(image?: SanityImage) {
  return image?.asset?.url;
}

function toWhatWeDoTabs(page: ServicePage): WhatWeDoTab[] | undefined {
  const tabs = page.tabsSection?.tabs;

  if (!tabs || tabs.length === 0) {
    return undefined;
  }

  return tabs.map((tab, index) => ({
    id: slugify(tab.label) || `service-tab-${index}`,
    label: tab.label,
    content: {
      heading: tab.heading,
      text: tab.text || "",
      bullets: tab.bullets,
    },
  }));
}

function toBenefitCards(items?: ServiceBenefitItem[]) {
  return (items ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title,
      description: item.description || "",
      iconKey: item.iconKey,
      colorTheme: item.colorTheme,
    }));
}

function toExpertiseItems(page: ServicePage): ExpertiseItem[] | undefined {
  const items = page.expertiseSection?.items;

  if (!items || items.length === 0) {
    return undefined;
  }

  return items.map((item, index) => ({
    id: `${slugify(item.title)}-${index}`,
    title: item.title,
    text: item.text || "",
    icon: imageUrl(item.icon) || "/images/service-cloud.png",
    shadow: `0px 4.36px 0px 0px ${item.accentColor || "#1D70C5"}`,
  }));
}

function toIndustryItems(page: ServicePage): IndustrySectionItem[] | undefined {
  const items = page.industriesSection?.items;

  if (!items || items.length === 0) {
    return undefined;
  }

  return items.map((item) => ({
    title: item.title,
    description: item.description || "",
    image: imageUrl(item.image) || "/images/industries.png",
  }));
}

function toWhyChooseReasons(page: ServicePage): WhyChooseReason[] | undefined {
  const reasons = page.whyChooseSection?.reasons;

  if (!reasons || reasons.length === 0) {
    return undefined;
  }

  const fallbackIcons = [
    "/images/different.png",
    "/images/better.png",
    "/images/salesforce-partner.png",
  ];

  return reasons.map((reason, index) => ({
    title: reason.title,
    text: reason.text || "",
    color: reason.color || "#1D70C5",
    icon: imageUrl(reason.icon) || fallbackIcons[index % fallbackIcons.length],
  }));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
