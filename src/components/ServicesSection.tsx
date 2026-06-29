'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'ERP System Development',
    description: 'End-to-end enterprise resource planning solutions tailored for complex business workflows. Streamline operations, finance, HR, and supply chain with custom-built ERP platforms.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Web Development',
    description: 'High-performance web applications and enterprise portals built with cutting-edge technologies. From React ecosystems to full-stack Next.js solutions at global scale.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI Development',
    description: 'Machine learning models, computer vision, NLP, and generative AI solutions that transform business intelligence. Harness the power of AI to automate and innovate.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. From consumer-facing apps to enterprise mobility solutions with millions of active users.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud Solutions',
    description: 'Architecting and deploying scalable cloud infrastructure on AWS, Azure, and GCP. Cloud migration, DevOps automation, and multi-cloud strategies for enterprise resilience.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Cybersecurity',
    description: 'Comprehensive security assessments, zero-trust architecture, SOC operations, and compliance frameworks. Protecting critical digital assets for Fortune 500 enterprises.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Digital Transformation',
    description: 'Strategic consulting and implementation of digital transformation roadmaps. Modernize legacy systems, automate workflows, and drive innovation at enterprise scale.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data Analytics',
    description: 'Real-time analytics dashboards, data warehousing, ETL pipelines, and business intelligence platforms. Turn raw data into actionable insights that drive revenue.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'QA Services',
    description: 'Comprehensive quality assurance and testing services — automated testing, performance testing, security audits, and CI/CD quality gates ensuring flawless software delivery.',
  },
];

export default function ServicesSection() {
  const sectionRef = useScrollReveal();

  return (
    <section id="services-section" className="relative py-24 md:py-32 bg-dots" ref={sectionRef}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="section-label justify-center">What We Do</span>
          </div>
          <h2 className="section-title reveal delay-100">
            Enterprise Solutions That<br />
            <span className="gradient-text">Drive Results</span>
          </h2>
          <p className="section-subtitle mx-auto reveal delay-200">
            From concept to deployment, we deliver end-to-end technology solutions 
            that transform how the world&apos;s leading companies operate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal delay-${(i % 4) * 100 + 100}`}
            >
              <div className="group relative glass rounded-2xl p-7 h-full card-hover overflow-hidden">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-accent-purple)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-[var(--color-accent-purple)]/5 transition-all duration-500 rounded-2xl" />
                
                {/* Icon */}
                <div className="relative mb-5 w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 group-hover:scale-110 transition-all duration-500">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-lg font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="relative text-sm text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="relative mt-5 flex items-center gap-2 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-sm font-semibold">Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--color-primary)]/5 to-transparent rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
