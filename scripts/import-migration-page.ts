import { createReadStream, existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import { PDFParse } from "pdf-parse";

type SectionKey =
  | "partners"
  | "hero"
  | "certified"
  | "caseStudies"
  | "tabs"
  | "consultantCta"
  | "benefits"
  | "process"
  | "migrationPlatforms"
  | "expertise"
  | "industries"
  | "whyChoose"
  | "cta";

type ColorTheme = "blue" | "green";
type BenefitColorTheme = "blue" | "green" | "yellow" | "peach" | "pink" | "purple";
type ServicePageSectionOrderKey =
  | "partners"
  | "certified"
  | "caseStudies"
  | "tabs"
  | "consultantCta"
  | "benefits"
  | "process"
  | "migrationPlatforms"
  | "expertise"
  | "industries"
  | "whyChoose"
  | "cta";

interface CliOptions {
  dryRun: boolean;
  pdfPath?: string;
  publish: boolean;
  slug?: string;
}

interface SanityImageField {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt?: string;
}

interface ServicePageDocument {
  _id: string;
  _type: "servicePage";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  status: "draft" | "published";
  sectionOrder: ServicePageSectionOrderKey[];
  hero?: {
    badgeTitle: string;
    badgeSubtitle: string;
    heading: string;
    description: string;
    bullets: string[];
    formTitle: string;
    formButtonLabel: string;
  };
  certified?: {
    title: string;
    description: string;
  };
  tabsSection?: {
    title: string;
    tabs: Array<{
      label: string;
      heading: string;
      text: string;
      bullets: string[];
    }>;
  };
  consultantCta?: {
    title: string;
    buttonLabel: string;
    buttonHref: string;
  };
  benefitsSection?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      iconKey: string;
      colorTheme: BenefitColorTheme;
    }>;
  };
  processSection?: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
      iconKey: string;
      colorTheme: ColorTheme;
    }>;
  };
  migrationPlatformsSection?: {
    title: string;
    items: Array<{
      name: string;
      logo?: SanityImageField;
      text: string;
      colorTheme: ColorTheme;
    }>;
  };
  expertiseSection?: {
    title: string;
    items: Array<{
      title: string;
      text: string;
      icon?: SanityImageField;
      accentColor: string;
    }>;
  };
  industriesSection?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  whyChooseSection?: {
    title: string;
    reasons: Array<{
      title: string;
      text: string;
      color: string;
    }>;
  };
  cta?: {
    title: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

const DEFAULT_PDF_DIR = "content";

const TAB_HEADINGS = [
  "Salesforce Enablement",
  "Salesforce Audit",
  "Implementation Roadmap",
  "Technical & Architecture Design",
  "Operations & Data Governance",
  "Integration Strategy",
  "Salesforce PaaS",
  "Integration Plan, Roadmap & Architecture",
  "API Integration",
  "Custom Connector Development",
  "Salesforce Data Integration",
  "Salesforce Integration via Middleware",
  "MCP Integration",
  "Integration Audit",
  "Data Governance & Compliance",
  "Integration Support & Maintenance",
  "Salesforce Audit & Health Check",
  "Custom Salesforce Development",
  "AppExchange App Development",
  "Salesforce Package Development",
  "Salesforce Implementation",
  "Salesforce Customisation",
  "Salesforce Integration",
  "Salesforce Migration",
  "Salesforce Mobile App Development",
  "Salesforce Data Migration",
  "Platform & Integration Migration",
  "Performance Audit & Optimisation",
  "Salesforce Classic to Lightning Migration",
  "Classic to Lightning Migration",
  "UI Modernisation via LWC",
  "Analytics, Dashboard & Reports Migration",
  "Analytics, Dashboard & Reports",
  "Configuration Migration",
];

const PROCESS_HEADINGS = [
  "Analysis",
  "Design",
  "Strategy",
  "Discovery & Audit",
  "Strategy & Data Mapping",
  "Data Cleaning & Transformation",
  "Development",
  "End-to-End Migration",
  "Release",
  "Post Go-Live QA & Support",
  "Support",
];

const MIGRATION_PLATFORM_HEADINGS = [
  "HubSpot",
  "Zoho CRM",
  "Microsoft Dynamics 365",
  "Pipedrive",
  "Monday CRM",
  "SugarCRM",
  "NetSuite CRM",
];

const EXPERTISE_HEADINGS = [
  "Sales Cloud",
  "Service Cloud",
  "Marketing Cloud",
  "Experience Cloud",
  "Revenue Cloud",
  "Data Cloud",
  "Agentforce",
];

const INDUSTRY_HEADINGS = [
  ...EXPERTISE_HEADINGS,
  "Nonprofit Cloud",
  "Education Cloud",
  "Health Cloud",
  "Commerce Cloud",
  "Manufacturing Cloud",
  "Financial Services Cloud",
];

const WHY_CHOOSE_HEADINGS = [
  "Certified, Experienced Salesforce Teams",
  "Minimal Disruption & Downtime",
  "Secure, Stable & Compliant CRM",
  "Clean, Accurate Data",
  "Certified, Experienced Salesforce Developers",
  "Agile Delivery & Outcome-First Approach",
  "AI-Enabled Salesforce Orgs",
  "Innovative, Workable Solutions",
];

const SECTION_ALIASES: Record<string, SectionKey> = {
  "TRUSTED PARTNERS": "partners",
  "TRUSTED PARTNERS SECTION": "partners",
  "PARTNERS SECTION": "partners",
  "HERO FOLD": "hero",
  "HERO SECTION": "hero",
  HERO: "hero",
  "CERTIFIED SECTION": "certified",
  CERTIFIED: "certified",
  "CASE STUDIES": "caseStudies",
  "CASE STUDIES SECTION": "caseStudies",
  "TABS SECTION": "tabs",
  TABS: "tabs",
  "CONSULTANT CTA": "consultantCta",
  "CONSULTANT CTA SECTION": "consultantCta",
  "MIDDLE CTA": "consultantCta",
  "BENEFITS TIMELINE SECTION": "benefits",
  "BENEFITS TIMELINE": "benefits",
  "BENEFITS SECTION": "benefits",
  BENEFITS: "benefits",
  "SALESFORCE PROCESS": "process",
  "SALESFORCE PROCESS SECTION": "process",
  "PROCESS SECTION": "process",
  PROCESS: "process",
  "MIGRATION PLATFORMS": "migrationPlatforms",
  "MIGRATION PLATFORMS SECTION": "migrationPlatforms",
  "EXPERTISE CAROUSEL": "expertise",
  "EXPERTISE CAROUSEL SECTION": "expertise",
  "EXPERTISE SECTION": "expertise",
  EXPERTISE: "expertise",
  "INDUSTRY GRID": "industries",
  "INDUSTRY GRID SECTION": "industries",
  "INDUSTRIES GRID": "industries",
  "INDUSTRIES SECTION": "industries",
  INDUSTRIES: "industries",
  "WHY CHOOSE": "whyChoose",
  "WHY CHOOSE SECTION": "whyChoose",
  "FOOTER CTA": "cta",
  "FOOTER CTA SECTION": "cta",
  "LAST CTA BEFORE FOOTER": "cta",
  "CTA SECTION": "cta",
};

const SECTION_ORDER_BY_MARKER: Partial<
  Record<SectionKey, ServicePageSectionOrderKey>
> = {
  certified: "certified",
  caseStudies: "caseStudies",
  tabs: "tabs",
  consultantCta: "consultantCta",
  benefits: "benefits",
  process: "process",
  migrationPlatforms: "migrationPlatforms",
  expertise: "expertise",
  industries: "industries",
  whyChoose: "whyChoose",
  cta: "cta",
};

const REQUIRED_SECTIONS: SectionKey[] = ["hero", "certified", "tabs"];

const PROCESS_ICON_KEYS = [
  "analysis",
  "strategy",
  "design",
  "development",
  "release",
  "support",
];

const BENEFIT_ICON_KEYS = [
  "roi",
  "adoption",
  "maturity",
  "visibility",
  "view360",
  "partnership",
];

const BENEFIT_COLOR_THEMES: BenefitColorTheme[] = [
  "blue",
  "green",
  "yellow",
  "peach",
  "pink",
  "purple",
];

const EXPERTISE_ACCENT_COLORS = [
  "#1D70C5",
  "#F4AC3B",
  "#38A81B",
  "#0D9DDA",
  "#8A8FD2",
  "#F45A3E",
];

const EXPERTISE_ICON_PATHS: Record<string, string> = {
  "Sales Cloud": "public/images/sales-cloud.png",
  "Service Cloud": "public/images/service-cloud.png",
  "Marketing Cloud": "public/images/marketing-cloud.png",
  "Experience Cloud": "public/images/experience-cloud.png",
  "Revenue Cloud": "public/images/revenue-cloud.png",
  Agentforce: "public/images/agent-force.png",
};

const MIGRATION_LOGO_PATHS: Record<string, string> = {
  HubSpot: "public/images/migration-logos/hubspot.png",
  "Zoho CRM": "public/images/migration-logos/zohocrm.png",
  "Microsoft Dynamics 365": "public/images/migration-logos/dynamics.png",
  Pipedrive: "public/images/migration-logos/pipedrive.png",
  "Monday CRM": "public/images/migration-logos/monday-sales-crm.png",
  SugarCRM: "public/images/migration-logos/sugarcrm.png",
  "NetSuite CRM": "public/images/migration-logos/netsuite.png",
};

async function run() {
  loadEnvFile(".env");
  loadEnvFile(".env.local");

  const options = parseCliOptions(process.argv.slice(2));
  const pdfPaths = options.pdfPath ? [options.pdfPath] : findPdfFiles(DEFAULT_PDF_DIR);

  if (pdfPaths.length > 1 && options.slug) {
    throw new Error("Use --slug only with --pdf so multiple PDFs do not overwrite one page.");
  }

  const client = options.dryRun ? createReadOnlySanityClient() : createSanityClient();
  const documents: ServicePageDocument[] = [];

  for (const pdfPath of pdfPaths) {
    const sections = await extractMarkedSections(pdfPath);
    const slug = options.slug || deriveSlugFromSections(sections, pdfPath);
    const draftDocument = await buildServicePageDocument({
      client,
      dryRun: options.dryRun,
      sections,
      slug,
      status: "draft",
    });
    const existingDocument = options.dryRun
      ? null
      : await findExistingServicePage(client, slug, draftDocument.title);
    const status = options.publish
      ? "published"
      : existingDocument?.status || "draft";
    const document = existingDocument
      ? { ...draftDocument, _id: existingDocument._id, status }
      : { ...draftDocument, status };

    documents.push(document);
  }

  if (options.dryRun) {
    console.log(JSON.stringify(documents.length === 1 ? documents[0] : documents, null, 2));
    return;
  }

  for (const document of documents) {
    const result = await client.createOrReplace(document);
    console.log(
      `Imported ${document.title} as ${document.status}. Slug: ${document.slug.current}. Document ID: ${result._id}`
    );
  }
}

async function buildServicePageDocument({
  client,
  dryRun,
  existingId,
  sections,
  slug,
  status,
}: {
  client: SanityClient;
  dryRun: boolean;
  existingId?: string;
  sections: Map<SectionKey, string[]>;
  slug: string;
  status: "draft" | "published";
}): Promise<ServicePageDocument> {
  const hero = parseHeroSection(requireSection(sections, "hero"));
  const certified = parseTitleTextSection(requireSection(sections, "certified"), 2);
  const tabs = parseTabbedSection(requireSection(sections, "tabs"));
  const consultantCtaLines = getSection(sections, "consultantCta");
  const benefitsLines = getSection(sections, "benefits");
  const processLines = getSection(sections, "process");
  const migrationPlatformLines = getSection(sections, "migrationPlatforms");
  const expertiseLines = getSection(sections, "expertise");
  const industriesLines = getSection(sections, "industries");
  const whyChooseLines = getSection(sections, "whyChoose");
  const ctaLines = getSection(sections, "cta");
  const consultantCta = consultantCtaLines
    ? parseConsultantCtaSection(consultantCtaLines)
    : undefined;
  const benefits = benefitsLines ? parseBenefitsSection(benefitsLines) : undefined;
  const process = processLines ? parseProcessSection(processLines) : undefined;
  const migrationPlatforms = migrationPlatformLines
    ? await parseMigrationPlatformsSection({
        client,
        dryRun,
        lines: migrationPlatformLines,
      })
    : undefined;
  const expertise = expertiseLines
    ? await parseExpertiseSection({
        client,
        dryRun,
        lines: expertiseLines,
      })
    : undefined;
  const industries = industriesLines ? parseIndustriesSection(industriesLines) : undefined;
  const whyChoose = whyChooseLines ? parseWhyChooseSection(whyChooseLines) : undefined;
  const cta = ctaLines ? parseCtaSection(ctaLines) : undefined;

  return {
    _id: existingId || `servicePage.${slug}`,
    _type: "servicePage",
    title: hero.heading,
    slug: {
      _type: "slug",
      current: slug,
    },
    status,
    sectionOrder: deriveSectionOrder(sections),
    hero,
    certified,
    tabsSection: tabs,
    ...(consultantCta ? { consultantCta } : {}),
    ...(benefits ? { benefitsSection: benefits } : {}),
    ...(process ? { processSection: process } : {}),
    ...(migrationPlatforms ? { migrationPlatformsSection: migrationPlatforms } : {}),
    ...(expertise ? { expertiseSection: expertise } : {}),
    ...(industries ? { industriesSection: industries } : {}),
    ...(whyChoose ? { whyChooseSection: whyChoose } : {}),
    ...(cta ? { cta } : {}),
  };
}

function parseHeroSection(lines: string[]) {
  const contentLines = stripBracketNotes(lines);
  const [heading = "Salesforce Migration Services", ...rest] = contentLines;
  const { bullets, textLines } = splitBullets(rest);

  return {
    badgeTitle: "Certified",
    badgeSubtitle: "Salesforce Partner in the UK",
    heading,
    description: linesToParagraphs(textLines),
    bullets,
    formTitle: "Fill a form today",
    formButtonLabel: "Let's Connect",
  };
}

function parseTitleTextSection(lines: string[], maxTitleLines: number) {
  const contentLines = stripBracketNotes(lines);
  const { title, bodyLines } = splitTitleAndBody(contentLines, maxTitleLines);

  return {
    title,
    description: linesToParagraphs(bodyLines),
  };
}

function parseTabbedSection(lines: string[]) {
  const parsed = splitSectionItemsWithBreaks(stripBracketNotesKeepingBreaks(lines), TAB_HEADINGS);

  return {
    title: parsed.title,
    tabs: parsed.items.map((item) => {
      const { bullets, textLines } = splitBullets(item.lines);

      return {
        label: item.heading,
        heading: item.heading,
        text: linesToParagraphs(textLines),
        bullets,
      };
    }),
  };
}

function parseConsultantCtaSection(lines: string[]) {
  const contentLines = stripBracketNotes(lines);
  const [title = "Connect With Our Salesforce Consultants To Discuss Your CRM Needs And Business Goals."] =
    contentLines;

  return {
    title,
    buttonLabel: extractButtonLabel(lines) || "Let's Connect",
    buttonHref: "/contact",
  };
}

function parseBenefitsSection(lines: string[]) {
  const parsed = splitSectionItems(stripBracketNotes(lines), PROCESS_HEADINGS);

  return {
    title: parsed.title,
    items: parsed.items.map((item, index) => ({
      title: item.heading,
      description: linesToParagraphs(item.lines),
      iconKey: BENEFIT_ICON_KEYS[index] || "roi",
      colorTheme: BENEFIT_COLOR_THEMES[index % BENEFIT_COLOR_THEMES.length],
    })),
  };
}

function parseProcessSection(lines: string[]) {
  const parsed = splitSectionItems(stripBracketNotes(lines), PROCESS_HEADINGS);

  return {
    title: parsed.title,
    steps: parsed.items.map((item, index) => {
      const colorTheme: ColorTheme = index % 2 === 0 ? "blue" : "green";

      return {
        title: item.heading,
        description: linesToParagraphs(item.lines),
        iconKey: PROCESS_ICON_KEYS[index] || "analysis",
        colorTheme,
      };
    }),
  };
}

async function parseMigrationPlatformsSection({
  client,
  dryRun,
  lines,
}: {
  client: SanityClient;
  dryRun: boolean;
  lines: string[];
}) {
  const parsed = splitSectionItems(stripBracketNotes(lines), MIGRATION_PLATFORM_HEADINGS);

  return {
    title: parsed.title,
    items: await Promise.all(
      parsed.items.map(async (item, index) => {
        const colorTheme: ColorTheme = index % 2 === 0 ? "green" : "blue";

        return {
          name: item.heading,
          logo: await maybeUploadImage(
            client,
            dryRun,
            MIGRATION_LOGO_PATHS[item.heading],
            item.heading
          ),
          text: linesToParagraphs(item.lines),
          colorTheme,
        };
      })
    ),
  };
}

async function parseExpertiseSection({
  client,
  dryRun,
  lines,
}: {
  client: SanityClient;
  dryRun: boolean;
  lines: string[];
}) {
  const parsed = splitSectionItems(stripBracketNotes(lines), [
    ...EXPERTISE_HEADINGS,
    ...MIGRATION_PLATFORM_HEADINGS,
  ]);

  return {
    title: parsed.title,
    items: await Promise.all(
      parsed.items.map(async (item, index) => ({
        title: item.heading,
        text: linesToParagraphs(item.lines),
        icon: await maybeUploadImage(
          client,
          dryRun,
          EXPERTISE_ICON_PATHS[item.heading],
          item.heading
        ),
        accentColor: EXPERTISE_ACCENT_COLORS[index % EXPERTISE_ACCENT_COLORS.length],
      }))
    ),
  };
}

function parseIndustriesSection(lines: string[]) {
  const parsed = splitSectionItems(stripBracketNotes(lines), INDUSTRY_HEADINGS);

  return {
    title: parsed.title,
    items: parsed.items.map((item) => ({
      title: item.heading,
      description: linesToParagraphs(item.lines),
    })),
  };
}

function parseWhyChooseSection(lines: string[]) {
  const parsed = splitSectionItems(stripBracketNotes(lines), WHY_CHOOSE_HEADINGS);

  return {
    title: parsed.title,
    reasons: parsed.items.map((item, index) => ({
      title: item.heading,
      text: linesToParagraphs(item.lines),
      color: index % 2 === 0 ? "#1D70C5" : "#38A81B",
    })),
  };
}

function parseCtaSection(lines: string[]) {
  const contentLines = stripBracketNotes(lines);
  const [title = "Connect With Our Salesforce Team Today!"] = contentLines;

  return {
    title,
    buttonLabel: extractButtonLabel(lines) || "Let's Connect",
    buttonHref: "/contact",
  };
}

function splitSectionItems(lines: string[], preferredHeadings: string[]) {
  const preferredItems = splitItemsByHeadings(lines, preferredHeadings);

  if (preferredItems.items.length > 0) {
    return preferredItems;
  }

  return splitItemsByDetectedHeadings(lines);
}

function splitSectionItemsWithBreaks(lines: string[], preferredHeadings: string[]) {
  const compactLines = lines.filter(Boolean);
  const preferredItems = splitItemsByHeadings(compactLines, preferredHeadings);

  if (preferredItems.items.length > 0) {
    return preferredItems;
  }

  return splitItemsByDetectedHeadingsWithBreaks(lines);
}

function splitItemsByHeadings(lines: string[], headings: string[]) {
  const foundHeadings = headings
    .map((heading) => ({
      heading,
      start: findHeadingIndex(lines, heading, 0),
    }))
    .filter((item) => item.start !== -1)
    .sort((left, right) => left.start - right.start);
  const titleEndIndex =
    foundHeadings.length > 0 ? foundHeadings[0].start : lines.length;
  const title = linesToParagraphs(lines.slice(0, Math.max(0, titleEndIndex)));
  const items: Array<{ heading: string; lines: string[] }> = [];

  for (let index = 0; index < foundHeadings.length; index += 1) {
    const { heading, start } = foundHeadings[index];
    const end = foundHeadings[index + 1]?.start ?? lines.length;

    items.push({
      heading,
      lines: lines.slice(start + 1, end),
    });
  }

  return {
    title,
    items,
  };
}

function splitItemsByDetectedHeadings(lines: string[]) {
  const headingIndexes = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line, index }) => looksLikeItemHeading(line, lines[index + 1]))
    .map(({ index }) => index);

  return splitByHeadingIndexes(lines, headingIndexes);
}

