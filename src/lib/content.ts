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
  phone: "+94 71 717 0333",
  whatsapp: "https://wa.me/94717170333",
  email: "support.calcifylabs@gmail.com",
};

/** Offer facts, not track record — each one is true of every engagement. */
export type Fact = { value: string; label: string };

export const facts: Fact[] = [
  { value: "9", label: "Disciplines under one roof" },
  { value: "3", label: "Clouds: AWS · Azure · GCP" },
  { value: "14", label: "Days per sprint, demoed to you" },
  { value: "2", label: "Mobile platforms: iOS & Android" },
];

export type Service = { title: string; body: string; slug: string };

export const services: Service[] = [
  {
    slug: "erp",
    title: "ERP System Development",
    body: "End-to-end enterprise resource planning tailored to complex business workflows. We streamline operations, finance, HR and supply chain with custom ERP platforms designed around how your organisation actually works.",
  },
  {
    slug: "web",
    title: "Web Development",
    body: "High-performance web applications and enterprise portals built with modern technology. From React front ends to full-stack Next.js platforms, we build for scale from day one.",
  },
  {
    slug: "ai",
    title: "AI Development",
    body: "Machine learning, computer vision, natural language processing and generative AI that do real work inside your business — automating operations and surfacing new insight.",
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    body: "Native and cross-platform apps for iOS and Android. From consumer apps to enterprise mobility, designed to be fast, intuitive and used every day.",
  },
  {
    slug: "cloud",
    title: "Cloud Solutions",
    body: "Scalable cloud architecture on AWS, Azure and GCP. Cloud migration, DevOps automation and multi-cloud strategies built for resilience.",
  },
  {
    slug: "security",
    title: "Cybersecurity",
    body: "Security assessments, zero-trust architecture, monitoring and compliance groundwork that protect critical systems and data.",
  },
  {
    slug: "transformation",
    title: "Digital Transformation",
    body: "Strategy and hands-on delivery of transformation roadmaps. We modernise legacy systems, automate workflows and make change stick.",
  },
  {
    slug: "data",
    title: "Data Analytics",
    body: "Real-time dashboards, data warehousing, ETL pipelines and business intelligence that turn raw data into decisions.",
  },
  {
    slug: "qa",
    title: "QA Services",
    body: "Automated, performance and security testing with CI/CD quality gates, so every release ships with confidence.",
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
