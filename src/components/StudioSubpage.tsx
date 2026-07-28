"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { brand, services } from "@/lib/content";

type Page = "about" | "services" | "contact";
const aboutCards = [
  ["01", "Built around clarity", "We make complicated businesses easier to understand, operate, and grow through thoughtful digital systems."],
  ["02", "Small enough to care", "Senior thinkers stay close to the work from the first conversation to the last deployment."],
  ["03", "Ready for scale", "Our products are designed for the next stage of your business, not just the next launch."],
];
const journey = [["2015", "Calcify begins"], ["2019", "Global delivery"], ["2023", "500+ projects"], ["NOW", "Building what’s next"]];
const process = [["01", "Listen", "We map the opportunity before we map the technology."], ["02", "Shape", "We turn an ambitious idea into a clear, testable product direction."], ["03", "Build", "Design and engineering move together in short, visible cycles."], ["04", "Grow", "We stay close after launch, improving the system as you move." ]];

function Arrow() { return <span className="sub-arrow">↗</span>; }
function SubHero({ eyebrow, title, intro, number }: { eyebrow: string; title: React.ReactNode; intro: string; number: string }) {
  return <section className="sub-hero"><div className="section-topline"><span>{number} / {eyebrow}</span><span>CALCIFY INTERNATIONAL / WORLDWIDE</span></div><div className="sub-hero-content"><div className="sub-ghost">CALCIFY</div><motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7 }}>{title}</motion.h1><p>{intro}</p><Link href="/contact" className="sub-circle" aria-label="Start a project"><Arrow /></Link></div></section>;
}
function GridCard({ number, title, body }: { number: string; title: string; body: string }) { return <motion.article className="sub-card" whileHover={{ y: -8 }}><span>{number}</span><h3>{title}</h3><p>{body}</p><Arrow /></motion.article>; }

export default function StudioSubpage({ page }: { page: Page }) {
  const [sent, setSent] = useState(false);
  if (page === "about") return <div className="studio-subpage"><SubHero number="01" eyebrow="About Calcify" title={<>We make<br /><em>useful things.</em></>} intro="Calcify is a software studio for ambitious companies. We bring strategy, design, and engineering together to make the next version of your business real." /><section className="sub-statement"><p className="eyebrow">The short version</p><h2>We believe software should feel less like a project and more like a <em>new capability.</em></h2></section><section className="sub-cards-wrap"><div className="section-topline"><span>02 / How we work</span><span>People × process × product</span></div><div className="sub-cards">{aboutCards.map((card) => <GridCard key={card[0]} number={card[0]} title={card[1]} body={card[2]} />)}</div></section><section className="sub-journey"><div className="section-topline"><span>03 / Our journey</span><span>Still moving forward</span></div><h2 className="display-lg">A decade of<br /><em>forward motion.</em></h2><div className="journey-line">{journey.map((item) => <div key={item[0]}><strong>{item[0]}</strong><span>{item[1]}</span></div>)}</div></section><SubCTA /></div>;
  if (page === "services") return <div className="studio-subpage"><SubHero number="01" eyebrow="Services" title={<>Ideas into<br /><em>momentum.</em></>} intro="We help ambitious teams turn complex operations, bold products, and new opportunities into digital systems that move the business forward." /><section className="sub-services"><div className="section-topline"><span>02 / Capabilities</span><span>Strategy · Design · Engineering</span></div><div className="service-tiles">{services.map((service, index) => <GridCard key={service.slug} number={`0${index + 1}`} title={service.title.replace(" Development", "")} body={service.body} />)}</div></section><section className="sub-process"><div className="section-topline"><span>03 / Our process</span><span>Simple on purpose</span></div><h2 className="display-lg">Good work has<br /><em>a rhythm.</em></h2><div className="process-grid">{process.map((item) => <GridCard key={item[0]} number={item[0]} title={item[1]} body={item[2]} />)}</div></section><SubCTA /></div>;
  return <div className="studio-subpage"><SubHero number="01" eyebrow="Contact" title={<>Let&apos;s make<br /><em>the next move.</em></>} intro="Tell us what you’re trying to change. We’ll bring a point of view, a practical path forward, and the right people to make it happen." /><section className="contact-stage"><div className="contact-side"><p className="eyebrow">Start a conversation</p><h2>Bring us the<br /><em>hard part.</em></h2><p>We work with product, operations, and leadership teams who are ready to turn a business challenge into a competitive edge.</p><div className="contact-details"><a href={`mailto:${brand.email}`}>{brand.email}</a><a href={brand.whatsapp}>WhatsApp us <Arrow /></a><span>{brand.phone}</span></div></div><form className="studio-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name" /></label><label>Work email<input required type="email" placeholder="you@company.com" /></label><label>Company<input placeholder="Your company" /></label><label>What can we help with?<textarea required rows={5} placeholder="Tell us about the product, problem, or opportunity." /></label><button type="submit">{sent ? "Message ready" : "Send enquiry"}<Arrow /></button><small>We’ll reply with a considered next step.</small></form></section></div>;
}

function SubCTA() { return <section className="sub-cta"><p className="eyebrow">Ready when you are</p><h2 className="display-lg">Let&apos;s build<br /><em>what&apos;s next.</em></h2><Link href="/contact" className="cta-button">Start a project <Arrow /></Link></section>; }