function splitItemsByDetectedHeadingsWithBreaks(lines: string[]) {
  const headingIndexes = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line, index }) => {
      const previousLine = findPreviousNonBlankLine(lines, index);
      const nextLine = findNextNonBlankLine(lines, index);

      return (
        (!previousLine || lines[index - 1] === "") &&
        looksLikeItemHeading(line, nextLine)
      );
    })
    .map(({ index }) => index);

  return splitByHeadingIndexes(lines, headingIndexes);
}

function splitByHeadingIndexes(lines: string[], headingIndexes: number[]) {
  if (headingIndexes.length === 0) {
    return {
      title: linesToParagraphs(lines),
      items: [],
    };
  }

  const title = linesToParagraphs(lines.slice(0, headingIndexes[0]));
  const items = headingIndexes.map((startIndex, index) => {
    const endIndex = headingIndexes[index + 1] ?? lines.length;

    return {
      heading: lines[startIndex],
      lines: lines.slice(startIndex + 1, endIndex),
    };
  });

  return {
    title,
    items,
  };
}

function splitTitleAndBody(lines: string[], maxTitleLines: number) {
  const titleLines: string[] = [];
  const bodyLines = [...lines];

  while (bodyLines.length > 0 && titleLines.length < maxTitleLines) {
    const nextLine = bodyLines[0];

    if (titleLines.length > 0 && looksLikeBodyText(nextLine)) {
      break;
    }

    titleLines.push(bodyLines.shift() || "");
  }

  return {
    title: linesToParagraphs(titleLines),
    bodyLines,
  };
}

