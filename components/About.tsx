"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FiCheck, FiArrowUpRight, FiStar } from "react-icons/fi";
import { GiShield } from "react-icons/gi";

/* ─── animated counter ─── */
function CountUp({
  target,
  suffix = "",
  duration = 1.6,
  triggered,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  triggered: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const ctrl = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [triggered, target, duration]);
  return (
    <>
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

/* ─── tilt card wrapper ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(x, [-1, 1], [-6, 6]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── feature pill ─── */
function FeaturePill({ text, index, triggered }: { text: string; index: number; triggered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, scale: 0.95 }}
      animate={triggered ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay: 0.35 + index * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center gap-2.5 py-2 px-3 rounded-sm border transition-all duration-300 cursor-default"
      style={{
        background: "var(--card)",
        border: "1px solid var(--foreground)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.18 48 / 0.3)";
        (e.currentTarget as HTMLElement).style.background = "oklch(0.72 0.18 48 / 0.04)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.12 0.026 40 / 0.07)";
        (e.currentTarget as HTMLElement).style.background = "var(--card)";
      }}
    >
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
        style={{ background: "oklch(0.72 0.18 48 / 0.12)", border: "1px solid var(--foreground)" }}
      >
        <FiCheck size={9} style={{ color: "var(--primary)" }} />
      </span>
      <span className="text-xs font-body leading-none transition-colors duration-300" style={{ color: "var(--muted-foreground)" }}>
        {text}
      </span>
    </motion.div>
  );
}

/* ─── milestone card ─── */
const milestones = [
  { raw: 287, suffix: "+", label: "Happy Members", sublabel: "& counting" },
  { raw: null, hasStar: true, label: "Google Rating", sublabel: "4.8 / 5.0", display: "4.8" },
  { raw: 7, suffix: "+", label: "Expert Trainers", sublabel: "Certified" },
  { raw: 16, suffix: "hrs", label: "Daily Access", sublabel: "6 AM – 10 PM" },
];

function MilestoneCard({
  m,
  index,
  triggered,
}: {
  m: (typeof milestones)[0];
  index: number;
  triggered: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7 + index * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative text-center py-5 px-3 rounded-sm border transition-all duration-300 overflow-hidden cursor-default"
      style={{ background: "var(--card)", border: "1px solid var(--foreground)" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.18 48 / 0.22)";
        (e.currentTarget as HTMLElement).style.background = "oklch(0.72 0.18 48 / 0.04)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.12 0.026 40 / 0.06)";
        (e.currentTarget as HTMLElement).style.background = "var(--card)";
      }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, oklch(0.72 0.18 48 / 0.06), transparent)" }}
      />
      <div className="relative">
        <div
          className="font-display text-3xl lg:text-4xl leading-none mb-1 font-normal tracking-tight"
          style={{
            background: "linear-gradient(135deg, var(--foreground) 30%, var(--primary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {m.raw !== null ? (
            <CountUp target={m.raw} suffix={m.suffix} triggered={triggered} />
          ) : (
            <div className="flex items-center justify-center gap-1">
              <span>{m.display}</span>
              {m.hasStar && <FiStar size={18} style={{ color: "var(--primary)" }} />}
            </div>
          )}
        </div>
        <div style={{ color: "var(--muted-foreground)" }}>
          {m.label}
        </div>
        <div style={{ color: "var(--muted-foreground)" }}>{m.sublabel}</div>
      </div>
    </motion.div>
  );
}

const features = [
  "Motivating high-energy environment",
  "Well-maintained, modern equipment",
  "Certified and supportive trainers",
  "Suitable for all fitness levels",
  "Beginner-friendly programs",
  "Advanced athlete training",
  "Clean & hygienic facility",
  "Flexible membership plans",
];

/* ══════════════════ MAIN COMPONENT ══════════════════ */
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── background textures ── */}
      {/* diagonal stripe */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, var(--primary) 0px, var(--primary) 1px, transparent 0px, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* right-side glow */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 40%, oklch(0.72 0.18 48 / 0.07) 0%, transparent 65%)" }}
      />
      {/* left dark shadow */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" />

      {/* ── section label ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, var(--primary), oklch(0.72 0.18 48 / 0.1), transparent)" }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          {/* ══ CONTENT ══ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col items-center"
          >
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-[2px]" style={{ background: "var(--primary)" }} />
                <div className="w-2 h-[2px]" style={{ background: "oklch(0.72 0.18 48 / 0.4)" }} />
              </div>
              <span className="text-[10px] tracking-[5px] uppercase font-mono font-bold" style={{ color: "var(--primary)" }}>
                About Us
              </span>
            </motion.div>

            {/* headline */}
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "var(--foreground)" }}
                className="text-3xl xs:text-4xl lg:text-[64px] font-display leading-[0.92]"
              >
                MORE THAN
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-7">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl xs:text-4xl lg:text-[64px] font-display leading-[0.92]"
                style={{
                  WebkitTextStroke: "1px var(--primary)",
                  color: "transparent",
                  filter: "drop-shadow(0 0 16px oklch(0.72 0.18 48 / 0.1))",
                }}
              >
                JUST A GYM
              </motion.h2>
            </div>

            {/* body copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.42 }}
              className="text-[15px] leading-[1.75] mb-3 font-body max-w-2xl text-center"
              style={{ color: "var(--muted-foreground)" }}
            >
              Shield&apos;s Fitness Club Basavanagudi is Bengaluru&apos;s most trusted premium fitness
              destination, built for those who are{" "}
              <span style={{ color: "var(--foreground)" }} className="font-semibold">serious about transformation.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-[14px] leading-[1.75] mb-8 font-body max-w-2xl text-center"
              style={{ color: "var(--muted-foreground)" }}
            >
              Located in the heart of Basavanagudi, we combine{" "}
              <span style={{ color: "oklch(0.25 0.026 40 / 0.8)" }}>state-of-the-art equipment</span>, expert
              coaching, and an electric atmosphere — whether you&apos;re a first-timer or
              competing at the elite level.
            </motion.p>

            {/* feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-9 w-full max-w-2xl">
              {features.map((feat, i) => (
                <FeaturePill key={feat} text={feat} index={i} triggered={isInView} />
              ))}
            </div>

            {/* divider */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
              <motion.button
                onClick={() => scrollTo("#membership")}
                className="group relative overflow-hidden flex items-center gap-2.5 px-7 py-3 font-bold text-xs tracking-[3px] uppercase font-mono rounded-sm"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  boxShadow: "0 6px 24px oklch(0.72 0.18 48 / 0.3)",
                }}
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.975 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-10 h-full skew-x-[25deg] -translate-x-full"
                  style={{ background: "oklch(1 0 0 / 0.18)" }}
                  animate={{ x: ["-120%", "400%"] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 4 }}
                />
                Start Today
                <FiArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </motion.button>

              <button
                onClick={() => scrollTo("#contact")}
                className="text-xs font-mono tracking-[2px] uppercase transition-colors duration-300 flex items-center gap-1.5 px-4"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
              >
                Free Trial →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}