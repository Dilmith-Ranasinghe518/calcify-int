/**
 * Single source of truth for site copy. Edit here, not in components.
 *
 * Honesty rule: Calcify has no published clients yet, so nothing here claims
 * a track record — no client names, delivered-project counts, user numbers or
 * certifications. The figures in `facts` describe what we offer, and `work`
 * describes the kinds of platform we build, labelled as concepts. When real,
 * cleared case studies exist, they replace the concepts here.
 */

export type NavLink = { label: string; href: string };

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  cta: { label: "Start a Project", href: "/contact" },
};

export const brand = {
  name: "Calcify International",
  short: "Calcify",
  phone: "+94 70 160 0215",
  whatsapp: "https://wa.me/94701600215",
  email: "hello@calcifyint.com",
};

/** Offer facts, not track record — each one is true of every engagement. */
export type Fact = { value: string; label: string };

export const facts: Fact[] = [
  { value: "9", label: "Disciplines under one roof" },
  { value: "3", label: "Clouds: AWS · Azure · GCP" },
  { value: "14", label: "Days per sprint, demoed to you" },
  { value: "2", label: "Mobile platforms: iOS & Android" },
];

export type Service = {
  title: string;
  body: string;
  slug: string;
  path: `/services/${string}`;
  description: string;
  approach: string;
  capabilities: { title: string; body: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "erp",
    path: "/services/erp-development",
    title: "ERP System Development",
    body: "End-to-end enterprise resource planning tailored to complex business workflows. We streamline operations, finance, HR and supply chain with custom ERP platforms designed around how your organisation actually works.",
    description: "Plan and build a custom ERP system for finance, inventory, HR and operations, with workflows and integrations designed around your business.",
    approach: "We start by tracing a real transaction across departments, such as a purchase request through approval, receipt and reconciliation. That shows where data gets re-entered and where controls matter. From there we can scope the first module, decide which tools should stay and plan how to migrate and validate records before rollout.",
    capabilities: [
      { title: "Operations and inventory", body: "Connect purchasing, stock movements and order workflows so teams can trace what happened and who approved it." },
      { title: "Finance and approvals", body: "Design permissions, approval rules and reports around your accounting controls and handoffs." },
      { title: "Integration and migration", body: "Map existing records, connect systems that still serve the business and verify migrated data before cutover." },
    ],
    related: ["transformation", "data"],
  },
  {
    slug: "web",
    path: "/services/web-development",
    title: "Web Development",
    body: "High-performance web applications and enterprise portals built with modern technology. From React front ends to full-stack Next.js platforms, we build for scale from day one.",
    description: "Build a custom web application, customer portal or internal tool with Calcify International, using React and Next.js where they fit the project.",
    approach: "We map what each user needs to do, how they sign in and what data they should see. We can prototype the workflow early, then design the application around real permissions, backend integrations and expected traffic. Performance, keyboard access and error handling are part of the build.",
    capabilities: [
      { title: "Customer and partner portals", body: "Give users a place to complete requests, view account information and follow the progress of their work." },
      { title: "Internal web applications", body: "Bring approvals, reporting and daily tasks into a responsive application that connects to the right systems." },
      { title: "Full-stack development", body: "Design the interface, APIs and data model together so the application can be tested and maintained as it grows." },
    ],
    related: ["mobile", "qa"],
  },
  {
    slug: "ai",
    path: "/services/ai-development",
    title: "AI Development",
    body: "Machine learning, computer vision, natural language processing and generative AI that do real work inside your business — automating operations and surfacing new insight.",
    description: "Build AI solutions for document processing, internal knowledge search, computer vision and workflow automation with measurable evaluation criteria.",
    approach: "Start with one task and agree on what a good result looks like. We use representative examples to compare the model with the current workflow, document where it fails and decide when someone needs to review an output. The same evaluation criteria can be used to monitor the system after deployment.",
    capabilities: [
      { title: "Document and language workflows", body: "Classify incoming documents, extract key fields or build internal search that points users back to source material." },
      { title: "Computer vision and machine learning", body: "Evaluate image recognition, classification or prediction against examples that reflect real operating conditions." },
      { title: "Evaluation and integration", body: "Connect models to existing tools, define review steps and measure quality, latency and operating costs." },
    ],
    related: ["data", "cloud"],
  },
  {
    slug: "mobile",
    path: "/services/mobile-app-development",
    title: "Mobile App Development",
    body: "Native and cross-platform apps for iOS and Android. From consumer apps to enterprise mobility, designed to be fast, intuitive and used every day.",
    description: "Design and build iOS and Android apps for customers or internal teams, with native and cross-platform development options.",
    approach: "We identify the jobs people will do on a phone and the conditions they will do them in. Camera access, unreliable connectivity and notification permissions can change the architecture. Those requirements help us choose between native and cross-platform development and define what to test on real devices.",
    capabilities: [
      { title: "Customer-facing apps", body: "Design mobile experiences around account access, onboarding and the actions customers return to perform." },
      { title: "Field and operations apps", body: "Plan data capture and synchronisation around the devices and connectivity available to staff." },
      { title: "Backend and release preparation", body: "Connect app data to existing APIs and prepare device testing, release builds and store submissions." },
    ],
    related: ["web", "qa"],
  },
  {
    slug: "cloud",
    path: "/services/cloud-solutions",
    title: "Cloud Solutions",
    body: "Scalable cloud architecture on AWS, Azure and GCP. Cloud migration, DevOps automation and multi-cloud strategies built for resilience.",
    description: "Plan cloud architecture and migration on AWS, Azure or Google Cloud, with deployment automation, monitoring and recovery planning.",
    approach: "We assess what is running today, which services depend on one another and how much downtime each workload can tolerate. Then we can group migration steps, plan a rollback and establish monitoring before switching traffic. The platform choice follows the workload, team skills and cost constraints.",
    capabilities: [
      { title: "Cloud architecture and migration", body: "Plan environments, network boundaries and data migration around the workload's availability requirements." },
      { title: "DevOps and delivery automation", body: "Define repeatable builds and deployments, with infrastructure configuration your team can review and reproduce." },
      { title: "Reliability and cost visibility", body: "Set up monitoring, review resource use and plan backup and recovery checks for the services that matter most." },
    ],
    related: ["security", "transformation"],
  },
  {
    slug: "security",
    path: "/services/cybersecurity",
    title: "Cybersecurity",
    body: "Security assessments, zero-trust architecture, monitoring and compliance groundwork that protect critical systems and data.",
    description: "Assess security risks, plan stronger access controls and build monitoring into your applications and cloud infrastructure.",
    approach: "We map the systems that hold sensitive data and how people and services reach them. The assessment helps prioritise changes by the impact of an incident and the effort to make the fix. Scope, authorisation and the systems to be tested are agreed before technical work begins.",
    capabilities: [
      { title: "Security assessment", body: "Review application and infrastructure exposure and turn findings into a prioritised remediation plan." },
      { title: "Identity and access design", body: "Define roles, service identities and network boundaries with least-privilege and zero-trust principles." },
      { title: "Monitoring and readiness", body: "Identify the events to log and who should respond, with controls your team can document and verify." },
    ],
    related: ["cloud", "qa"],
  },
  {
    slug: "transformation",
    path: "/services/digital-transformation",
    title: "Digital Transformation",
    body: "Strategy and hands-on delivery of transformation roadmaps. We modernise legacy systems, automate workflows and make change stick.",
    description: "Create a practical digital transformation roadmap for legacy systems, manual processes and disconnected business workflows.",
    approach: "We follow a workflow with the people doing the work and identify where it stalls, needs rework or depends on one person. That lets us separate changes a team can make quickly from the parts that need new software. Each phase can have its own acceptance criteria, migration plan and owner.",
    capabilities: [
      { title: "Workflow and systems review", body: "Map current processes and identify where spreadsheets, legacy tools and manual handoffs are doing the same job." },
      { title: "Modernisation roadmap", body: "Prioritise work by business impact, dependencies and risk so each phase has a clear purpose." },
      { title: "Automation and phased rollout", body: "Pilot the redesigned workflow with its users, plan the switch and provide documentation for the people running it." },
    ],
    related: ["erp", "cloud"],
  },
  {
    slug: "data",
    path: "/services/data-analytics",
    title: "Data Analytics",
    body: "Real-time dashboards, data warehousing, ETL pipelines and business intelligence that turn raw data into decisions.",
    description: "Connect business data with reliable ETL pipelines, data warehouses, dashboards and reporting built around the decisions your teams make.",
    approach: "We start with a decision the team needs to make and the data required to make it. We agree on definitions for metrics and check how often the source data changes. That helps determine what needs live reporting and where scheduled refreshes are enough.",
    capabilities: [
      { title: "Data pipelines and warehousing", body: "Connect systems, validate incoming records and organise the data so teams can reuse it across reports." },
      { title: "Dashboards and business intelligence", body: "Design role-based reports with clear definitions and enough context to interpret changes." },
      { title: "Data quality and monitoring", body: "Check for missing or delayed records and give the people responsible for each source a way to trace errors." },
    ],
    related: ["erp", "ai"],
  },
  {
    slug: "qa",
    path: "/services/software-qa-testing",
    title: "Software QA and Testing Services",
    body: "Automated, performance and security testing with CI/CD quality gates, so every release ships with confidence.",
    description: "Test web, mobile and enterprise software with regression automation, performance checks and quality gates for your release pipeline.",
    approach: "We agree which journeys would cost the business most if they broke and test those first. Stable checks belong in the delivery pipeline, while new or changing features often need exploratory testing. The goal is a test suite the team can run and use to decide whether a release is ready.",
    capabilities: [
      { title: "Functional and regression testing", body: "Verify core workflows and failure states across the browsers, devices and roles your users depend on." },
      { title: "Automation and CI/CD", body: "Automate repeatable checks and report failures with enough detail to reproduce and fix them." },
      { title: "Performance and security checks", body: "Exercise agreed workloads and risk scenarios, then document results against agreed release criteria." },
    ],
    related: ["web", "mobile"],
  },
];

