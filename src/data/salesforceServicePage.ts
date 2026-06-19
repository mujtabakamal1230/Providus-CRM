import type { ServicePage } from "@/sanity/lib/types";

export const SALESFORCE_CONSULTING_SERVICES_SLUG =
  "salesforce-consulting-services";

export const salesforceConsultingServicesFallback: ServicePage = {
  _id: "fallback-salesforce-consulting-services",
  title: "Salesforce Consulting Services",
  slug: { current: SALESFORCE_CONSULTING_SERVICES_SLUG },
  status: "published",
  seo: {
    metaTitle: "Salesforce Consulting Services | ProvidusCRM",
    metaDescription:
      "Certified Salesforce consulting services for CRM strategy, implementation, optimisation, adoption, and long-term platform growth.",
  },
  hero: {
    badgeTitle: "Certified",
    badgeSubtitle: "Salesforce Partner in the UK",
    heading: "Salesforce Consulting Services",
    description:
      "ProvidusCRM is a certified Salesforce consulting partner, helping organisations in the UK solve operational inefficiency, reduce costs, and integrate their CRM systems around real working processes.",
    bullets: [
      "Align Salesforce with business goals",
      "Improve platform adoption",
      "Build scalable CRM architecture",
      "Reduce operational friction",
    ],
    formTitle: "Fill a form today",
    formButtonLabel: "Let's Connect",
  },
  certified: {
    title:
      "Salesforce Consulting Services That Secure Your CRM Investments",
    description:
      "ProvidusCRM is a certified Salesforce consulting partner, helping organisations in the UK solve operational inefficiency, reduce costs, and integrate their CRM systems around real working processes.",
  },
  tabsSection: {
    title: "Our Salesforce Consulting Services",
    tabs: [
      {
        label: "Salesforce Enablement",
        heading: "Salesforce Enablement",
        text:
          "Salesforce works best when teams know why the platform exists and how it supports day-to-day decisions. We align Salesforce with business processes, reporting needs, and adoption habits so teams can use the system with confidence.",
        bullets: [
          "Role-based enablement sessions",
          "Adoption planning and launch support",
          "Internal champions and documentation",
        ],
      },
      {
        label: "Salesforce Audit",
        heading: "Salesforce Audit",
        text:
          "We review your current Salesforce setup, uncover workflow friction, identify configuration debt, and prioritise the changes that will make the biggest operational difference.",
        bullets: [
          "Configuration and automation review",
          "User access and data quality checks",
          "Actionable roadmap for improvement",
        ],
      },
      {
        label: "Implementation Roadmap",
        heading: "Implementation Roadmap",
        text:
          "A clear roadmap keeps delivery focused. We define phases, dependencies, risks, and success measures before build work starts so the project stays accountable.",
        bullets: [
          "Discovery workshops and process mapping",
          "Milestone-based project planning",
          "Risk, dependency, and rollout planning",
        ],
      },
      {
        label: "Technical & Architecture Design",
        heading: "Technical & Architecture Design",
        text:
          "Our consultants design scalable Salesforce architecture for data, automations, integrations, permissions, and reporting so your org can grow without becoming fragile.",
        bullets: [
          "Data model and security architecture",
          "Automation and integration design",
          "Governance standards for future change",
        ],
      },
      {
        label: "Operations & Data Governance",
        heading: "Operations & Data Governance",
        text:
          "Salesforce becomes more valuable when data is trusted. We design governance around ownership, validation, reporting, and lifecycle visibility.",
        bullets: [
          "Data ownership and quality rules",
          "Reporting and dashboard strategy",
          "Operational governance playbooks",
        ],
      },
      {
        label: "Integration Strategy",
        heading: "Integration Strategy",
        text:
          "We connect Salesforce with the systems that matter most: finance platforms, ERPs, websites, marketing tools, and custom operational databases.",
        bullets: [
          "Integration landscape assessment",
          "API and middleware recommendations",
          "Monitoring and error-handling approach",
        ],
      },
      {
        label: "Adoption Push",
        heading: "Adoption Push",
        text:
          "Adoption is designed, not wished into existence. We help teams understand the new process, reduce resistance, and embed Salesforce into everyday work.",
        bullets: [
          "Training aligned to user roles",
          "Launch communications and feedback loops",
          "Post-launch adoption improvement",
        ],
      },
    ],
  },
  benefitsSection: {
    title: "How Our Salesforce Consulting Services Help You",
    items: [
      {
        title: "Improve ROI",
        description:
          "If not deployed the right way, Salesforce can burn your CRM budget and become one of your largest business expenses. We ensure Salesforce delivers significant ROI for your business.",
        iconKey: "roi",
        colorTheme: "blue",
      },
      {
        title: "User Adoption",
        description:
          "The best-configured Salesforce org is useless if people refuse to use it. Adoption is a design problem before it is a training problem, and that is where our consultants start.",
        iconKey: "adoption",
        colorTheme: "green",
      },
      {
        title: "Platform Maturity",
        description:
          "Most Salesforce orgs grow by accident. Our consultants help organisations move past patches and workarounds into something stable enough to scale on.",
        iconKey: "maturity",
        colorTheme: "yellow",
      },
      {
        title: "Lifecycle Visibility",
        description:
          "When journeys live across six systems, leadership ends up guessing. We design reporting and dashboards that pull the whole picture into one place.",
        iconKey: "visibility",
        colorTheme: "peach",
      },
      {
        title: "360 Degree View",
        description:
          "A customer record scattered across five tools is not a customer record. We bring those fragments together so every team works from the same truth.",
        iconKey: "view360",
        colorTheme: "pink",
      },
      {
        title: "Long-Term Partnership",
        description:
          "Salesforce releases three times a year. Our consultants stay engaged after go-live because the platform that worked at launch still needs to fit the business next year.",
        iconKey: "partnership",
        colorTheme: "purple",
      },
    ],
  },
  expertiseSection: {
    title: "Our End-to-End Salesforce Platform Expertise",
  },
  industriesSection: {
    title: "How We Implement Salesforce Across Industries",
  },
  whyChooseSection: {
    title: "Why Choose ProvidusCRM As Your Salesforce Consulting Partner",
    reasons: [
      {
        title: "Operational Excellence",
        text:
          "We align Salesforce around real business operations, not generic templates, so the platform supports how teams actually work.",
        color: "#1D70C5",
      },
      {
        title: "Technical Depth",
        text:
          "Certified consultants bring architecture, configuration, automation, integration, and reporting expertise into one delivery process.",
        color: "#687DDA",
      },
      {
        title: "Business-First Approach",
        text:
          "Every recommendation is tied to commercial goals, user adoption, data quality, and long-term maintainability.",
        color: "#38A81B",
      },
    ],
  },
  consultantCta: {
    title:
      "Connect With Our Salesforce Consultants To Discuss Your CRM Needs And Business Goals.",
    buttonLabel: "Let's Connect",
    buttonHref: "/contact",
    backgroundColor: "#2898FF",
  },
  processSection: {
    title: "Our Salesforce\nDevelopment Process",
    steps: [
      {
        title: "Analysis",
        description:
          "We learn how your business runs and where your CRM falls short today. Every requirement gets written down and agreed before anything is built.",
        iconKey: "analysis",
        colorTheme: "green",
      },
      {
        title: "Design",
        description:
          "Next, our developers design the data model, automation, and technical approach. You review the plan and sign it off before the build starts.",
        iconKey: "design",
        colorTheme: "blue",
      },
      {
        title: "Strategy",
        description:
          "We sequence the work into phases with clear priorities. The highest-value features come first, so ROI starts landing sooner.",
        iconKey: "strategy",
        colorTheme: "green",
      },
      {
        title: "Development",
        description:
          "Our developers build your custom Salesforce org in sandboxes using version control and proper testing.",
        iconKey: "development",
        colorTheme: "blue",
      },
      {
        title: "Release",
        description:
          "We deploy through structured pipelines with regression testing at each stage. Releases reach production cleanly, without breaking what already works.",
        iconKey: "release",
        colorTheme: "green",
      },
      {
        title: "Support",
        description:
          "After release, our team offers ongoing support. We proactively monitor your org and handle enhancements as your needs evolve.",
        iconKey: "support",
        colorTheme: "blue",
      },
    ],
  },
};
