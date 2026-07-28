"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { brand, services, work } from "@/lib/content";
import ScrollVideoSection from "@/components/ScrollVideoSection";

const clients = ["MOBITEL", "DIALOG", "SAMPATH", "MAS", "HNB", "PICKME", "JOHN KEELLS"];
const cardVideos = ["/video/cloud-systems.mp4", "/video/ai-flow.mp4", "/video/hero-network.mp4", "/video/cta-orbit.mp4"];
function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span className={diagonal ? "arrow arrow-diagonal" : "arrow"}>↗</span>; }

function LivePreview({ index }: { index: number }) {
  return <div className={`live-preview preview-${index}`} aria-hidden="true"><div className="preview-noise" /><div className="preview-grid" />{Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ top: `${16 + i * 12}%`, animationDelay: `${i * -0.35}s` }} />)}<span className="preview-label">LIVE / 0{index + 1}</span><span className="preview-pulse" /></div>;
}

function ReelCard({ item, index, progress }: { item: (typeof work)[number]; index: number; progress: ReturnType<typeof useSpring> }) {
  const start = index / work.length;
  const end = (index + 1) / work.length;
  const y = useTransform(progress, [start, end], [index === 0 ? 0 : 80, index === work.length - 1 ? 0 : -90]);
  const scale = useTransform(progress, [Math.max(0, start - 0.08), end], [0.86, 1]);
  const opacity = useTransform(progress, [Math.max(0, start - 0.1), start + 0.08, end, Math.min(1, end + 0.1)], [0, 1, 1, 0]);
  return <motion.article className="reel-card" style={{ y, scale, opacity, zIndex: work.length - index }}><div className="card-media"><Image src={item.media ?? "/work/datacenter.jpg"} alt={item.mediaAlt ?? item.title} fill sizes="(max-width: 800px) 88vw, 56vw" priority={index === 0} /><video className="card-video" src={cardVideos[index]} autoPlay muted loop playsInline aria-hidden="true" /><LivePreview index={index} /><span className="card-index">0{index + 1}</span></div><div className="card-copy"><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><p>{item.body}</p><div className="card-foot"><strong>{item.metric}</strong><span>{item.metricLabel}</span><Arrow /></div></div></motion.article>;
}

function WorkReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return <section id="work" ref={ref} className="work-reel"><div className="work-sticky"><div className="section-topline"><span>02 / Selected work</span><span>Scroll to explore</span></div><div className="work-heading"><p className="eyebrow">Case studies</p><h2 className="display-lg">We make<br /><em>complexity</em> useful.</h2></div><div className="reel-cards">{work.map((item, index) => <ReelCard key={item.title} item={item} index={index} progress={smooth} />)}</div><div className="reel-progress"><motion.span style={{ scaleX: smooth }} /></div></div></section>;
}

export default function HomeExperience() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return <div className="studio-home"><section ref={heroRef} className="studio-hero"><video className="hero-video" src="/video/hero-network.mp4" autoPlay muted loop playsInline aria-hidden="true" /><motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}><div className="hero-meta"><span>CALCIFY INTERNATIONAL</span><span>EST. 2015 / COLOMBO — WORLDWIDE</span></div><div className="hero-word-wrap"><div className="hero-ghost">SOFTWARE</div><h1><span>SOFTWARE.</span><br />AI. DATA.<br />AT SCALE.</h1></div><div className="hero-bottom"><p>We design and engineer digital products, platforms, and systems for ambitious companies ready to move forward.</p><Link className="round-link" href="/contact" aria-label="Start a project"><Arrow diagonal /></Link></div></motion.div><div className="hero-orbit" aria-hidden="true"><span /><span /><span /><b>↗</b></div><div className="hero-scroll"><span>Scroll to discover</span><i /></div></section><ScrollVideoSection /><section className="manifesto"><div className="section-topline"><span>01 / Welcome to Calcify</span><span>People × process × product</span></div><h2 className="display-lg">We turn hard problems<br />into <em>useful software.</em></h2><div className="manifesto-foot"><p>From SaaS platforms and customer portals to AI-enabled operations, we connect strategy, design, and engineering to create momentum.</p><Link href="/about" className="text-link">More about Calcify <Arrow /></Link></div></section><section className="client-strip"><p className="eyebrow">Trusted by teams building what comes next</p><div className="client-marquee">{[...clients, ...clients].map((client, i) => <span key={`${client}-${i}`}>{client}</span>)}</div></section><WorkReel /><section id="services" className="services-showcase"><div className="section-topline"><span>03 / Services</span><span>Strategy · Design · Engineering</span></div><div className="services-layout"><div><p className="eyebrow">What we do</p><h2 className="display-lg">Built for<br /><em>real-world</em><br />momentum.</h2><Link href="/services" className="text-link">Explore services <Arrow /></Link></div><div className="service-list">{services.slice(0, 6).map((service, index) => <motion.div key={service.slug} className="service-row" whileHover={{ x: 12 }}><span>0{index + 1}</span><h3>{service.title.replace(" Development", "")}</h3><Arrow /></motion.div>)}</div></div></section><section className="closing-cta"><video className="cta-video" src="/video/cta-orbit.mp4" autoPlay muted loop playsInline aria-hidden="true" /><div className="cta-glow" /><p className="eyebrow">04 / Contact</p><h2 className="display-lg">Let&apos;s build<br /><em>what&apos;s next.</em></h2><Link href="/contact" className="cta-button">Start a project <Arrow diagonal /></Link><div className="cta-note"><span>Calcify International</span><span>{brand.email}</span><span>{brand.phone}</span></div></section></div>;
}