function splitBullets(lines: string[]) {
  const bullets: string[] = [];
  const textLines: string[] = [];

  for (const line of lines) {
    const bullet = line.match(/^[\u2022\u25cf*-]\s*(.+)$/);

    if (bullet) {
      bullets.push(cleanText(bullet[1]));
      continue;
    }

    textLines.push(line);
  }

  return {
    bullets,
    textLines,
  };
}

async function extractMarkedSections(pdfPath: string) {
  const parser = new PDFParse({ data: readFileSync(pdfPath) });

  try {
    const result = await parser.getText();
    const sections = splitMarkedSections(result.text);
    const missingSections = REQUIRED_SECTIONS.filter((section) => !sections.has(section));

    if (missingSections.length > 0) {
      throw new Error(`Missing PDF sections: ${missingSections.join(", ")}`);
    }

    return sections;
  } finally {
    await parser.destroy();
  }
}

function splitMarkedSections(text: string) {
  const sections = new Map<SectionKey, string[]>();
  let currentSection: SectionKey | undefined;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = cleanText(rawLine);

    if (isPageMarker(line)) {
      continue;
    }

    const marker = getKnownSectionMarker(line);

    if (marker) {
      currentSection = marker;

      if (!sections.has(marker)) {
        sections.set(marker, []);
      }

      continue;
    }

    if (currentSection) {
      sections.get(currentSection)?.push(line);
    }
  }

  return sections;
}

