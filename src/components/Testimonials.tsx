'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    quote: 'Calcify International transformed our legacy banking infrastructure into a modern, scalable platform. Their team\'s expertise in ERP systems and enterprise architecture is unmatched.',
    name: 'James Richardson',
    title: 'CTO',
    company: 'Global Finance Corp',
  },
  {
    quote: 'The AI-powered diagnostic platform they built reduced our analysis time by 85%. Calcify doesn\'t just deliver code — they deliver business outcomes that matter.',
    name: 'Dr. Sarah Chen',
    title: 'Head of Innovation',
    company: 'MedTech Global',
  },
  {
    quote: 'Working with Calcify felt like an extension of our own team. Their deep understanding of cloud architecture and cybersecurity gave us the confidence to scale globally.',
    name: 'Marcus Williams',
    title: 'VP of Engineering',
    company: 'TechScale Industries',
  },
  {
    quote: 'From mobile app development to our entire digital transformation — Calcify International has been our trusted technology partner for over 5 years. Exceptional delivery, every time.',
    name: 'Elena Vasquez',
    title: 'Director of Digital',
    company: 'Retail Dynamics Inc',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useScrollReveal();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="testimonials" className="relative py-24 md:py-32" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center reveal">Testimonials</span>
          <h2 className="section-title reveal delay-100">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="reveal delay-200">
          <div className="relative glass rounded-2xl p-10 md:p-14">
            {/* Quote icon */}
            <div className="absolute top-6 left-8 text-[var(--color-primary)]/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
            </div>

            {/* Quote text */}
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light italic">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-bold text-white text-lg">{testimonials[active].name}</p>
                  <p className="text-[var(--text-secondary)]">
                    {testimonials[active].title}, {testimonials[active].company}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-[var(--color-primary)]'
                      : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
