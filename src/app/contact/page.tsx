"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { brand, services } from "@/lib/content";

const budgets = [
  { value: "10k-50k", label: "$10,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-500k", label: "$100,000 – $500,000" },
  { value: "500k+", label: "$500,000+" },
];

const fieldClass =
  "w-full rounded-card border border-line bg-void/60 px-4 py-3 text-sm text-ink " +
  "placeholder:text-muted transition-colors focus:border-pulse focus:outline-none";

const labelClass = "mb-2 block text-sm font-medium text-ink";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  /**
   * No CONTACT_FORM_ENDPOINT is wired yet (DESIGN_SPEC.md Section 9), so this
   * hands the enquiry to the visitor's mail client rather than showing a fake
   * "message sent" confirmation for a request that was never delivered.
   * Replace with a real POST once the endpoint exists — Phase 9.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceLabel =
      services.find((s) => s.slug === form.service)?.title ?? "Not specified";
    const budgetLabel =
      budgets.find((b) => b.value === form.budget)?.label ?? "Not specified";

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "Not specified"}`,
      `Service: ${serviceLabel}`,
      `Budget: ${budgetLabel}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      `Project enquiry — ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's build something extraordinary"
        intro="Tell us about your project and we'll come back with a technical point of view, a rough shape for delivery, and the team who'd run it."
      />

      <Section>
        <div className="grid gap-px bg-line/50 lg:grid-cols-[1fr_1.6fr]">
          {/* Direct contact */}
          <div className="bg-panel/55 p-8 backdrop-blur-[10px] sm:p-10">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              Talk to us directly
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Prefer a faster channel? WhatsApp usually gets the quickest
              response during business hours.
            </p>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="eyebrow mb-2">Phone</dt>
                <dd>
                  <a
                    href={`tel:${brand.phone.replace(/\s/g, "")}`}
                    className="font-display text-sm text-ink transition-colors hover:text-pulse"
                  >
                    {brand.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Email</dt>
                <dd>
                  <a
                    href={`mailto:${brand.email}`}
                    className="font-display text-sm break-all text-ink transition-colors hover:text-pulse"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Button href={brand.whatsapp} variant="primary">
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-panel/55 p-8 backdrop-blur-[10px] sm:p-10">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-muted">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update}
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-muted">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={update}
                    className={fieldClass}
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={update}
                    className={fieldClass}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="budget" className={labelClass}>
                  Estimated budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={update}
                  className={fieldClass}
                >
                  <option value="">Select a range</option>
                  {budgets.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Project details <span className="text-muted">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update}
                  className={`${fieldClass} resize-none`}
                  placeholder="Tell us about your project, goals, and timeline."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
                <p className="text-xs leading-relaxed text-muted">
                  Opens in your email client so nothing is lost in transit.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
