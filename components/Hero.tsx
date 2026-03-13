"use client";

import {
  motion, useScroll, useTransform,
  useMotionValue, useSpring, animate,
} from "framer-motion";
import {
  FiArrowDown, FiStar, FiUsers, FiZap, FiAward,
  FiPhone, FiInstagram, FiClock, FiChevronRight,
  FiMapPin, FiArrowRight,
} from "react-icons/fi";
import { TbBarbell, TbFlame } from "react-icons/tb";
import { useRef, useEffect, useState } from "react";

// ─── oklch color helpers ─────────────────────────────────────────────────────
const PRIMARY = "0.72 0.18 48";  // bottle green
const INDIGO = "0.50 0.150 280";  // soft indigo accent
const MUTED = "0.50 0.022 52";   // warm stone
const oklcha = (lch: string, a: number) => `oklch(${lch} / ${a})`;
// Legacy alias — some stat objects still pass an rgb triple for gradient use
const ACCENT = PRIMARY;
const rgba = (rgb: string, a: number) => `oklch(${rgb} / ${a})`;

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.8, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const ctrl = animate(0, target, { duration, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return ctrl.stop;
  }, [start, target, duration]);
  return value;
}

function useIsOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = new Date().getHours(); setOpen(h >= 6 && h < 22); }, []);
  return open;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { icon: FiClock, numVal: 16, display: "16", suffix: "hrs", label: "Daily Access", sub: "6AM – 10PM", rgb: INDIGO },
  { icon: FiUsers, numVal: 500, display: "500", suffix: "+", label: "Members", sub: "Active members", rgb: ACCENT },
  { icon: FiStar, numVal: null, display: "4.8", suffix: "★", label: "Rating", sub: "287+ Google reviews", rgb: INDIGO },
  { icon: FiAward, numVal: 12, display: "12", suffix: "+", label: "Trainers", sub: "NSCA / ACE certified", rgb: ACCENT },
];

const PARTICLES = [
  { size: 52, x: 13, y: 17, r: 45, type: "sq", depth: 0.45 },
  { size: 70, x: 83, y: 37, r: -15, type: "sq", depth: 0.60 },
  { size: 30, x: 71, y: 11, r: 120, type: "ci", depth: 0.30 },
  { size: 56, x: 21, y: 71, r: 30, type: "sq", depth: 0.50 },
  { size: 24, x: 77, y: 81, r: -60, type: "ci", depth: 0.35 },
  { size: 16, x: 37, y: 7, r: 10, type: "sq", depth: 0.25 },
  { size: 20, x: 54, y: 87, r: -20, type: "ci", depth: 0.22 },
  { size: 40, x: 91, y: 64, r: 75, type: "sq", depth: 0.48 },
];

// ─── Particle (hook-safe: one component per particle) ────────────────────────

function Particle({ p, smoothX, smoothY, i }: { p: typeof PARTICLES[0]; smoothX: any; smoothY: any; i: number }) {
  const xRange: [number, number] = i % 2 === 0 ? [-32 * p.depth, 32 * p.depth] : [32 * p.depth, -32 * p.depth];
  const yRange: [number, number] = i % 3 === 0 ? [-22 * p.depth, 22 * p.depth] : [22 * p.depth, -22 * p.depth];
  const px = useTransform(smoothX, [-1, 1], xRange);
  const py = useTransform(smoothY, [-1, 1], yRange);
  return (
    <motion.div style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, x: px, y: py, rotate: p.r }}
      className="opacity-[0.04]">
      <div style={{
        width: p.size, height: p.size,
        borderRadius: p.type === "ci" ? "999px" : "3px",
        border: `1px solid ${rgba(ACCENT, 0.35)}`,
      }} />
    </motion.div>
  );
}

// ─── Background ──────────────────────────────────────────────────────────────

