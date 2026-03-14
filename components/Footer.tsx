"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  FiPhone, FiMapPin, FiClock, FiArrowUp,
  FiArrowRight, FiStar, FiUsers, FiShield,
  FiZap, FiAward,
} from "react-icons/fi";
import {
  MdVerified, MdLocalFireDepartment, MdEmojiEvents,
  MdFitnessCenter, MdSupportAgent, MdAccessTime,
} from "react-icons/md";
import { TbBarbell, TbFlame, TbBrandWhatsapp } from "react-icons/tb";
import { RiLiveLine, RiVipCrownFill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";

// ─── Data ────────────────────────────────────────────────────────────────────

const IG_URL = "https://www.instagram.com/shields_basavanagudi/";
const WA_URL = "https://wa.me/919019342121?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Shield%27s%20Fitness";

const quickLinks = [
  { label: "About", href: "#about", icon: GiMuscleUp },
  { label: "Facilities", href: "#facilities", icon: MdFitnessCenter },
  { label: "Membership", href: "#membership", icon: RiVipCrownFill },
  { label: "Contact", href: "#contact", icon: FiPhone },
];

const stats = [
  { icon: FiUsers, value: "500+", label: "Members", color: "var(--primary)" },
  { icon: MdEmojiEvents, value: "12+", label: "Trainers", color: "oklch(0.60 0.150 85)" },
  { icon: FiStar, value: "4.8★", label: "Google Rating", color: "oklch(0.60 0.150 150)" },
  { icon: FiAward, value: "287+", label: "Reviews", color: "oklch(0.65 0.150 250)" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollTo(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

// ─── Footer Body ──────────────────────────────────────────────────────────────

function FooterBody() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-14 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* ── Brand column ── */}
        <div className="sm:col-span-2 lg:col-span-1">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
              style={{ background: "var(--primary)", boxShadow: "0 4px 16px oklch(0.72 0.18 48 / 0.25)" }}
            >
              <img src="/favicon.jpg" alt="Shield's Fitness" className="w-full h-full object-cover scale-150" />
            </div>
            <div>
              <p className="font-display text-lg leading-none tracking-[0.1em] sm:tracking-[0.15em]" style={{ color: "var(--foreground)" }}>
                SHIELD&apos;S
              </p>
              <p className="text-[9px] tracking-[0.2em] sm:tracking-[0.4em] uppercase font-mono font-bold mt-0.5" style={{ color: "var(--primary)" }}>
                FITNESS · BASAVANAGUDI
              </p>
            </div>
          </div>

          <p className="font-mono text-xs leading-relaxed mb-6 max-w-xs" style={{ color: "var(--muted-foreground)" }}>
            Bengaluru&apos;s premier fitness destination. Building stronger bodies and more confident lives.
          </p>

          {/* Socials */}
          <div className="flex gap-2.5 mb-6">
            <motion.a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              title="Instagram"
            >
              <FaInstagram size={16} />
            </motion.a>
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white bg-green-500/20 border border-foreground hover:bg-green-500 transition-colors"
              title="WhatsApp"
            >
              <FaWhatsapp size={16} className="text-green-400 group-hover:text-white" />
            </motion.a>
          </div>

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 border border-foreground bg-green-500/[0.06] rounded-lg px-3 py-1.5">
            <RiLiveLine className="text-green-400 animate-pulse" size={11} />
            <span className="text-green-400 font-mono text-[9px] tracking-widest uppercase font-bold">
              Open Now · 6AM–10PM
            </span>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h4 className="flex items-center gap-2 font-mono font-bold text-[10px] tracking-[4px] uppercase mb-5 pb-3 border-b border-foreground/[0.05]" style={{ color: "var(--foreground)" }}>
            <FiArrowRight size={11} style={{ color: "var(--primary)" }} /> Quick Links
          </h4>
          <ul className="flex flex-col gap-1.5">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-2.5 font-mono text-xs transition-all duration-200 group w-full text-left py-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
                  >
                    <Icon
                      size={11}
                      className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Contact Info ── */}
        <div>
          <h4 className="flex items-center gap-2 font-mono font-bold text-[10px] tracking-[4px] uppercase mb-5 pb-3 border-b border-foreground" style={{ color: "var(--foreground)" }}>
            <FiPhone size={11} style={{ color: "var(--primary)" }} /> Contact
          </h4>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 relative group/addr cursor-pointer" onClick={() => copyToClipboard("3rd Floor, Aishwarya Sampurna 79/1 Vanivilas Rd, Above KFC Gandhi Bazaar, Basavanagudi, Bengaluru – 560004", "address")}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "oklch(0.72 0.18 48 / 0.1)" }}>
                <FiMapPin size={12} style={{ color: "var(--primary)" }} />
              </div>
              <div className="relative">
                <address className="font-mono text-xs not-italic leading-relaxed transition-colors group-hover:text-foreground" style={{ color: "var(--muted-foreground)" }}>
                  3rd Floor, Aishwarya Sampurna
                  <br />79/1 Vanivilas Rd, Above KFC
                  <br />Gandhi Bazaar, Basavanagudi
                  <br />Bengaluru – 560004
                </address>
                <AnimatePresence>
                  {copied === "address" && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-6 left-0 bg-primary text-primary-fg text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                    >
                      COPIED!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 group/phone relative cursor-pointer" onClick={(e) => { e.preventDefault(); copyToClipboard("9019342121", "phone"); }}>
              <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <FiPhone className="text-green-400" size={12} />
              </div>
              <span
                className="font-mono text-xs transition-colors group-hover/phone:text-foreground"
                style={{ color: "var(--muted-foreground)" }}
              >
                9019342121
              </span>
              <AnimatePresence>
                {copied === "phone" && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -right-12 bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                  >
                    COPIED!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MdAccessTime className="text-blue-400" size={13} />
              </div>
              <div className="font-mono text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Mon – Sun
                <br />6:00 AM – 10:00 PM
                <br />
                <span className="text-green-400/80 text-[9px]">Open on all holidays</span>
              </div>
            </div>

            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #833ab420, #fd1d1d20)" }}
              >
                <FaInstagram className="text-pink-400" size={12} />
              </div>
              <span
                className="font-mono text-xs transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
              >
                @shields_basavanagudi
              </span>
            </a>

            <a
              href="https://bhaskar.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group/dev mt-2"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-orange-500/10"
              >
                <FiZap className="text-orange-400" size={12} />
              </div>
              <span
                className="font-mono text-xs transition-colors group-hover/dev:text-foreground"
                style={{ color: "var(--muted-foreground)" }}
              >
                Meet the developer
              </span>
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-foreground pt-6 flex flex-col md:flex-row items-center justify-between gap-y-4 gap-x-6 text-center md:text-left">
        <p className="font-mono text-[10px] tracking-widest order-3 md:order-1" style={{ color: "oklch(0.45 0.02 52)" }}>
          © {new Date().getFullYear()} Shield&apos;s Fitness Club, Basavanagudi. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 order-1 md:order-2">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] transition-colors"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            <FaInstagram size={10} />
            @shields_basavanagudi
          </a>
          <span className="text-foreground/10 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--muted-foreground)" }}>
            <FiShield size={9} className="opacity-50" />
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll to Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 400));

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-5 w-12 h-12 rounded-2xl flex items-center justify-center z-[60] transition-all duration-300 hover:shadow-2xl"
      style={{
        background: "oklch(0.72 0.18 48 / 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "oklch(0.15 0.02 60)",
        border: "1px solid oklch(0.72 0.18 48 / 0.4)",
        boxShadow: "0 8px 32px oklch(0.72 0.18 48 / 0.25)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-label="Scroll to top"
    >
      <FiArrowUp size={17} strokeWidth={2.5} />
    </motion.button>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <>
      <footer className="border-t border-foreground relative overflow-hidden" style={{ background: "var(--background)" }}>
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-accent/[0.03] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/[0.03] blur-[160px] rounded-full pointer-events-none" />


        <FooterBody />
      </footer>

      <ScrollToTop />
    </>
  );
}