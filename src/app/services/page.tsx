'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'ERP System Development',
    description: 'End-to-end enterprise resource planning solutions tailored for complex business workflows. We architect, build, and deploy custom ERP systems that unify your operations — from finance and HR to supply chain and manufacturing.',
    features: ['Custom Module Development', 'Legacy System Migration', 'Multi-Entity Management', 'Real-Time Analytics Dashboards'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Web Development',
    description: 'High-performance web applications and enterprise portals built with cutting-edge technologies. From React and Next.js frontends to microservice backends, we deliver web solutions that scale to millions of users.',
    features: ['Progressive Web Apps', 'Headless CMS Integration', 'API-First Architecture', 'Performance Optimization'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI Development',
    description: 'Machine learning models, computer vision, NLP, and generative AI solutions that transform how enterprises operate. From predictive analytics to intelligent automation, we harness AI to unlock unprecedented business value.',
    features: ['Custom ML Model Training', 'Natural Language Processing', 'Computer Vision Solutions', 'Generative AI Integration'],
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android that delight users and drive engagement. From consumer-facing apps to enterprise mobility solutions, we build mobile experiences used by millions.',
    features: ['React Native & Flutter', 'Native iOS & Android', 'Enterprise Mobility', 'Offline-First Architecture'],
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud Solutions',
    description: 'Architecting and deploying scalable cloud infrastructure on AWS, Azure, and Google Cloud. From cloud-native development to multi-cloud strategies, we engineer infrastructure that grows with your business.',
    features: ['Multi-Cloud Architecture', 'Kubernetes & Docker', 'CI/CD Pipeline Design', 'Cost Optimization'],
    gradient: 'from-sky-500/20 to-blue-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions from threat detection to zero-trust architecture. We protect critical digital assets with SOC operations, penetration testing, compliance frameworks, and 24/7 monitoring.',
    features: ['Zero-Trust Architecture', 'SOC Operations', 'Penetration Testing', 'Compliance (SOC 2, ISO 27001)'],
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Digital Transformation',
    description: 'Strategic consulting and implementation of digital transformation roadmaps. We modernize legacy systems, automate workflows, and build the digital foundation for your organization\'s next chapter.',
    features: ['Legacy Modernization', 'Process Automation', 'Change Management', 'Digital Strategy Consulting'],
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data Analytics',
    description: 'Real-time analytics platforms, data warehousing, ETL pipelines, and business intelligence dashboards. Transform raw data into actionable insights that drive strategic decisions and revenue growth.',
    features: ['Real-Time Dashboards', 'Data Warehousing', 'Predictive Analytics', 'ETL Pipeline Design'],
    gradient: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'QA Services',
    description: 'Comprehensive quality assurance and software testing services that guarantee flawless releases. From automated test suites to manual exploratory testing, we ensure every product meets the highest standards of quality, performance, and security before it reaches your users.',
    features: ['Automated Test Suites', 'Performance & Load Testing', 'Security Auditing', 'CI/CD Quality Gates'],
    gradient: 'from-lime-500/20 to-emerald-500/20',
  },
];

export default function ServicesPage() {
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const processRef = useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source
              src="https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/90 via-[var(--bg-deep)]/70 to-[var(--bg-deep)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="section-label justify-center reveal">Our Services</span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 reveal delay-100">
            Enterprise Solutions<br />
            <span className="gradient-text">Built to Scale</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto reveal delay-200">
            From ERP systems to AI-powered platforms, we deliver end-to-end technology 
            solutions for the world&apos;s most demanding enterprises.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative" ref={gridRef}>
        <div className="absolute inset-0 bg-dots opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {services.map((service, i) => (
              <div key={service.title} className={`reveal delay-${Math.min((i + 1) * 100, 300)}`}>
                <div className={`group glass rounded-2xl overflow-hidden card-hover`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Left - Icon & Title */}
                    <div className={`relative p-8 md:p-10 bg-gradient-to-br ${service.gradient}`}>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                      >
                        Get Started
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Right - Description & Features */}
                    <div className="lg:col-span-2 p-8 md:p-10">
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 relative" ref={processRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label justify-center reveal">Our Process</span>
            <h2 className="section-title reveal delay-100">
              How We <span className="gradient-text">Deliver Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', description: 'Deep dive into your business requirements, technical landscape, and strategic goals.' },
              { step: '02', title: 'Architecture', description: 'Design scalable, secure system architecture with detailed technical specifications.' },
              { step: '03', title: 'Development', description: 'Agile sprint-based development with continuous integration and quality assurance.' },
              { step: '04', title: 'Deployment', description: 'Production deployment with monitoring, maintenance, and ongoing optimization.' },
            ].map((item, i) => (
              <div key={item.step} className={`reveal delay-${(i + 1) * 100}`}>
                <div className="group glass rounded-2xl p-7 text-center card-hover h-full">
                  <div className="text-5xl font-extrabold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build <span className="gradient-text">Your Solution</span>?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Let&apos;s discuss your project and create technology that drives real business impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg py-4 px-8">
              Start a Project
            </Link>
            <a
              href="https://wa.me/94717170333"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg py-4 px-8"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
