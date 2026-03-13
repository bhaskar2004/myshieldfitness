"use client";

import {
  motion, AnimatePresence, useScroll, useSpring,
  useTransform, useMotionValue, useMotionTemplate, animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight, FiZap, FiTarget, FiActivity,
  FiMapPin, FiClock, FiShield, FiStar, FiUsers, FiAward, FiChevronRight, FiPhone, FiInstagram,
} from "react-icons/fi";
import { RiCopperDiamondFill, RiVipCrownFill } from "react-icons/ri";
import { TbBarbell, TbFlame, TbTrophy } from "react-icons/tb";

// ─── Color System ──────────────────────────────────────────────────────────────
const accentL = "0.72 0.18 48";
const indigoL = "0.50 0.150 280";
const ACCENT = `oklch(${accentL})`;
const INDIGO = `oklch(${indigoL})`;
const aa = (a: number) => `oklch(${accentL} / ${a})`;
const ia = (a: number) => `oklch(${indigoL} / ${a})`;

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.8, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const ctrl = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return ctrl.stop;
  }, [start, target, duration]);
  return value;
}

function useIsOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = new Date().getHours();
    setOpen(h >= 6 && h < 22);
  }, []);
  return open;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  {
    icon: FiClock,
    numVal: 16,
    display: "16",
    suffix: "hrs",
    label: "Daily Access",
    sub: "6AM – 10PM",
    color: INDIGO,
    colorFn: ia,
    progress: 0.67,
  },
  {
    icon: FiUsers,
    numVal: 500,
    display: "500",
    suffix: "+",
    label: "Active Members",
    sub: "Growing community",
    color: ACCENT,
    colorFn: aa,
    progress: 0.85,
  },
  {
    icon: FiStar,
    numVal: null,
    display: "4.8",
    suffix: "★",
    label: "Google Rating",
    sub: "287+ reviews",
    color: INDIGO,
    colorFn: ia,
    progress: 0.96,
  },
  {
    icon: FiAward,
    numVal: 12,
    display: "12",
    suffix: "+",
    label: "Elite Trainers",
    sub: "NSCA / ACE cert.",
    color: ACCENT,
    colorFn: aa,
    progress: 0.92,
  },
];

const PARTICLES = [
  { size: 52, x: 7, y: 14, r: 45, type: "sq", depth: 0.45 },
  { size: 30, x: 18, y: 66, r: 30, type: "ci", depth: 0.30 },
  { size: 20, x: 43, y: 7, r: 10, type: "sq", depth: 0.25 },
  { size: 22, x: 36, y: 83, r: -20, type: "ci", depth: 0.22 },
];

