'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import Link from 'next/link';

const milestones = [
  { year: '2015', title: 'Founded', description: 'Calcify International established with a vision to revolutionize enterprise technology.' },
  { year: '2017', title: 'First Fortune 500 Client', description: 'Secured our first major enterprise contract, delivering a custom ERP solution.' },
  { year: '2019', title: 'Global Expansion', description: 'Expanded operations to 20+ countries with dedicated engineering teams worldwide.' },
  { year: '2021', title: 'AI Division Launch', description: 'Launched dedicated AI & Machine Learning division, pioneering intelligent enterprise solutions.' },
  { year: '2023', title: '500+ Projects Milestone', description: 'Surpassed 500 successfully delivered projects for clients across 50+ countries.' },
  { year: '2025', title: 'Industry Leadership', description: 'Recognized as a leading enterprise technology solutions provider globally.' },
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Innovation First',
    description: 'We push boundaries with cutting-edge technology, always staying ahead of industry trends.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Uncompromising Quality',
    description: 'Every line of code, every design decision reflects our commitment to excellence.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Client Partnership',
    description: 'We don\'t just build software — we become an extension of your team and share your vision.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Global Impact',
    description: 'Our solutions impact millions of users across 50+ countries, driving real-world change.',
  },
];

const leadership = [
  { name: 'CEO & Founder', role: 'Strategic Vision & Leadership', initials: 'CF' },
  { name: 'CTO', role: 'Technology & Architecture', initials: 'CT' },
  { name: 'VP Engineering', role: 'Engineering Excellence', initials: 'VP' },
  { name: 'Head of AI', role: 'AI & Machine Learning', initials: 'AI' },
];

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="text-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="text-4xl md:text-5xl font-extrabold gradient-text">{count}{suffix}</div>
      <p className="text-sm text-[var(--text-muted)] mt-1">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useScrollReveal();
  const valuesRef = useScrollReveal();
  const timelineRef = useScrollReveal();
  const teamRef = useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label reveal">About Calcify International</span>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 reveal delay-100">
                We Engineer the<br />
                <span className="gradient-text">Future of Enterprise</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 reveal delay-200">
                Founded in 2015, Calcify International has grown from a passionate team 
                of engineers into a global enterprise technology powerhouse. We partner 
                with the world&apos;s leading brands to build solutions that redefine 
                industries and empower millions.
              </p>
              <div className="flex items-center gap-4 reveal delay-300">
                <Link href="/contact" className="btn-primary">
                  Work With Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-outline">
                  Our Services
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="reveal-right delay-200">
              <div className="glass rounded-2xl p-10 grid grid-cols-2 gap-8">
                <StatBlock value={500} suffix="+" label="Projects Delivered" />
                <StatBlock value={50} suffix="+" label="Countries" />
                <StatBlock value={200} suffix="+" label="Engineers" />
                <StatBlock value={10} suffix="+" label="Years Experience" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-10 card-hover">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To be the global standard in enterprise technology — the partner every 
                ambitious company turns to when they need solutions that truly transform 
                their business and create lasting value.
              </p>
            </div>
            <div className="glass rounded-2xl p-10 card-hover">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-purple)]/10 flex items-center justify-center text-[var(--color-accent-purple)] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To engineer tomorrow&apos;s digital infrastructure by combining deep technical 
                expertise with relentless innovation. We empower enterprises to operate 
                faster, smarter, and more securely in an ever-evolving digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 relative" ref={valuesRef}>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label justify-center reveal">Our Core Values</span>
            <h2 className="section-title reveal delay-100">
              Principles That<br />
              <span className="gradient-text">Drive Everything</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={value.title} className={`reveal delay-${(i + 1) * 100}`}>
                <div className="group glass rounded-2xl p-7 h-full card-hover text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mx-auto mb-5 group-hover:bg-[var(--color-primary)]/20 group-hover:scale-110 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden" ref={timelineRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)]" />
        <div className="absolute inset-0 bg-dots" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label justify-center reveal">Our Journey</span>
            <h2 className="section-title reveal delay-100">
              A Decade of<br />
              <span className="gradient-text">Innovation</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)]/50 via-[var(--color-primary)]/20 to-transparent hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={milestone.year}
                  className={`reveal delay-${Math.min((i + 1) * 100, 500)} flex flex-col md:flex-row items-center gap-6 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass rounded-xl p-6 card-hover">
                      <span className="text-sm font-bold text-[var(--color-primary)]">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--bg-deep)] flex-shrink-0 hidden md:block" />
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 relative" id="team" ref={teamRef}>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label justify-center reveal">Leadership</span>
            <h2 className="section-title reveal delay-100">
              Meet Our <span className="gradient-text">Leaders</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, i) => (
              <div key={leader.name} className={`reveal delay-${(i + 1) * 100}`}>
                <div className="group glass rounded-2xl p-8 text-center card-hover">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-purple)] flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                    {leader.initials}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{leader.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
