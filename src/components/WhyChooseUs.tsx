'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const differentiators = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Rapid Delivery',
    description: 'Agile methodology with 2-week sprint cycles. Ship faster without sacrificing quality.',
    metric: '3x',
    metricLabel: 'Faster',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Enterprise Security',
    description: 'SOC 2, ISO 27001 compliant. Zero-trust architecture and 24/7 monitoring.',
    metric: '0',
    metricLabel: 'Breaches',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Global Scale',
    description: 'Multi-region deployments serving millions of users across 50+ countries.',
    metric: '50+',
    metricLabel: 'Countries',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Dedicated Teams',
    description: '200+ senior engineers with domain expertise in finance, health, retail, and more.',
    metric: '200+',
    metricLabel: 'Engineers',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useScrollReveal();

  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <div className="reveal-left">
            <div className="relative">
              {/* Video container */}
              <div className="relative rounded-2xl overflow-hidden glass">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-cover opacity-80"
                >
                  <source
                    src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent" />
              </div>

              {/* Floating metric card */}
              <div className="absolute -bottom-6 -right-6 glass rounded-xl p-5 glow-blue">
                <div className="text-3xl font-extrabold gradient-text">99.9%</div>
                <div className="text-sm text-[var(--text-muted)]">System Uptime</div>
              </div>

              {/* Accent decoration */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[var(--color-primary)]/20 rounded-2xl" />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="section-label reveal">Why Calcify International</span>
            <h2 className="section-title reveal delay-100">
              Built for<br />
              <span className="gradient-text">Enterprise Scale</span>
            </h2>
            <p className="section-subtitle mb-10 reveal delay-200">
              We don&apos;t just build software — we engineer competitive advantages. 
              Our battle-tested processes and world-class team ensure every project 
              exceeds expectations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((item, i) => (
                <div key={item.title} className={`reveal delay-${(i + 1) * 100}`}>
                  <div className="group flex gap-4 p-4 rounded-xl hover:glass transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] flex-shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl font-extrabold text-[var(--color-primary)]">{item.metric}</span>
                        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{item.metricLabel}</span>
                      </div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