// ─── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({
  radius, progress, color, size = 48, triggered,
}: {
  radius: number; progress: number; color: string; size?: number; triggered: boolean;
}) {
  const circ = 2 * Math.PI * radius;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth="1.5" strokeOpacity="0.12" />
      <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={triggered ? { strokeDashoffset: circ * (1 - progress) } : {}}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }} />
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  stat, index, triggered,
}: {
  stat: typeof stats[0]; index: number; triggered: boolean;
}) {
  const count = useCountUp(stat.numVal ?? 0, 1.6 + index * 0.12, triggered);
  const display = stat.numVal
    ? (count >= stat.numVal ? stat.display : count.toString())
    : stat.display;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.93 }}
      animate={triggered ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 1.0 + index * 0.11, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: "oklch(1 0 0 / 0.68)",
          backdropFilter: "blur(18px) saturate(160%)",
          border: "1px solid var(--foreground)",
          boxShadow: "0 0 20px oklch(0.72 0.18 48 / 0.1), 0 2px 8px oklch(0 0 0 / 0.03)",
        }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${stat.colorFn(0.07)}, transparent 60%)` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${stat.colorFn(0.28)}` }} />
      <motion.div className="absolute top-0 left-0 h-[1.5px] w-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={triggered ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, delay: 1.2 + index * 0.12, ease: "easeOut" }} />

      <div className="relative p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="relative">
            <ProgressRing radius={20} progress={stat.progress} color={stat.color} size={48} triggered={triggered} />
            <div className="absolute inset-0 flex items-center justify-center">
              <stat.icon size={13} style={{ color: stat.color }} />
            </div>
          </div>
          <FiChevronRight size={10}
            className="opacity-20 group-hover:opacity-55 group-hover:translate-x-0.5 transition-all duration-300"
            style={{ color: stat.color }} />
        </div>

        <div className="flex items-baseline gap-[2px] mb-[7px]">
          <span
            style={{
              fontSize: "clamp(22px, 3.2vw, 30px)",
              lineHeight: 1,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: "'tnum' 1, 'ss01' 1",
              background: `linear-gradient(135deg, var(--foreground) 30%, ${stat.color})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            {display}
          </span>
          {stat.suffix && (
            <span style={{
              fontSize: "10px",
              lineHeight: 1,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              color: stat.color,
              alignSelf: "flex-end",
              paddingBottom: "2px",
            }}>
              {stat.suffix}
            </span>
          )}
        </div>

        <p style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(10px, 1.8vw, 11px)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          lineHeight: 1.1,
          marginBottom: "4px",
          color: "var(--foreground)",
          opacity: 0.8,
        }}>
          {stat.label}
        </p>

        <p style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          fontSize: "clamp(9px, 1.6vw, 10px)",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          color: "var(--muted-foreground)",
          opacity: 0.65,
        }}>
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Headline ─────────────────────────────────────────────────────────────────
function Headline({ smoothX, smoothY }: { smoothX: any; smoothY: any }) {
  const gx = useTransform(smoothX, [-1, 1], ["5%", "95%"]);
  const gy = useTransform(smoothY, [-1, 1], ["5%", "95%"]);

  const background = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, ${ACCENT} 0%, transparent 72%)`;

  const heroLines: { text: string; style: "solid" | "outline" | "gradient"; secondary?: boolean }[] = [
    { text: "SHIELD", style: "solid" },
    { text: "FITNESS", style: "outline" },
    { text: "CLUB", style: "gradient" },
    { text: "UNLEASH YOUR PEAK", style: "solid", secondary: true },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      {heroLines.map((line, li) => (
        <motion.div key={li}
          initial="hidden" animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.022, delayChildren: 0.22 + li * 0.17 } },
          }}
          className={`flex flex-wrap leading-none overflow-hidden select-none ${line.secondary ? "mt-4 sm:mt-6" : ""}`}
          aria-label={line.text}
        >
          {line.text.split("").map((char, ci) => (
            <motion.span key={ci}
              variants={{
                hidden: { y: "115%", opacity: 0, skewY: 6 },
                visible: {
                  y: "0%", opacity: 1, skewY: 0,
                  transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="relative inline-block cursor-default"
              style={{
                fontSize: line.secondary
                  ? "clamp(11px, 2.5vw, 24px)"
                  : "clamp(46px, 12vw, 148px)",
                lineHeight: line.secondary ? 1.2 : 0.88,
                letterSpacing: line.secondary ? "0.3em" : "0.03em",
                fontFamily: line.secondary ? "var(--font-mono)" : "var(--font-display)",
                fontWeight: line.secondary ? 800 : 900,
                fontStyle: line.secondary ? "normal" : "italic",
                display: "inline-block",
                width: char === " " ? "0.2em" : "auto",
                ...(line.style === "solid"
                  ? { color: line.secondary ? ACCENT : "var(--foreground)" }
                  : line.style === "outline"
                    ? { WebkitTextStroke: `1.5px ${aa(0.65)}`, color: "transparent" }
                    : {
                      background: `linear-gradient(110deg, ${ACCENT} 0%, ${INDIGO} 55%, ${ACCENT} 100%)`,
                      backgroundSize: "200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                ),
              }}
            >
              {line.style === "outline" && char !== " " && (
                <motion.span className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage: background,
                  } as any}>
                  {char}
                </motion.span>
              )}
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mt-3 select-none"
        aria-label="Basavanagudi location"
      >
        <div className="h-px w-8" style={{ background: aa(0.35) }} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          fontSize: "clamp(9px, 1.1vw, 11px)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          opacity: 0.55,
          fontStyle: "normal",
          lineHeight: 1,
        }}>
          Basavanagudi · Bangalore
        </span>
      </motion.div>
    </div>
  );
}

// ─── CTA Row ──────────────────────────────────────────────────────────────────
function CTARow({ scrollTo }: { scrollTo: (h: string) => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 180, damping: 16 });
  const smy = useSpring(my, { stiffness: 180, damping: 16 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.38);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.38);
  };
  const resetMouse = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.92 }}
      className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 mb-10 sm:mb-12"
    >
      <motion.button
        ref={btnRef}
        onClick={() => scrollTo("#membership")}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-7 py-[15px] rounded-xl"
        style={{
          x: smx, y: smy,
          background: ACCENT,
          color: "var(--primary-foreground)",
          boxShadow: `0 8px 36px -8px ${aa(0.48)}`,
          fontFamily: "var(--font-mono)",
          fontWeight: 800,
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          lineHeight: 1,
        } as any}
      >
        <motion.div className="absolute top-0 left-0 w-10 h-full"
          initial={{ x: "-120%" }}
          style={{ background: "oklch(1 0 0 / 0.20)", skewX: "-25deg" }}
          animate={{ x: ["-120%", "420%"] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 4.5 }} />
        <FiZap size={14} className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
        Join The Elite
        <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
      </motion.button>

      <motion.button
        onClick={() => scrollTo("#programs")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center justify-center gap-2 rounded-xl transition-all duration-300"
        style={{
          background: aa(0.06),
          border: `1px solid ${aa(0.18)}`,
          color: ACCENT,
          padding: "14px 20px",
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          lineHeight: 1,
        } as any}
      >
        <TbBarbell size={13} className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
        View Programs
      </motion.button>

      <motion.a href="tel:9019342121"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="hidden sm:flex items-center gap-2 ml-1 group"
        style={{ color: "var(--muted-foreground)", textDecoration: "none" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: aa(0.10) }}>
          <FiPhone size={10} style={{ color: ACCENT }} />
        </div>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: "11px",
          letterSpacing: "0.08em",
          transition: "color 0.2s",
        }}
          className="group-hover:text-foreground transition-colors">
          9019342121
        </span>
      </motion.a>
    </motion.div>
  );
}

