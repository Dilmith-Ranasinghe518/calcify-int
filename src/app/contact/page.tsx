'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const heroRef = useScrollReveal();
  const formRef = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dmygtgmve/video/upload/v1782737037/8348902-uhd_3840_2160_25fps_u5kvxm.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/85 via-[var(--bg-deep)]/70 to-[var(--bg-deep)]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="section-label justify-center reveal">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 reveal delay-100">
            Let&apos;s Start Your<br />
            <span className="gradient-text">Next Project</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto reveal delay-200">
            Ready to transform your business? Reach out to us and let&apos;s discuss 
            how Calcify International can engineer your competitive advantage.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 relative" ref={formRef}>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp Card */}
              <div className="reveal">
                <a
                  href="https://wa.me/94717170333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group glass rounded-2xl p-7 card-hover"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">WhatsApp</h3>
                      <p className="text-[var(--text-secondary)] text-sm">Quick response guaranteed</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-white group-hover:text-[#25D366] transition-colors duration-300">
                    +94 71 717 0333
                  </p>
                </a>
              </div>

              {/* Email Card */}
              <div className="reveal delay-100">
                <a
                  href="mailto:support.calcifylabs@gmail.com"
                  className="block group glass rounded-2xl p-7 card-hover"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Email</h3>
                      <p className="text-[var(--text-secondary)] text-sm">We reply within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    support.calcifylabs@gmail.com
                  </p>
                </a>
              </div>

              {/* Phone Card */}
              <div className="reveal delay-200">
                <a
                  href="tel:+94717170333"
                  className="block group glass rounded-2xl p-7 card-hover"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-purple)]/10 flex items-center justify-center text-[var(--color-accent-purple)] group-hover:bg-[var(--color-accent-purple)]/20 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Phone</h3>
                      <p className="text-[var(--text-secondary)] text-sm">Mon - Fri, 9AM - 6PM</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-white group-hover:text-[var(--color-accent-purple)] transition-colors duration-300">
                    +94 71 717 0333
                  </p>
                </a>
              </div>

              {/* Office Hours */}
              <div className="reveal delay-300">
                <div className="glass rounded-2xl p-7">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Monday - Friday</span>
                      <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Saturday</span>
                      <span className="text-white font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Sunday</span>
                      <span className="text-[var(--text-muted)]">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 reveal delay-100">
              <div className="glass rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  Tell us about your project and we&apos;ll get back to you with a detailed proposal.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-[var(--text-secondary)]">
                      Thank you for reaching out. We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-company" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="contact-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-service" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Service Needed
                        </label>
                        <select
                          id="contact-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300 appearance-none"
                        >
                          <option value="" className="bg-[var(--bg-dark)]">Select a service</option>
                          <option value="erp" className="bg-[var(--bg-dark)]">ERP System Development</option>
                          <option value="web" className="bg-[var(--bg-dark)]">Web Development</option>
                          <option value="ai" className="bg-[var(--bg-dark)]">AI Development</option>
                          <option value="mobile" className="bg-[var(--bg-dark)]">Mobile App Development</option>
                          <option value="cloud" className="bg-[var(--bg-dark)]">Cloud Solutions</option>
                          <option value="security" className="bg-[var(--bg-dark)]">Cybersecurity</option>
                          <option value="transformation" className="bg-[var(--bg-dark)]">Digital Transformation</option>
                          <option value="analytics" className="bg-[var(--bg-dark)]">Data Analytics</option>
                          <option value="qa" className="bg-[var(--bg-dark)]">QA Services</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300 appearance-none"
                      >
                        <option value="" className="bg-[var(--bg-dark)]">Select budget range</option>
                        <option value="10k-50k" className="bg-[var(--bg-dark)]">$10,000 - $50,000</option>
                        <option value="50k-100k" className="bg-[var(--bg-dark)]">$50,000 - $100,000</option>
                        <option value="100k-500k" className="bg-[var(--bg-dark)]">$100,000 - $500,000</option>
                        <option value="500k+" className="bg-[var(--bg-dark)]">$500,000+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Project Details *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      className="w-full btn-primary justify-center text-lg py-4"
                    >
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
