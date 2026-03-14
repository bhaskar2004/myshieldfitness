"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaInstagram,
  FaFire,
  FaTrophy,
} from "react-icons/fa";
import {
  FiArrowUpRight,
  FiSend,
  FiShare2,
  FiZap,
} from "react-icons/fi";
import {
  MdOutlineVerified,
  MdFitnessCenter,
} from "react-icons/md";

// ─── Data ───────────────────────────────────────────────────────────────────

const INSTAGRAM_URL = "https://www.instagram.com/shields_basavanagudi/";

const tickerItems = [
  { icon: MdFitnessCenter, label: "EARLY MORNING SESSIONS" },
  { icon: FaFire, label: "NEW EQUIPMENT ARRIVED" },
  { icon: FaTrophy, label: "TRANSFORMATION RESULTS" },
  { icon: FiZap, label: "PERSONAL TRAINING" },
  { icon: FaInstagram, label: "FOLLOW @shields_basavanagudi" },
];

// ─── Ticker Banner ──────────────────────────────────────────────────────────

function TickerBanner() {
  return (
    <div className="relative overflow-hidden bg-accent/95 py-2.5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-white font-mono font-bold text-[11px] tracking-[3px] uppercase px-8"
          >
            <item.icon size={13} className="text-white/70" />
            {item.label}
            <span className="text-white/30 text-base">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-dark relative overflow-hidden">
      {/* Ticker */}
      <TickerBanner />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none"
        style={{ y: glowY1 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/4 blur-[120px] rounded-full pointer-events-none"
        style={{ y: glowY2 }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-accent" />
              <FaInstagram className="text-accent" size={13} />
              <span className="text-accent text-[10px] tracking-[5px] uppercase font-mono font-bold">
                @shields_basavanagudi
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl xs:text-5xl lg:text-6xl xl:text-7xl font-display text-text-hi leading-[0.92] tracking-tighter mb-8"
            >
              JOIN OUR
              <br />
              DIGITAL{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--primary)" }}
              >
                TRIBE
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-text-lo font-mono text-sm max-w-xl leading-relaxed opacity-80"
            >
              Follow us for daily workout inspiration, member transformation spotlights, 
              and exclusive community updates. Be part of the Shield elite.
            </motion.p>
          </div>

          {/* Profile card / CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex flex-col items-center gap-6 border border-foreground bg-surface backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 w-full xs:min-w-[340px]">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full p-[3px] flex items-center justify-center shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                    <FaInstagram className="text-text-hi" size={32} />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-dark" />
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-text-hi font-mono font-bold text-lg">
                    shields_basavanagudi
                  </span>
                  <MdOutlineVerified className="text-blue-400 flex-shrink-0" size={18} />
                </div>
                <p className="text-text-lo font-mono text-xs opacity-60">
                  Basavanagudi, Bengaluru
                </p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 text-primary-fg font-mono font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-primary active:scale-95 shadow-[0_4px_20px_var(--primary)]"
                >
                  <FiShare2 size={14} /> Follow Shield <FiArrowUpRight size={14} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 text-text-lo font-mono font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-xl border border-foreground hover:bg-foreground/[0.03] transition-all"
                >
                  <FiSend size={14} /> Send Message
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20 pt-8 border-t border-foreground"
        >
          <div className="flex items-center gap-3 text-text-lo/40 font-mono text-[10px] tracking-[4px] uppercase">
            #SHIELDSFIT · #BASAVANAGUDI · #BENGALURU
          </div>
          <div className="flex items-center gap-6">
            <span className="text-text-lo/40 font-mono text-[10px] uppercase">Est. 2024</span>
            <div className="h-4 w-px bg-foreground/10" />
            <span className="text-text-lo/40 font-mono text-[10px] uppercase">Open 6AM - 10PM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}