function getKnownSectionMarker(line: string) {
  const marker = line.match(/^\[([^\]}]+)[\]}]$/);

  if (!marker) {
    return undefined;
  }

  return SECTION_ALIASES[normalizeMarkerName(marker[1])];
}

function requireSection(sections: Map<SectionKey, string[]>, section: SectionKey) {
  const lines = sections.get(section);

  if (!lines) {
    throw new Error(`Missing required section: ${section}`);
  }

  return lines;
}

function getSection(sections: Map<SectionKey, string[]>, section: SectionKey) {
  return sections.get(section);
}

function deriveSectionOrder(sections: Map<SectionKey, string[]>) {
  const sectionOrder: ServicePageSectionOrderKey[] = ["partners"];
  const seen = new Set<ServicePageSectionOrderKey>(sectionOrder);

  for (const sectionKey of sections.keys()) {
    const orderKey = SECTION_ORDER_BY_MARKER[sectionKey];

    if (!orderKey || seen.has(orderKey)) {
      continue;
    }

    sectionOrder.push(orderKey);
    seen.add(orderKey);
  }

  return sectionOrder;
}

function deriveSlugFromSections(sections: Map<SectionKey, string[]>, pdfPath: string) {
  const heroLines = getSection(sections, "hero");
  const heroTitle = heroLines ? parseHeroSection(heroLines).heading : "";
  const fileTitle = path.basename(pdfPath, path.extname(pdfPath));
  const slug = slugify(
    heroTitle ||
      fileTitle
        .replace(/\s+-\s+Final\s+-\s+PROVIDUSCRM.*$/i, "")
        .replace(/\s+\(\d+\)$/g, "")
  );

  if (!slug) {
    throw new Error(`Could not derive slug for PDF: ${pdfPath}`);
  }

  return slug;
}

