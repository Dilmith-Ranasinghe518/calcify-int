/**
 * Single source of truth for all site copy.
 * Mirrors DESIGN_SPEC.md Section 3 verbatim. Edit here, not in components.
 *
 * NOTE: several items below carry unverified claims (case-study figures,
 * a named testimonial, SOC 2 / ISO 27001 compliance). They are marked with
 * `needsVerification` and must be cleared before launch — see Section 10.
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

export const hero = {
  eyebrow: "Enterprise Digital Infrastructure · Since 2015",
  h1: "Engineering Tomorrow's Digital Infrastructure",
  subhead:
    "We build transformative digital solutions for the world's most ambitious enterprises. From ERP systems to AI-powered platforms, we turn complexity into competitive advantage — combining deep technical expertise with a relentless focus on business outcomes.",
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "Explore Services", href: "/#services" },
};

export const trustedBy = {
  label: "Trusted by industry leaders worldwide",
  /**
   * Third-party trademarks. Rendered as plain text wordmarks in a single
   * consistent style — NOT as reproduced logo graphics — since we do not
   * hold usage rights or official logo files for these marks.
   */
  marks: [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "SAP",
    "Oracle",
    "Salesforce",
    "IBM",
    "Deloitte",
  ],
};

export type Stat = {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
};

export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Client Satisfaction" },
  { value: 200, suffix: "+", label: "Expert Engineers" },
];

export type Service = { title: string; body: string; slug: string };

export const services: Service[] = [
  {
    slug: "erp",
    title: "ERP System Development",
    body: "End-to-end enterprise resource planning solutions tailored for complex business workflows. We streamline operations, finance, HR, and supply chain management with custom-built ERP platforms designed around how your organization actually works.",
  },
  {
    slug: "web",
    title: "Web Development",
    body: "High-performance web applications and enterprise portals built with cutting-edge technologies. From React ecosystems to full-stack Next.js solutions, we build for scale from day one.",
  },
  {
    slug: "ai",
    title: "AI Development",
    body: "Machine learning models, computer vision, natural language processing, and generative AI solutions that transform business intelligence. We help you harness AI to automate operations and unlock new sources of insight.",
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    body: "Native and cross-platform mobile applications for iOS and Android. From consumer-facing apps to enterprise mobility solutions, we build products trusted by millions of active users.",
  },
  {
    slug: "cloud",
    title: "Cloud Solutions",
    body: "Architecting and deploying scalable cloud infrastructure on AWS, Azure, and GCP. Our cloud migration, DevOps automation, and multi-cloud strategies are built for enterprise resilience.",
  },
  {
    slug: "security",
    title: "Cybersecurity",
    body: "Comprehensive security assessments, zero-trust architecture, SOC operations, and compliance frameworks that protect critical digital assets for Fortune 500 enterprises.",
  },
  {
    slug: "transformation",
    title: "Digital Transformation",
    body: "Strategic consulting and hands-on implementation of digital transformation roadmaps. We modernize legacy systems, automate workflows, and drive innovation at enterprise scale.",
  },
  {
    slug: "data",
    title: "Data Analytics",
    body: "Real-time analytics dashboards, data warehousing, ETL pipelines, and business intelligence platforms that turn raw data into decisions that drive revenue.",
  },
  {
    slug: "qa",
    title: "QA Services",
    body: "Comprehensive quality assurance and testing — automated testing, performance testing, security audits, and CI/CD quality gates that ensure flawless software delivery, every release.",
  },
];

export type CaseStudy = {
  title: string;
  category: string;
  body: string;
  metric: string;
  metricLabel: string;
  /** Figures and client identity not yet cleared for publication. */
  needsVerification: true;
};

export const work: CaseStudy[] = [
  {
    title: "Global Banking Platform",
    category: "ERP / FinTech",
    body: "End-to-end digital banking transformation for a leading financial institution, serving more than ten million customers across thirty countries. We modernized core banking systems while maintaining zero downtime during migration.",
    metric: "10M+",
    metricLabel: "Users",
    needsVerification: true,
  },
  {
    title: "AI-Powered Healthcare",
    category: "AI / HealthTech",
    body: "A machine learning diagnostic platform that reduced medical imaging analysis time by eighty-five percent for a global healthcare network, helping clinicians reach diagnoses faster without compromising accuracy.",
    metric: "85%",
    metricLabel: "Faster",
    needsVerification: true,
  },
  {
    title: "Smart City Infrastructure",
    category: "IoT / Cloud",
    body: "An IoT-enabled smart city platform managing more than fifty thousand connected sensors for traffic, energy, and waste management in real time, built on a resilient multi-cloud architecture.",
    metric: "50K+",
    metricLabel: "Sensors",
    needsVerification: true,
  },
  {
    title: "E-Commerce Ecosystem",
    category: "Web / Mobile",
    body: "An omnichannel retail platform processing more than five hundred million dollars in annual transactions with a 99.99% uptime guarantee, unifying web, mobile, and in-store experiences into a single system.",
    metric: "$500M+",
    metricLabel: "Revenue",
    needsVerification: true,
  },
];

export type Differentiator = {
  metric: string;
  title: string;
  body: string;
  needsVerification?: true;
};

export const whyUs: Differentiator[] = [
  {
    metric: "3×",
    title: "Rapid Delivery",
    body: "Agile methodology with two-week sprint cycles. We ship faster without sacrificing quality.",
  },
  {
    metric: "0",
    title: "Enterprise Security",
    body: "SOC 2 and ISO 27001 compliant. Zero-trust architecture and twenty-four-seven monitoring protect every engagement.",
    // Compliance claim — must match current, valid certifications before launch.
    needsVerification: true,
  },
  {
    metric: "50+",
    title: "Global Scale",
    body: "Multi-region deployments serving millions of users across more than fifty countries.",
  },
  {
    metric: "200+",
    title: "Dedicated Teams",
    body: "Two hundred-plus senior engineers with deep domain expertise across finance, health, retail, and beyond.",
  },
];

export const testimonial = {
  quote:
    "Calcify International transformed our legacy banking infrastructure into a modern, scalable platform. Their team's expertise in ERP systems and enterprise architecture is unmatched.",
  name: "James Richardson",
  role: "CTO, Global Finance Corp",
  /** Publishing a named quote requires documented consent. Not yet on file. */
  needsVerification: true as const,
};

export const cta = {
  h2: "Let's Build Something Extraordinary",
  body: "Ready to transform your business with cutting-edge technology? Let's discuss your next project and create solutions that drive real impact.",
  primary: { label: "Chat on WhatsApp", href: brand.whatsapp },
  // Placeholder until a real contact-form endpoint is wired — see Section 9.
  secondary: { label: "Send Us a Message", href: `mailto:${brand.email}` },
};

export const footer = {
  tagline:
    "Engineering tomorrow's digital infrastructure. We build transformative technology solutions for the world's most ambitious enterprises.",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Careers", href: "/contact" },
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
       * Case Studies points at the on-page #work section, which is real.
       * Blog, Documentation and Privacy Policy have NO destination yet —
       * they are intentionally omitted rather than shipped as 404s.
       * Restore them once the pages exist. See Section 10.
       */
      heading: "Resources",
      links: [{ label: "Case Studies", href: "/#work" }],
    },
  ],
  copyright: "© 2026 Calcify International. All rights reserved.",
};