// ─── Right Panel — Ring Composition ───────────────────────────────────────────
function RightPanel({ triggered }: { triggered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden lg:flex items-center justify-center"
      style={{ minHeight: 440 }}
    >
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${aa(0.06)} 0%, transparent 70%)` }} />

      <svg viewBox="0 0 440 440" className="w-full max-w-[440px]" aria-hidden>
        <motion.circle cx="220" cy="220" r="196" fill="none"
          stroke={aa(0.09)} strokeWidth="1" strokeDasharray="5 9"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "220px 220px" }} />
        <motion.circle cx="220" cy="220" r="168" fill="none"
          stroke={aa(0.18)} strokeWidth="1.5"
          strokeDasharray={`${2 * Math.PI * 168}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 168 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.7 }} />
        <motion.circle cx="220" cy="220" r="130" fill="none"
          stroke={ia(0.22)} strokeWidth="1"
          strokeDasharray={`${0.7 * 2 * Math.PI * 130} ${0.3 * 2 * Math.PI * 130}`}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "220px 220px" }} />
        <motion.circle cx="220" cy="220" r="90" fill="none"
          stroke={aa(0.28)} strokeWidth="2" strokeDasharray="10 7"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "220px 220px" }} />
        <circle cx="220" cy="220" r="55" fill="none" stroke={aa(0.12)} strokeWidth="1" />
        {[0, 90, 180, 270].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={i}
              x1={220 + 178 * Math.cos(r)} y1={220 + 178 * Math.sin(r)}
              x2={220 + 163 * Math.cos(r)} y2={220 + 163 * Math.sin(r)}
              stroke={aa(0.38)} strokeWidth="2" />
          );
        })}
        {[45, 135, 225, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={i}
              x1={220 + 178 * Math.cos(r)} y1={220 + 178 * Math.sin(r)}
              x2={220 + 170 * Math.cos(r)} y2={220 + 170 * Math.sin(r)}
              stroke={ia(0.28)} strokeWidth="1.5" />
          );
        })}
        <line x1="132" y1="220" x2="308" y2="220" stroke={aa(0.12)} strokeWidth="1.5" />
        <circle cx="140" cy="220" r="18" fill="none" stroke={aa(0.20)} strokeWidth="1.5" />
        <circle cx="140" cy="220" r="11" fill="none" stroke={aa(0.10)} strokeWidth="1" />
        <circle cx="300" cy="220" r="18" fill="none" stroke={aa(0.20)} strokeWidth="1.5" />
        <circle cx="300" cy="220" r="11" fill="none" stroke={aa(0.10)} strokeWidth="1" />
        <circle cx="220" cy="220" r="5" fill={ACCENT} />
        <circle cx="220" cy="220" r="14" fill="none" stroke={aa(0.35)} strokeWidth="1" />
        <motion.circle cx="220" cy="220" r="23" fill="none" stroke={aa(0.15)} strokeWidth="0.5"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.6, 0.08, 0.6] }}
          style={{ transformOrigin: "220px 220px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle r="6" fill={INDIGO} filter={`drop-shadow(0 0 6px ${INDIGO})`}
          initial={{ cx: 220 + 130, cy: 220 }}
          animate={{ cx: [220 + 130, 220, 220 - 130, 220, 220 + 130], cy: [220, 220 - 130, 220, 220 + 130, 220] }}
          transition={{ duration: 9, ease: "linear", repeat: Infinity }} />
        <motion.circle r="4" fill={ACCENT} filter={`drop-shadow(0 0 5px ${ACCENT})`}
          initial={{ cx: 220 - 90, cy: 220 }}
          animate={{ cx: [220 - 90, 220, 220 + 90, 220, 220 - 90], cy: [220, 220 + 90, 220, 220 - 90, 220] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }} />
        <motion.circle r="2.5" fill={ia(0.9)}
          initial={{ cx: 220 + 55, cy: 220 }}
          animate={{ cx: [220 + 55, 220, 220 - 55, 220, 220 + 55], cy: [220, 220 - 55, 220, 220 + 55, 220] }}
          transition={{ duration: 3.8, ease: "linear", repeat: Infinity }} />

        <text x="258" y="148" fontFamily="monospace" fontSize="9.5" fill={aa(0.40)} letterSpacing="1.5">SYS:ACTIVE</text>
        <text x="136" y="302" fontFamily="monospace" fontSize="9.5" fill={ia(0.34)} letterSpacing="1.5">OUTPUT:120%</text>
        <text x="262" y="312" fontFamily="monospace" fontSize="9.5" fill={aa(0.30)} letterSpacing="1.5">ZONE:ALPHA</text>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[9%] right-[4%] rounded-xl px-3.5 py-2.5"
        style={{
          background: "oklch(1 0 0 / 0.88)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${aa(0.18)}`,
          boxShadow: `0 4px 24px ${aa(0.14)}, 0 1px 2px oklch(0 0 0 / 0.04)`,
        }}
      >
        <div className="flex items-center gap-2">
          <TbTrophy size={14} style={{ color: ACCENT }} />
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 800,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1.2,
              color: "var(--foreground)",
            }}>
              Ranked #1
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: "9px",
              letterSpacing: "0.06em",
              lineHeight: 1,
              marginTop: "3px",
              color: "var(--muted-foreground)",
              opacity: 0.55,
            }}>
              Basavanagudi · BLR
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[16%] left-[3%] rounded-xl px-3.5 py-2.5"
        style={{
          background: "oklch(1 0 0 / 0.88)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${ia(0.22)}`,
          boxShadow: `0 4px 24px ${ia(0.12)}, 0 1px 2px oklch(0 0 0 / 0.04)`,
        }}
      >
        <div className="flex items-center gap-2">
          <TbFlame size={14} style={{ color: INDIGO }} />
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "var(--muted-foreground)",
              opacity: 0.60,
              marginBottom: "4px",
            }}>
              Transform in
            </p>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "22px",
              letterSpacing: "0.04em",
              lineHeight: 1,
              color: INDIGO,
              fontVariantNumeric: "tabular-nums",
            }}>
              90 <span style={{ fontSize: "12px", letterSpacing: "0.16em", fontFamily: "var(--font-mono)", fontWeight: 700 }}>DAYS</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.75, duration: 0.5 }}
        className="absolute top-[38%] right-[1%] flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          background: "oklch(1 0 0 / 0.88)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${aa(0.15)}`,
          boxShadow: `0 2px 12px ${aa(0.10)}`,
        }}
      >
        <FiStar size={9} style={{ color: ACCENT }} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 800,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--foreground)",
          fontVariantNumeric: "tabular-nums",
        }}>
          4.8
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          fontSize: "8px",
          letterSpacing: "0.04em",
          color: "var(--muted-foreground)",
          opacity: 0.50,
        }}>
          /287
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────
function Background({ bgY }: { bgY: any }) {
  return (
    <>
      <div className="absolute inset-0 z-[1]"
        style={{ background: `radial-gradient(ellipse 60% 50% at 68% 40%, ${aa(0.07)} 0%, transparent 68%)` }} />
      <div className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: `linear-gradient(${aa(0.04)} 1px, transparent 1px), linear-gradient(90deg, ${aa(0.04)} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }} />
      <div className="absolute inset-0 z-[3] opacity-[0.032] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />
      <div className="absolute inset-0 z-[4]"
        style={{ background: `linear-gradient(100deg, var(--background) 0%, var(--background) 38%, oklch(0.975 0.016 72 / 0.82) 55%, transparent 72%)` }} />
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: `linear-gradient(180deg, oklch(0.975 0.016 72 / 0.35) 0%, transparent 18%, transparent 80%, var(--background) 100%)` }} />
      <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none" aria-hidden>
        {[0.64, 0.68, 0.73].map((x, i) => (
          <line key={i}
            x1={`${x * 100}%`} y1="0"
            x2={`${(x + 0.22) * 100}%`} y2="100%"
            stroke={ACCENT}
            strokeWidth={i === 1 ? "1" : "0.5"}
            strokeOpacity={i === 1 ? "0.12" : "0.05"} />
        ))}
      </svg>
      <motion.div className="absolute z-[4] top-[6%] right-[12%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ y: bgY, background: `radial-gradient(circle, ${aa(0.08)} 0%, transparent 70%)` }} />
      <div className="absolute z-[4] bottom-[12%] left-[8%] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ia(0.06)} 0%, transparent 70%)`, filter: "blur(48px)" }} />
    </>
  );
}

