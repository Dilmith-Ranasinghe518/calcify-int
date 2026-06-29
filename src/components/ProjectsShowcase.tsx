'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const projects = [
  {
    title: 'Global Banking Platform',
    category: 'ERP / FinTech',
    description: 'End-to-end digital banking transformation for a leading financial institution serving 10M+ customers across 30 countries.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    stats: '10M+ Users',
  },
  {
    title: 'AI-Powered Healthcare',
    category: 'AI / HealthTech',
    description: 'Machine learning diagnostic platform that reduced medical imaging analysis time by 85% for a global healthcare network.',
    gradient: 'from-purple-600/20 to-pink-600/20',
    stats: '85% Faster',
  },
  {
    title: 'Smart City Infrastructure',
    category: 'IoT / Cloud',
    description: 'IoT-enabled smart city platform managing 50,000+ sensors for traffic, energy, and waste management in real-time.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    stats: '50K+ Sensors',
  },
  {
    title: 'E-Commerce Ecosystem',
    category: 'Web / Mobile',
    description: 'Omnichannel retail platform processing $500M+ in annual transactions with 99.99% uptime guarantee.',
    gradient: 'from-orange-600/20 to-red-600/20',
    stats: '$500M+ Revenue',
  },
];

export default function ProjectsShowcase() {
  const sectionRef = useScrollReveal();

  return (
    <section id="projects-showcase" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="section-label reveal">Our Work</span>
            <h2 className="section-title reveal delay-100">
              Projects That<br />
              <span className="gradient-text">Define Industries</span>
            </h2>
          </div>
          <p className="section-subtitle reveal delay-200">
            We partner with global enterprises to deliver 
            solutions that set new industry standards.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={project.title} className={`reveal delay-${(i % 2) * 200 + 100}`}>
              <div className="group relative glass rounded-2xl overflow-hidden card-hover h-full">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Content */}
                <div className="relative p-8 md:p-10">
                  {/* Category & Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                      {project.category}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-accent)]">
                      {project.stats}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* View Case Study Link */}
                  <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
                    <span className="text-sm">View Case Study</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