function Background({ bgY }: { bgY: any }) {
  return (
    <>
      {/* Radial accent glow */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: `radial-gradient(ellipse 70% 55% at 62% 38%, ${rgba(ACCENT, 0.08)} 0%, transparent 68%)` }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: `linear-gradient(${rgba(ACCENT, 0.04)} 1px, transparent 1px), linear-gradient(90deg, ${rgba(ACCENT, 0.04)} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }} />

      {/* Film grain noise */}
      <div className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

      {/* Coverage + top/bottom vignette */}
      <div className="absolute inset-0 z-[4]"
        style={{ background: `linear-gradient(100deg, var(--background) 0%, var(--background) 38%, oklch(0.975 0.016 72 / 0.88) 55%, transparent 72%)` }} />
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: `linear-gradient(180deg, oklch(0.975 0.016 72 / 0.35) 0%, transparent 20%, transparent 78%, var(--background) 100%)` }} />

      {/* Diagonal slash lines */}
      <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none" aria-hidden>
        {[0.68, 0.72, 0.77].map((x, i) => (
          <line key={i}
            x1={`${x * 100}%`} y1="0"
            x2={`${(x + 0.22) * 100}%`} y2="100%"
            stroke={rgba(ACCENT, 1)}
            strokeWidth={i === 1 ? "1" : "0.5"}
            strokeOpacity={i === 1 ? "0.14" : "0.06"}
          />
        ))}
      </svg>

      {/* Floating glow orbs */}
      <motion.div
        className="absolute z-[4] top-[8%] right-[16%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ y: bgY, background: `radial-gradient(circle, ${rgba(ACCENT, 0.09)} 0%, transparent 70%)` }}
      />
      <div className="absolute z-[4] bottom-[10%] left-[14%] w-[360px] h-[360px] rounded-full pointer-events-none animate-pulse-slow"
        style={{ background: `radial-gradient(circle, ${rgba(INDIGO, 0.07)} 0%, transparent 70%)` }} />
      <div className="absolute z-[4] top-[55%] right-[30%] w-[240px] h-[240px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${rgba(INDIGO, 0.05)} 0%, transparent 70%)`, filter: "blur(40px)" }} />

      {/* HUD text — ultra faint, desktop only */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none hidden lg:block"
        style={{ opacity: 0.028 }}>
        <div className="absolute top-[22%] left-[4.5%] font-mono text-[7px] leading-relaxed flex flex-col gap-0.5"
          style={{ color: `oklch(${ACCENT})` }}>
          <span>STR_LVL: 094</span><span>REC_RT: 98%</span><span>SYS: ACTIVE</span>
        </div>
        <div className="absolute bottom-[28%] right-[7%] font-mono text-[7px] leading-relaxed flex flex-col gap-0.5 items-end"
          style={{ color: `oklch(${ACCENT})` }}>
          <span>ZONE: ALPHA</span><span>OUTPUT: 120%</span>
        </div>
        <div className="absolute top-1/2 left-[11%] w-px h-24 bg-gradient-to-b from-transparent via-current to-transparent"
          style={{ color: `oklch(${ACCENT})` }} />
        <div className="absolute top-[40%] right-[16%] h-px w-20 bg-gradient-to-r from-transparent via-current to-transparent"
          style={{ color: `oklch(${ACCENT})` }} />
      </div>
    </>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ stat, index, triggered }: { stat: typeof stats[0]; index: number; triggered: boolean }) {
  const count = useCountUp(stat.numVal ?? 0, 1.6 + index * 0.12, triggered);
  const display = stat.numVal ? (count >= stat.numVal ? stat.display : count.toString()) : stat.display;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 1.0 + index * 0.11, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-default"
    >
      {/* Glass surface */}
      <div className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: "oklch(1 0 0 / 0.70)",
          backdropFilter: "blur(14px)",
          border: `1px solid oklch(0.12 0.026 40 / 0.05)`,
        }} />
      {/* Hover tint */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${rgba(stat.rgb, 0.07)}, transparent 60%)` }} />
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${rgba(stat.rgb, 0.25)}` }} />
      {/* Sweep line */}
      <motion.div className="absolute top-0 left-0 h-[1.5px] rounded-full"
        initial={{ width: "0%" }}
        animate={triggered ? { width: "100%" } : {}}
        transition={{ duration: 1.0, delay: 1.2 + index * 0.12, ease: "easeOut" }}
        style={{ background: `linear-gradient(90deg, ${rgba(stat.rgb, 0.9)}, transparent)` }}
      />

      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: rgba(stat.rgb, 0.12) }}>
            <stat.icon size={14} style={{ color: `rgb(${stat.rgb})` }} />
          </div>
          <FiChevronRight size={10}
            className="mt-1 opacity-20 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-300"
            style={{ color: `rgb(${stat.rgb})` }} />
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-display font-black leading-none tabular-nums"
            style={{
              fontSize: "clamp(20px, 3.5vw, 28px)",
              background: `linear-gradient(135deg, var(--foreground) 35%, oklch(${stat.rgb}))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            {display}
          </span>
          {stat.suffix && (
            <span className="font-display text-xs font-black leading-none" style={{ color: `rgb(${stat.rgb})` }}>
              {stat.suffix}
            </span>
          )}
        </div>

        <p className="font-mono font-bold text-[10px] tracking-widest uppercase leading-none mb-0.5"
          style={{ color: "var(--muted-foreground)" }}>
          {stat.label}
        </p>
        <p className="font-mono text-[9px] leading-none" style={{ color: "var(--muted-foreground)" }}>
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Animated Headline ───────────────────────────────────────────────────────

function Headline({ smoothX, smoothY }: { smoothX: any; smoothY: any }) {
  const gx = useTransform(smoothX, [-1, 1], ["5%", "95%"]);
  const gy = useTransform(smoothY, [-1, 1], ["5%", "95%"]);

  const lines: { text: string; solid: boolean }[] = [
    { text: "UNLEASH", solid: true },
    { text: "YOUR", solid: false },
    { text: "STRENGTH", solid: false },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      {lines.map((line, li) => (
        <motion.div key={line.text}
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.024, delayChildren: 0.26 + li * 0.16 } } }}
          className="flex flex-wrap leading-none overflow-hidden select-none"
          aria-label={line.text}
        >
          {line.text.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={{
                hidden: { y: "115%", opacity: 0, skewY: 6 },
                visible: { y: "0%", opacity: 1, skewY: 0, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.12 } }}
              className="relative inline-block cursor-default"
              style={{
                fontSize: "clamp(50px, 12.5vw, 156px)",
                lineHeight: 0.88,
                letterSpacing: "0.05em",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontStyle: "italic",
                display: "inline-block",
                width: char === " " ? "0.22em" : "auto",
                ...(line.solid
                  ? { color: "var(--foreground)" }
                  : { WebkitTextStroke: `1.5px ${rgba(ACCENT, 0.7)}`, color: "transparent" }
                ),
              }}
            >
              {/* Mouse radial spotlight on outline chars */}
              {!line.solid && char !== " " && (
                <motion.span className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage: `radial-gradient(circle at ${gx} ${gy}, rgb(${ACCENT}) 0%, transparent 72%)`,
                  } as any}>
                  {char}
                </motion.span>
              )}
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ─── CTA Row ─────────────────────────────────────────────────────────────────

function CTARow({ scrollTo }: { scrollTo: (h: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.92 }}
      className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 mb-10 sm:mb-12"
    >
      {/* Primary — dark text on cyan bg (high contrast, premium) */}
      <motion.button
        onClick={() => scrollTo("#membership")}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-6 py-4 font-black text-[11px] tracking-[3px] uppercase font-mono rounded-xl"
        style={{
          background: `var(--primary)`,
          color: "var(--primary-foreground)",
          boxShadow: `0 8px 32px -8px ${rgba(ACCENT, 0.40)}`,
        }}
      >
        <motion.div className="absolute top-0 left-0 w-10 h-full skew-x-[25deg]"
          style={{ background: "oklch(1 0 0 / 0.18)" }}
          animate={{ x: ["-120%", "400%"] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 4.2 }}
        />
        <FiZap size={14} className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
        Join The Elite
        <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

      {/* Phone link — desktop */}
      <motion.a href="tel:9019342121"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest transition-colors duration-300 ml-1 group"
        style={{ color: "var(--muted-foreground)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: rgba(ACCENT, 0.10) }}>
          <FiPhone size={10} style={{ color: `rgb(${ACCENT})` }} />
        </div>
        <span className="group-hover:text-text-hi transition-colors">9019342121</span>
      </motion.a>
    </motion.div>
  );
}

// ─── Address Bar ─────────────────────────────────────────────────────────────

function AddressBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute bottom-0 left-0 right-0 z-20"
    >
      <div className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${rgba(ACCENT, 0.45)}, transparent)` }} />
      <div className="backdrop-blur-md px-4 py-2.5 sm:py-2"
        style={{ background: "oklch(0.975 0.016 72 / 0.88)", borderTop: `1px solid var(--border)` }}>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 lg:px-8 px-4">
          <p className="flex items-start sm:items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[1.5px] text-center sm:text-left"
            style={{ color: "var(--muted-foreground)" }}>
            <FiMapPin size={10} className="flex-shrink-0 mt-px sm:mt-0" style={{ color: `rgb(${ACCENT})` }} />
            <span>3rd Floor, Aishwarya Sampurna · 79/1 Vanivilas Rd, Above KFC · Gandhi Bazaar, Basavanagudi · Bengaluru 560004</span>
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="https://www.instagram.com/shields_basavanagudi/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-wider transition-colors duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = `var(--primary)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"}
            >
              <FiInstagram size={10} /> @shields_basavanagudi
            </a>
            <div className="w-px h-3 bg-foreground/10" />
            <a href="tel:9019342121"
              className="font-mono text-[9px] sm:text-[10px] tracking-wider transition-colors duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = `var(--primary)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"}
            >
              9019342121
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Scroll Indicator ────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4 }}
      className="absolute bottom-16 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <div className="relative w-[18px] h-[30px] rounded-full flex items-start justify-center pt-[5px]"
        style={{ border: `1px solid oklch(0.12 0.026 40 / 0.15)` }}>
        <motion.div className="w-[3px] h-[6px] rounded-full"
          style={{ background: `rgb(${ACCENT})` }}
          animate={{ y: [0, 9, 0], opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Glow dot */}
        <motion.div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full blur-[3px]"
          style={{ background: `rgb(${ACCENT})` }}
          animate={{ opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="font-mono text-[8px] tracking-[4px] uppercase" style={{ color: "var(--muted-foreground)" }}>
        scroll
      </span>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const isOpen = useIsOpen();

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const bgY = useTransform(smoothScrollY, [0, 1], ["0%", "14%"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 18 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseX, mouseY]);

  useEffect(() => { const t = setTimeout(() => setStatsTriggered(true), 700); return () => clearTimeout(t); }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section ref={containerRef} id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden select-none"
      style={{ background: "var(--background)" }}>

      {/* Background */}
      <Background bgY={bgY} />

      {/* Particles (desktop only) */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none hidden sm:block">
        {PARTICLES.map((p, i) => <Particle key={i} p={p} smoothX={smoothX} smoothY={smoothY} i={i} />)}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-32 sm:pb-28">

        {/* ── Status pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="flex flex-wrap items-center gap-2.5 mb-7 sm:mb-9"
        >
          {/* Open / Closed */}
          <div className={`flex items-center gap-2 rounded-full px-3.5 py-2 border font-mono font-black text-[9px] sm:text-[10px] tracking-[2.5px] uppercase ${isOpen
            ? "bg-emerald-500/[0.07] border-emerald-500/25 text-emerald-400"
            : "bg-red-500/[0.07] border-red-500/25 text-red-400"
            }`}>
            <span className="relative flex items-center justify-center">
              <span className={`absolute w-3 h-3 rounded-full opacity-30 blur-[1px] ${isOpen ? "bg-emerald-400 animate-ping" : "bg-red-400"}`} />
              <span className={`relative w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
            </span>
            {isOpen ? "Open Now" : "Closed"}
            <span className="opacity-25 mx-0.5">/</span>
            <span className="opacity-50 font-normal tracking-normal">{isOpen ? "Closes 10PM" : "Opens 6AM"}</span>
          </div>

          {/* Rating pill */}
          <div className="flex items-center gap-2 rounded-full px-3.5 py-2 cursor-default"
            style={{ background: oklcha(ACCENT, 0.07), border: `1px solid ${oklcha(ACCENT, 0.20)}` }}>
            <FiStar size={10} style={{ color: `oklch(${INDIGO})` }} />
            <span className="font-mono font-black text-[9px] sm:text-[10px] tracking-[2px] uppercase"
              style={{ color: "var(--foreground)" }}>
              4.8{" "}
              <span style={{ color: "var(--muted-foreground)", margin: "0 3px" }}>/</span>{" "}
              287 Reviews
            </span>
          </div>

          {/* Location */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] tracking-widest"
            style={{ color: "var(--muted-foreground)" }}>
            <FiMapPin size={9} style={{ color: rgba(ACCENT, 0.6) }} />
            Basavanagudi, BLR
          </div>
        </motion.div>

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.20 }}
          className="flex items-center gap-2.5 mb-3 sm:mb-4"
        >
          <div className="h-px w-9 rounded-full" style={{ background: `rgb(${ACCENT})` }} />
          <TbBarbell size={12} style={{ color: `rgb(${ACCENT})` }} />
          <span className="font-mono font-bold text-[10px] tracking-[4px] uppercase"
            style={{ color: `rgb(${ACCENT})` }}>
            Shield's Fitness · Basavanagudi
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <Headline smoothX={smoothX} smoothY={smoothY} />

        {/* ── Subhead ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.80 }}
          className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10 font-body"
          style={{ color: "var(--muted-foreground)" }}
        >
          Forge your ultimate physique with elite coaching and{" "}
          <span style={{ color: "var(--foreground)" }} className="font-semibold">
            high-performance gear
          </span>{" "}
          at Basavanagudi's most intensive training ground.
        </motion.p>

        {/* ── CTAs ── */}
        <CTARow scrollTo={scrollTo} />

        {/* ── Stat grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-[640px]">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} triggered={statsTriggered} />)}
        </div>

        {/* ── Mobile phone link ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="flex sm:hidden items-center gap-2 mt-5">
          <a href="tel:9019342121"
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest transition-colors"
            style={{ color: "var(--muted-foreground)" }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: rgba(ACCENT, 0.10) }}>
              <FiPhone size={10} style={{ color: `rgb(${ACCENT})` }} />
            </div>
            9019342121
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
      <AddressBar />
    </section>
  );
}