export type Concept = {
  title: string;
  category: string;
  body: string;
  stack: string[];
  /** Which code-drawn scene illustrates it (see ConceptVisual). */
  visual: "bank" | "scan" | "city" | "commerce";
};

/** Platforms we are set up to build — concepts, not client case studies. */
export const work: Concept[] = [
  {
    title: "Digital banking platform",
    category: "ERP / FinTech",
    body: "Accounts, payments, lending and reporting on one modern core — designed to migrate from legacy systems without downtime.",
    stack: ["Next.js", "Kotlin", "PostgreSQL"],
    visual: "bank",
  },
  {
    title: "AI diagnostics assistant",
    category: "AI / HealthTech",
    body: "Computer-vision models that pre-read medical images and route urgent cases first, with clinicians always in the loop.",
    stack: ["Python", "PyTorch", "FHIR"],
    visual: "scan",
  },
  {
    title: "Smart city operations",
    category: "IoT / Cloud",
    body: "Live sensor data for traffic, energy and waste on one control-room dashboard, running on resilient multi-cloud infrastructure.",
    stack: ["MQTT", "Kubernetes", "AWS"],
    visual: "city",
  },
  {
    title: "Omnichannel commerce",
    category: "Web / Mobile",
    body: "One system for web, mobile and in-store — catalogue, payments, inventory and fulfilment kept in sync in real time.",
    stack: ["Flutter", "Node.js", "Stripe"],
    visual: "commerce",
  },
];

export const footer = {
  tagline:
    "Engineering tomorrow's digital infrastructure — ERP, AI, cloud and mobile, designed and built by one senior team.",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "How we work", href: "/about#how" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "ERP Development", href: "/services#erp" },
        { label: "Web Development", href: "/services#web" },
        { label: "AI Development", href: "/services#ai" },
        { label: "Mobile Apps", href: "/services#mobile" },
        { label: "Cloud Solutions", href: "/services#cloud" },
        { label: "Cybersecurity", href: "/services#security" },
        { label: "QA Services", href: "/services#qa" },
      ],
    },
    {
      /**
       * Blog, Documentation and Privacy Policy have no destination yet —
       * they are omitted rather than shipped as 404s.
       */
      heading: "Explore",
      links: [
        { label: "What we build", href: "/#work" },
        { label: "How we build", href: "/#build" },
        { label: "Process", href: "/#process" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Calcify International. All rights reserved.`,
};
