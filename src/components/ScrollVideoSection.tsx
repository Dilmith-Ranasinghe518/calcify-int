"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollVideoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const width = useTransform(progress, [0, 1], ["40vw", "100vw"]);
  const height = useTransform(progress, [0, 1], ["48vh", "100vh"]);
  const left = useTransform(progress, [0, 1], ["55vw", "0vw"]);
  const top = useTransform(progress, [0, 1], ["15vh", "0vh"]);
  const radius = useTransform(progress, [0, 0.65, 1], ["4px", "4px", "0px"]);
  const titleOpacity = useTransform(progress, [0, 0.35, 0.7], [1, 0.65, 0]);

  return <section ref={ref} className="scroll-video-section"><div className="scroll-video-sticky"><div className="scroll-video-label"><span>02 / Motion system</span><span>Scroll to expand</span></div><motion.div className="scroll-video-title" style={{ opacity: titleOpacity }}><strong>SOFTWARE.</strong><span>AI. DATA.</span></motion.div><motion.video className="scroll-video-main" style={{ width, height, left, top, borderRadius: radius }} src="/video/reference-intro.mp4" autoPlay muted loop playsInline aria-label="Calcify digital work montage" /><motion.div className="scroll-video-caption" style={{ opacity: titleOpacity }}><p>Digital products, platforms, and systems for companies ready to move forward.</p><span>↗</span></motion.div><div className="scroll-video-progress"><motion.i style={{ scaleX: progress }} /></div></div></section>;
}
