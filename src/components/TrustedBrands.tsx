'use client';

export default function TrustedBrands() {
  const brands = [
    { name: 'Google', logo: 'G' },
    { name: 'Microsoft', logo: 'M' },
    { name: 'Amazon', logo: 'A' },
    { name: 'Meta', logo: 'F' },
    { name: 'Apple', logo: '' },
    { name: 'SAP', logo: 'SAP' },
    { name: 'Oracle', logo: 'O' },
    { name: 'Salesforce', logo: 'SF' },
    { name: 'IBM', logo: 'IBM' },
    { name: 'Deloitte', logo: 'D' },
  ];

  // Duplicate for infinite scroll
  const allBrands = [...brands, ...brands];

  return (
    <section id="trusted-brands" className="relative py-16 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-sm font-medium tracking-[0.2em] uppercase text-[var(--text-muted)]">
          Trusted by Industry Leaders Worldwide
        </p>
      </div>

      {/* Scrolling logo carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-deep)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-deep)] to-transparent z-10" />

        <div
          className="flex items-center gap-16 w-max"
          style={{ animation: 'scroll-logos 30s linear infinite' }}
        >
          {allBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex items-center gap-3 px-6 py-4 rounded-xl glass-light opacity-40 hover:opacity-100 transition-all duration-500 cursor-default group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg font-bold text-white/60 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {brand.logo === '' ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                ) : (
                  brand.logo
                )}
              </div>
              <span className="text-base font-semibold text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />
    </section>
  );
}