// ─── Particle ─────────────────────────────────────────────────────────────────
function Particle({ p, smoothX, smoothY, i }: { p: typeof PARTICLES[0]; smoothX: any; smoothY: any; i: number }) {
  const xRange: [number, number] = i % 2 === 0 ? [-28 * p.depth, 28 * p.depth] : [28 * p.depth, -28 * p.depth];
  const yRange: [number, number] = i % 3 === 0 ? [-18 * p.depth, 18 * p.depth] : [18 * p.depth, -18 * p.depth];
  const px = useTransform(smoothX, [-1, 1], xRange);
  const py = useTransform(smoothY, [-1, 1], yRange);
  return (
    <motion.div style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, x: px, y: py, rotate: p.r }}
      className="opacity-[0.05]">
      <div style={{
        width: p.size, height: p.size,
        borderRadius: p.type === "ci" ? "999px" : "3px",
        border: `1px solid ${ACCENT}`,
      }} />
    </motion.div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.6 }}
      className="absolute bottom-[148px] xs:bottom-[132px] sm:bottom-[124px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
    >
      <div className="relative w-[18px] h-[30px] rounded-full flex items-start justify-center pt-[5px]"
        style={{ background: "var(--card)", border: "1px solid var(--foreground)" }}
      >
        <motion.div className="w-[3px] h-[6px] rounded-full" style={{ background: ACCENT }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, 9, 0], opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full blur-[3px]"
          style={{ background: ACCENT }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: "8px",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: "var(--muted-foreground)",
      }}>
        scroll
      </span>
    </motion.div>
  );
}