function stripBracketNotes(lines: string[]) {
  return stripBracketNotesKeepingBreaks(lines).filter(Boolean);
}

function stripBracketNotesKeepingBreaks(lines: string[]) {
  return lines
    .map(cleanText)
    .filter((line) => !isPageMarker(line))
    .filter((line) => !/^\[.+\]$/.test(line));
}

function extractButtonLabel(lines: string[]) {
  const buttonLine = lines
    .map(cleanText)
    .find((line) => /^\[.+\]$/.test(line) && !getKnownSectionMarker(line));

  return buttonLine?.replace(/^\[|\]$/g, "");
}

function linesToParagraphs(lines: string[]) {
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];

  for (const line of lines.map(cleanText)) {
    if (!line) {
      if (currentParagraph.length > 0) {
        paragraphs.push(joinWrappedLines(currentParagraph));
        currentParagraph = [];
      }
      continue;
    }

    currentParagraph.push(line);
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(joinWrappedLines(currentParagraph));
  }

  return paragraphs.join("\n\n");
}

function joinWrappedLines(lines: string[]) {
  return cleanText(lines.join(" "));
}

function findFirstHeadingIndex(lines: string[], headings: string[]) {
  const indexes = headings
    .map((heading) => findHeadingIndex(lines, heading, 0))
    .filter((index) => index !== -1);

  return indexes.length > 0 ? Math.min(...indexes) : lines.length;
}

