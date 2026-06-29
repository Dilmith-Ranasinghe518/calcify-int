'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="/hero-poster.jpg"
        >
          <source
            src="https://res.cloudinary.com/dmygtgmve/video/upload/v1782737037/8348902-uhd_3840_2160_25fps_u5kvxm.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/80 via-[var(--bg-deep)]/60 to-[var(--bg-deep)]" />
        {/* Blue accent glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-accent-purple)]/5" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Delivering Enterprise Excellence Since 2015
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6 transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-white">Engineering</span>
          <span className="block gradient-text mt-2">Tomorrow&apos;s Digital</span>
          <span className="block text-white mt-2">Infrastructure</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          We build transformative digital solutions for the world&apos;s most ambitious enterprises. 
          From ERP systems to AI-powered platforms — we turn complexity into competitive advantage.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link href="/contact" className="btn-primary text-lg py-4 px-8">
            Start a Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/services" className="btn-outline text-lg py-4 px-8">
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-1000 delay-800 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">Scroll</span>
        <div className="w-6 h-10 border-2 border-[var(--text-muted)]/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[var(--color-primary)] rounded-full" style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Decorative side lines */}
      <div className="absolute left-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-[var(--color-primary)]/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-[var(--color-primary)]/20 to-transparent hidden lg:block" />
    </section>
  );
}