// ─── Address Bar ──────────────────────────────────────────────────────────────
function AddressBar({ triggered }: { triggered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute bottom-0 left-0 right-0 z-20"
    >
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-8 py-3.5"
        style={{ background: "oklch(1 0 0 / 0.65)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.open("https://maps.app.goo.gl/uXpXJ4Gz5Z5Z5Z5Z5")}>
            <FiMapPin size={10} style={{ color: ACCENT }} />
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase group-hover:text-accent transition-colors">Basavanagudi, BLR</span>
          </div>
          <div className="h-2 w-px bg-foreground/10" />
          <div className="flex items-center gap-2">
            <FiClock size={10} style={{ color: INDIGO }} />
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase">06:00 – 22:00</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a href="https://instagram.com/shields_basavanagudi" target="_blank" className="flex items-center gap-2 group">
            <FiInstagram size={10} className="group-hover:text-accent transition-colors" />
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase group-hover:text-accent transition-colors">@shields_fitness</span>
          </a>
          <div className="h-2 w-px bg-foreground/10" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-green-600">Live Status: Open</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const bgY = useTransform(smoothScrollY, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (h: string) => {
    const el = document.querySelector(h);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden select-none"
      style={{ background: "var(--background)", position: "relative" }}
    >
      <Background bgY={bgY} />

      {PARTICLES.map((p, i) => (
        <Particle key={i} p={p} smoothX={mouseX} smoothY={mouseY} i={i} />
      ))}

      {/* ── Main Content Container ── */}
      <div className="relative z-10 flex-grow flex flex-col pt-24 pb-40 sm:pb-32 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 max-w-[1440px] mx-auto w-full">

          {/* ── Left Content ── */}
          <div className="flex-grow flex flex-col items-center lg:items-start text-center lg:text-left pt-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6 border border-foreground bg-accent/5"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Premium Fitness Experience</span>
            </motion.div>

            <Headline smoothX={mouseX} smoothY={mouseY} />

            <CTARow scrollTo={scrollTo} />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
              {stats.map((s, i) => (
                <StatCard key={i} stat={s} index={i} triggered={isInView} />
              ))}
            </div>
          </div>

          {/* ── Right Composition ── */}
          <RightPanel triggered={isInView} />
        </div>
      </div>

      <ScrollIndicator />
      <AddressBar triggered={isInView} />
    </motion.section>
  );
}