function findHeadingIndex(lines: string[], heading: string, fromIndex: number) {
  return lines.findIndex(
    (line, index) => index >= fromIndex && normalizeHeading(line) === normalizeHeading(heading)
  );
}

function findPreviousNonBlankLine(lines: string[], index: number) {
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    if (lines[cursor]) {
      return lines[cursor];
    }
  }

  return undefined;
}

function findNextNonBlankLine(lines: string[], index: number) {
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    if (lines[cursor]) {
      return lines[cursor];
    }
  }

  return undefined;
}

function looksLikeBodyText(line?: string) {
  if (!line) {
    return false;
  }

  return line.length > 72 || /[.!?]$/.test(line);
}

function looksLikeItemHeading(line?: string, nextLine?: string) {
  if (!line || !nextLine) {
    return false;
  }

  if (/^[\u2022\u25cf*-]\s+/.test(line) || /^\[.+\]$/.test(line)) {
    return false;
  }

  if (line.length > 90 || /[.!?]$/.test(line)) {
    return false;
  }

  return looksLikeBodyText(nextLine);
}

function cleanText(value: string) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function isPageMarker(line: string) {
  return /^--\s+\d+\s+of\s+\d+\s+--$/i.test(line);
}

function normalizeMarkerName(value: string) {
  return cleanText(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function normalizeHeading(value: string) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function maybeUploadImage(
  client: SanityClient,
  dryRun: boolean,
  imagePath: string | undefined,
  title: string
): Promise<SanityImageField | undefined> {
  if (!imagePath || !existsSync(imagePath) || dryRun) {
    return undefined;
  }

  const asset = (await client.assets.upload("image", createReadStream(imagePath), {
    filename: path.basename(imagePath),
    title,
  })) as { _id: string };

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt: title,
  };
}

async function findExistingServicePage(
  client: SanityClient,
  slug: string,
  title: string
) {
  return client.fetch<{ _id: string; status?: "draft" | "published" } | null>(
    '*[_type == "servicePage" && (slug.current == $slug || title == $title)][0]{_id,status}',
    { slug, title }
  );
}

function createSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f0pud1sz";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_API_READ_TOKEN;

  if (!token) {
    throw new Error(
      "Missing Sanity write token. Set SANITY_API_WRITE_TOKEN in .env.local before importing."
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01",
    token,
    useCdn: false,
  });
}

function createReadOnlySanityClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f0pud1sz",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01",
    useCdn: false,
  });
}

function findPdfFiles(directory: string) {
  const pdfFiles = readdirSync(directory)
    .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"))
    .map((fileName) => path.join(directory, fileName));

  if (pdfFiles.length === 0) {
    throw new Error(`No PDF files found in ${directory}`);
  }

  return pdfFiles.sort((left, right) =>
    left.localeCompare(right, undefined, { numeric: true })
  );
}

function parseCliOptions(args: string[]): CliOptions {
  const options: CliOptions = {
    dryRun: false,
    publish: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--publish") {
      options.publish = true;
      continue;
    }

    if (arg === "--pdf" && next) {
      options.pdfPath = next;
      index += 1;
      continue;
    }

    if (arg === "--slug" && next) {
      options.slug = next;
      index += 1;
    }
  }

  return options;
}

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) {
    return;
  }

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);

    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

function slugify(value: string) {
  return cleanText(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
