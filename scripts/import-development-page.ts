import { createClient } from '@sanity/client';

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing Sanity write token. Set SANITY_API_WRITE_TOKEN before importing.');
}

const client = createClient({
  projectId: 'f0pud1sz', // from .env
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-03-01',
  token,
});

const developmentPage = {
  _type: 'servicePage',
  _id: 'GRtmxBnPT0vg9u3idkmQIe', // Overwrite the existing document to avoid duplicates
  title: 'Salesforce Development Services',
  slug: { _type: 'slug', current: 'salesforce-development' },
  status: 'draft',
  sectionOrder: [
    'certified',
    'caseStudies',
    'tabs',
    'consultantCta',
    'benefits',
    'process',
    'expertise',
    'industries',
    'whyChoose',
    'cta'
  ],
  hero: {
    badgeTitle: 'Certified',
    badgeSubtitle: 'Salesforce Partner in the UK',
    heading: 'Salesforce Development Services',
    description: 'Generic Salesforce orgs only work for basic tasks. Your business needs a CRM solution that aligns with your processes, business objectives, and growth goals. At Providus, we provide custom Salesforce development services, building the code, integrations, and apps that turn a basic CRM org into the system your business can run and rely on.',
    bullets: [
      'Certified Salesforce developers with real production and agile delivery experience',
      'Clean, documented, well-tested Apex and Lightning code',
      'Integrations built to handle real data volumes',
      'AI-enabled builds using Agentforce and Einstein'
    ],
    formTitle: 'Fill a form today',
    formButtonLabel: "Let's Connect"
  },
  certified: {
    title: 'Salesforce Development That Positions Your CRM For Better Growth and ROI',
    description: 'Your Salesforce org is only as good as what you build on top of it. Our Salesforce developers extend the overall capability and value of your CRM system with custom objects, automation, and integrations that match how your teams actually work. You get a CRM that works around your processes, not the other way around.'
  },
  tabsSection: {
    title: 'Our Salesforce Development Services',
    tabs: [
      {
        label: 'Salesforce Audit & Health Check',
        heading: 'Salesforce Audit & Health Check',
        text: 'Your legacy CRM might no longer make sense for your business objectives and growth initiatives. A field nobody fills in. A flow that fires twice. A trigger that slows every save. Before our Salesforce developers build anything new, they analyse what already exists.\n\nA health check covers the code, the automation, the security model, and the data itself. You get a plain report that ranks each issue by how much it costs you, so the expensive problems get fixed first.\n\nYou start any development work from a clear picture rather than a guess.',
        bullets: [
          'Review of Apex code, triggers, flows, and validation rules',
          'Governor limit checks and performance bottleneck analysis',
          'Security, sharing model, and technical debt assessment',
          'Prioritised fix list with effort and risk ratings'
        ]
      },
      {
        label: 'Custom Salesforce Development',
        heading: 'Custom Salesforce Development',
        text: 'Basic Salesforce orgs handle common cases well. The part of your business that usually involves handling complex processes and driving growth needs custom Salesforce development. This is where our developers come in.\n\nWe build Apex classes, triggers, and Lightning Web Components that do exactly what your processes need. Every build respects limitations, carries proper test coverage, and ships with documentation. The next developer who opens the code understands it straight away.\n\nCustom Salesforce development that’s done right feels subtle and intuitive to the user and understandable for the next engineer. That balance is what keeps an org healthy as it grows.',
        bullets: [
          'Custom Apex triggers, batch jobs, and scheduled classes',
          'Lightning Web Components for internal and customer-facing screens',
          'Bulkified code that respects Salesforce governor limits',
          'Full test coverage and clear technical documentation'
        ]
      },
      {
        label: 'AppExchange App Development',
        heading: 'AppExchange App Development',
        text: 'Building an app to launch on the AppExchange is a completely different ballgame. The app has to pass Salesforce security review, install cleanly across thousands of environments, and survive three platform releases a year.\n\nOur Salesforce developers build managed packages from ideation through to a live listing. We handle the security review, the multi-tenant design, and the upgrade paths that drive customer retention.\n\nSo whether you are an ISV partner with a product idea or a business turning internal tooling into revenue, the app reaches the marketplace ready to install and ready to scale.',
        bullets: [
          'Managed and unmanaged package development',
          'Salesforce security review preparation and fixes',
          'Multi-tenant design that works across customer orgs',
          'Version control, upgrade paths, and release management'
        ]
      },
      {
        label: 'Salesforce Package Development',
        heading: 'Salesforce Package Development',
        text: 'If you need a custom package for internal use instead of an app to list on AppExchange, our Salesforce package development service aligns perfectly with your needs. You want a reusable set of components your teams can install across several orgs or business units without rebuilding each time.\n\nOur developers bundle objects, code, and configuration into clean packages that deploy the same way every time. Proper versioning means each release moves forward instead of overwriting what came before.\n\nA change made once reaches every org that needs it, and a mistake never quietly breaks three environments at once. This matters most for groups running multiple orgs or rolling the same solution out across regions.',
        bullets: [
          'First and second-generation package development',
          'Dependency management and modular component design',
          'Clean install, upgrade, and rollback paths',
          'Source-driven development with full version control'
        ]
      },
      {
        label: 'Salesforce Implementation',
        heading: 'Salesforce Implementation',
        text: 'How your Salesforce org gets developed shapes everything that follows. Get the foundation right and the org runs smoothly and supports your processes for a long period. Get it wrong, and you’ll find yourself figuring out what’s wrong with your CRM for months.\n\nOur Salesforce developers handle the full implementation, from the object model and automation through to data loading and go-live support. We build for the business you are now and the one you expect to become.\n\nWe have a simple goal. Your teams trust the system on day one, and the org still holds up when the business looks different two years later.',
        bullets: [
          'Object model, automation, and security setup from scratch',
          'Multi-cloud builds across Sales, Service, and Experience Cloud',
          'Data loading with validation and reconciliation',
          'Post-launch stabilisation and developer support'
        ]
      },
      {
        label: 'Salesforce Customisation',
        heading: 'Salesforce Customisation',
        text: 'You deserve a CRM that fits your processes, not the other way around. Our team handles Salesforce customisation and configuration, driving excessive value from your CRM investments.\n\nWe follow Salesforce customisation best practices and tailor your org to ensure it supports your processes, initiatives and growth.',
        bullets: [
          'Custom objects, fields, page layouts, and record types',
          'Flow automation for approvals, alerts, and record updates',
          'Permission sets, role hierarchies, and sharing rules',
          'Lightning page and component customisation'
        ]
      },
      {
        label: 'Salesforce Integration',
        heading: 'Salesforce Integration',
        text: 'Your CRM needs to sync effortlessly with your platforms, apps, and tools, including ERP, accounting system, project management tools, and other critical systems your business processes depend on.\n\nOur developers build integrations that handle real production traffic and recover cleanly when something upstream fails. We plan for the edge cases most teams forget: the timeout, the duplicate, the record that arrives half-formed.\n\nData moves between systems reliably, and the integration stays readable for whoever maintains it next. No brittle point-to-point links that break the first time a third party changes an endpoint.',
        bullets: [
          'REST and SOAP API integration development',
          'MuleSoft and middleware-based connections',
          'Real-time and batch data synchronisation',
          'Error handling, retry logic, and integration monitoring'
        ]
      },
      {
        label: 'Salesforce Migration',
        heading: 'Salesforce Migration',
        text: 'Moving from a different CRM platform to Salesforce or just migrating from your legacy CRM org can disrupt your business, if not done the right way. This is where data quietly goes wrong if nobody is careful. A mismatched field here, a dropped record there, and trust in the new system erodes before launch.\n\nOur team runs end-to-end migration: mapping fields, cleaning records, loading data, and checking that what arrived matches what left. We test the load before the real cutover, so surprises happen in a sandbox rather than in production.\n\nEvery record is accounted for, and the automation around it gets rebuilt to suit how your business functions today.',
        bullets: [
          'Migration from legacy CRMs, spreadsheets, or older Salesforce orgs',
          'Field mapping, deduplication, and data cleansing',
          'Test-load and reconciliation before final cutover',
          'Workflow and automation rebuild on the target org'
        ]
      },
      {
        label: 'Mobile App Development',
        heading: 'Salesforce Mobile App Development',
        text: 'Field teams and frontline staff often require a portable Salesforce solution. A delivery driver, a site surveyor, a nurse on a ward. None of them want to log in on a laptop.\n\nOur developers build mobile experiences using the Salesforce mobile app, Mobile Publisher, and responsive Lightning components. Where connectivity is unreliable, we add offline support so work continues and syncs later.\n\nPeople working away from the office capture data once, in the moment, instead of writing it down and entering it twice when they get back.',
        bullets: [
          'Salesforce mobile app configuration and custom components',
          'Mobile Publisher builds for Experience Cloud',
          'Responsive Lightning components for phone and tablet',
          'Offline data capture and sync for field teams'
        ]
      }
    ]
  },
  consultantCta: {
    title: 'Reach out to our Salesforce developers to discuss your CRM needs and business goals.\n\nWe help you build a scalable, custom CRM org on Salesforce that maximizes ROI and simplifies adoption for your teams.',
    buttonLabel: "Let's connect"
  },
  benefitsSection: {
    title: 'How Our Salesforce Consulting Services Help You',
    items: [
      {
        title: 'Improve ROI',
        description: 'If not deployed the right way, Salesforce can burn your CRM budget and become one of your largest business expenses. We ensure Salesforce delivers significant ROI for your business.',
        iconKey: 'roi',
        colorTheme: 'blue'
      },
      {
        title: 'User Adoption',
        description: 'The best-configured Salesforce org is useless if people refuse to use it. Adoption is a design problem before it is a training problem, and that is where our consultants start.',
        iconKey: 'adoption',
        colorTheme: 'green'
      },
      {
        title: 'Platform Maturity',
        description: 'Most Salesforce orgs grow by accident. Our consultants help organisations move past patches and workarounds into something stable enough to scale on.',
        iconKey: 'maturity',
        colorTheme: 'blue'
      }
    ]
  },
  processSection: {
    title: 'Our Salesforce Development Process',
    steps: [
      {
        title: 'Analysis',
        description: 'We learn how your business runs and where your CRM falls short today. Every requirement gets written down and agreed before anything is built.',
        colorTheme: 'blue'
      },
      {
        title: 'Design',
        description: 'Next, our developers design the data model, automation, and technical approach. You review the plan and sign it off before the build starts.',
        colorTheme: 'green'
      },
      {
        title: 'Strategy',
        description: 'We sequence the work into phases with clear priorities. The highest-value features come first, so ROI starts landing sooner.',
        colorTheme: 'blue'
      },
      {
        title: 'Development',
        description: 'Our developers build your custom Salesforce org in sandboxes using version control and proper testing.',
        colorTheme: 'green'
      },
      {
        title: 'Release',
        description: 'We deploy through structured pipelines with regression testing at each stage. Releases reach production cleanly, without breaking what already works',
        colorTheme: 'blue'
      },
      {
        title: 'Support',
        description: 'After release, our team offers ongoing support. We monitor your org, fix issues quickly, and adjust it as your business evolves.',
        colorTheme: 'green'
      }
    ]
  },
  expertiseSection: {
    title: 'We Offer Development Services Across The Salesforce Platform',
    items: [
      {
        title: 'Sales Cloud',
        text: 'Sales teams lose deals when data is messy and the pipeline is hard to read. Our Sales Cloud developers build the custom objects, automation, and reporting that give reps a clean pipeline and managers an honest forecast. Lead routing fires on the right rules, opportunities update without manual effort, and dashboards show what is really happening.',
        accentColor: '#1D70C5'
      },
      {
        title: 'Service Cloud',
        text: 'Slow, repetitive support damages trust fast. Our Service Cloud developers build the case routing, escalation logic, and console layouts that get each ticket to the right agent quickly. Knowledge integration puts answers within reach, and agents see full customer history before they respond. Resolution times drop and customers stop repeating their concerns.',
        accentColor: '#F4AC3B'
      },
      {
        title: 'Marketing Cloud',
        text: 'Running marketing campaigns is the easy part. Knowing which one drove revenue is the hard part. Our Marketing Cloud developers build the data extensions, journey logic, and tracking that tie every send back to real CRM data. Audiences segment on accurate information, and reporting shows what actually converted.',
        accentColor: '#38A81B'
      },
      {
        title: 'Experience Cloud',
        text: 'Our Experience Cloud developers build branded portals and communities wired straight into Salesforce data. Access controls keep each user seeing only what they should. So self-service actually reduces support load instead of creating a second channel of complaints, and partners get what they need without involving your team.',
        accentColor: '#0D9DDA'
      },
      {
        title: 'Revenue Cloud',
        text: 'Manual quoting leads to pricing errors, and pricing errors cost money on every deal. Our Revenue Cloud developers configure CPQ rules, product bundles, and approval flows that keep quotes fast and accurate. Discounts follow a clear path, and billing logic stays clean from quote to cash.',
        accentColor: '#8A8FD2'
      },
      {
        title: 'Data Cloud',
        text: 'When customer data sits across different disconnected systems, no team sees the full picture. Our developers connect web activity, transactions, and third-party sources into one profile inside Salesforce. That single record then feeds every other cloud. Segmentation gets sharper, reporting gets more reliable, and Agentforce works from one accurate source of truth.',
        accentColor: '#F45A3E'
      },
      {
        title: 'Agentforce',
        text: 'Agentforce, Salesforce’s very own agentic AI layer, drives intelligent automation across your CRM org. Our developers build and configure autonomous agents that qualify leads, route cases, and complete tasks inside your Salesforce workflows. Every agent runs on your business rules and your data.',
        accentColor: '#38A81B'
      }
    ]
  },
  industriesSection: {
    title: 'Industries We Serve',
    items: [
      {
        title: 'Nonprofit Cloud',
        description: 'Charities run on relationships, not transactions, and most CRMs were never built for that. Our developers build on Nonprofit Cloud to handle donor records, gift processing, grant tracking, and programme outcomes in one place. Recurring giving and Gift Aid run without manual follow ups, and reporting gives funders and trustees the numbers they ask for.'
      },
      {
        title: 'Education Cloud',
        description: 'One person moves from prospect to applicant to student to alumnus, often across separate systems that never talk. Our developers build on Education Cloud to connect recruitment, admissions, student success, and alumni engagement in one place. Records follow the student through every stage, so advisers and fundraisers work from the same history.'
      },
      {
        title: 'Health Cloud',
        description: 'Patient data is sensitive and care coordination is genuinely complex. Our developers build on Health Cloud to give providers one view of each patient across referrals, appointments, and care plans. Consent tracking and access rules sit inside every workflow, so the right people see the right records and no one else.'
      },
      {
        title: 'Commerce Cloud',
        description: 'Online retail gets complicated as catalogues, pricing rules, and channels multiply. Our developers build Commerce Cloud storefronts wired straight into CRM, order management, and marketing data. Stock levels, pricing logic, and checkout flows all run from one place.'
      },
      {
        title: 'Manufacturing Cloud',
        description: 'Manufacturers plan against sales agreements and production capacity at the same time, and the two rarely sit in one system. Our developers build on Manufacturing Cloud to connect commercial forecasts with operations data and account-based agreements. Run-rate business and new demand appear in the same view.'
      },
      {
        title: 'Financial Services Cloud',
        description: 'Banks, lenders, and wealth firms need a CRM that understands households and financial accounts, not just contacts and opportunities. Our developers build on Financial Services Cloud to handle client relationships, KYC workflows, and adviser dashboards. Compliance steps sit inside the process rather than alongside it.'
      }
    ]
  },
  whyChooseSection: {
    title: 'What Makes ProvidusCRM a Leading Salesforce Development Company',
    reasons: [
      {
        title: 'Certified, Experienced Salesforce Developers',
        text: 'Certifications prove knowledge. Experience proves judgement. You want both. Our developers hold credentials across the Salesforce platform and have shipped real code in real production orgs. That mix means fewer false starts, less rework, and builds that hold up long after go-live.',
        color: '#1D70C5'
      },
      {
        title: 'Agile Delivery & Outcome-First Approach',
        text: 'Our developers work in short, focused cycles tied to outcomes you agree at the start. You see working deliverables every sprint and can reorder priorities as you learn. The highest-value features ship first, so your Salesforce investments start generating returns first.',
        color: '#38A81B'
      },
      {
        title: 'AI-Enabled Salesforce Orgs',
        text: 'Our developers prepare your org for Agentforce and Einstein by sorting the data foundation first, then building agents that follow your business logic. Intelligent automation drives operational efficiency while keeping you in full control of your processes, outcomes, and data.',
        color: '#1D70C5'
      },
      {
        title: 'Innovative, Workable Solutions',
        text: 'Our developers balance innovative ideas with solutions that actually hold up in production and real-life use cases. We build Salesforce orgs that solve your toughest CRM challenges, grow your operations, and can be maintained and scaled without any rebuild.',
        color: '#38A81B'
      }
    ]
  },
  cta: {
    title: 'Connect With Our Salesforce Development Team Today!',
    buttonLabel: "Let's Talk"
  }
};

async function run() {
  try {
    const result = await client.createOrReplace(developmentPage);
    console.log('Successfully updated development page! Document ID:', result._id);
  } catch (error) {
    console.error('Error importing page:', error);
  }
}

run();
