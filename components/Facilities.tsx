"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  GiWeightLiftingUp,
  GiWeight,
  GiRunningShoe,
  GiMuscleUp,
  GiPerson,
  GiStairsGoal,
  GiShield,
} from "react-icons/gi";
import { FiUsers, FiArrowUpRight, FiZap, FiX, FiCheckCircle } from "react-icons/fi";
import { TbBarbell } from "react-icons/tb";

// ─── Color system — matches Hero/Loader exactly ───────────────────────────────
const ACCENT = "oklch(0.72 0.18 48)";
const INDIGO = "oklch(0.50 0.150 280)";
const aa = (a: number) => `oklch(0.72 0.18 48 / ${a})`;
const ia = (a: number) => `oklch(0.50 0.150 280 / ${a})`;

// ─── Facility data ────────────────────────────────────────────────────────────
const facilities = [
  {
    icon: GiWeightLiftingUp,
    title: "Strength Zone",
    desc: "Elite power racks, Olympic barbells and calibrated plates for heavy performance.",
    longDesc: "Our Strength Zone is engineered for those who take powerlifting and strength training seriously. Every piece of equipment is chosen for its durability and precision, ensuring you can push your limits safely.",
    highlights: ["6 Competition Spec Racks", "Eleiko Competition Bars", "Calibrated Steel Plates", "Dedicated Deadlift Platforms"],
    tag: "Powerlifting",
    index: "01",
    col: "primary" as const,
    image: "/facilities/strength.png",
  },
  {
    icon: GiWeight,
    title: "Free Weights",
    desc: "Premium dumbbells up to 50kg, precision benches and wide training spans.",
    longDesc: "Experience the ultimate freedom in training with our extensive free weights collection. From beginners to pro athletes, our range caters to every level of hypertrophy and functional movement.",
    highlights: ["Dumbbells up to 40kg", "4 Adjustable Benches", "Kettlebell Series", "Specialty EZ Bars"],
    tag: "Dumbbells",
    index: "02",
    col: "indigo" as const,
    image: "/facilities/strength.png",
  },
  {
    icon: GiRunningShoe,
    title: "Cardio Lab",
    desc: "Industrial-grade treadmills and endurance machines with digital telemetry.",
    longDesc: "The Cardio Lab at Shield isn't just about running; it's about metabolic conditioning. Our machines provide real-time data to help you optimize your heart rate zones and endurance.",
    highlights: ["Slat-belt Treadmills", "AirBikes & Rowers", "Digital Performance Tracking"],
    tag: "Endurance",
    index: "03",
    col: "primary" as const,
    image: "/facilities/cardio.png",
  },
  {
    icon: GiPerson,
    title: "Elite Coaching",
    desc: "1-on-1 performance engineering with Bengaluru's most rigorous trainers.",
    longDesc: "Our coaching philosophy is built on science and discipline. Work with certified specialists who analyze your biomechanics and program your training for guaranteed results.",
    highlights: ["Biomechanical Analysis", "Personalized Programming", "Nutrition Integration", "Success Tracking"],
    tag: "1-on-1",
    index: "04",
    col: "indigo" as const,
    image: "/facilities/community.png",
  },
  {
    icon: FiUsers,
    title: "Power Groups",
    desc: "Sync your intensity in high-energy sessions engineered for group breakthroughs.",
    longDesc: "Group training at Shield is about collective energy and accountability. Our HIIT and functional classes are high-tempo, high-intensity, and designed for maximum calorie burn.",
    highlights: ["HIIT Circuits", "Functional Training", "Community Vibe", "Expert Facilitators"],
    tag: "Community",
    index: "05",
    col: "primary" as const,
    image: "/facilities/community.png",
  },
  {
    icon: GiMuscleUp,
    title: "Hypertrophy",
    desc: "Specialized cable stacks and isolators designed for maximum muscle engagement.",
    longDesc: "Target specific muscle groups with surgical precision. Our hypertrophy floor features the latest pin-loaded and plate-loaded machines focusing on isolation and growth.",
    highlights: ["Plate-loaded Equipment", "Dual Cable Stacks", "Precision Isolation", "Smooth Resistance Flow"],
    tag: "Machines",
    index: "06",
    col: "indigo" as const,
    image: "/facilities/machines.png",
  },
  {
    icon: GiStairsGoal,
    title: "Spacious Floor",
    desc: "Expansive 3rd-floor layout above Gandhi Bazaar with high-flow ventilation.",
    longDesc: "No more waiting for machines or feeling cramped. Our 3,500+ sq ft floor is intelligently designed to ensure optimal flow and space for every member's workout.",
    highlights: ["3,500+ Sq Ft Area", "Natural Light", "High Ceilings", "Smart Layout"],
    tag: "3rd Floor",
    index: "07",
    col: "primary" as const,
    image: "/facilities/community.png",
  },
  {
    icon: GiShield,
    title: "Elite Hygiene",
    desc: "Rigorous daily deep-cleaning and medical-grade sanitization protocols.",
    longDesc: "Your health is our priority. We maintain a medical-grade cleaning standard, with dedicated staff ensuring every surface is sanitized frequently throughout the day.",
    highlights: ["120-min Clean Cycles", "Medical Sanitizers", "Air Purifiers", "Towel Service Available"],
    tag: "Safe Space",
    index: "08",
    col: "indigo" as const,
    image: "/facilities/community.png",
  },
];

type Col = "primary" | "indigo";
const colorOf = (col: Col) => col === "primary" ? ACCENT : INDIGO;
const alphaOf = (col: Col) => col === "primary" ? aa : ia;

// ─── Modal Implementation ───────────────────────────────────────────────────
function FacilityModal({
  fac,
  onClose,
}: {
  fac: (typeof facilities)[0] | null;
  onClose: () => void;
}) {
  const alpha = fac ? alphaOf(fac.col) : aa;
  const color = fac ? colorOf(fac.col) : ACCENT;

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!fac) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-card border border-foreground rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Header Image/Pattern */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <Image
              src={fac.image}
              alt={fac.title}
              fill
              className="object-cover brightness-[1] contrast-[1.1]"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, var(--card) 100%), linear-gradient(to right, ${alpha(
                  0.3
                )} 0%, transparent 100%)`,
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-background/40 transition-colors z-20"
            >
              <FiX size={20} />
            </button>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: color,
                  background: "var(--card)",
                  border: `1px solid ${color}`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                }}
              >
                {fac.tag}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: alpha(0.1), border: "1px solid var(--foreground)" }}
              >
                <fac.icon size={24} style={{ color }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  lineHeight: 1,
                  color: "var(--foreground)",
                }}
              >
                {fac.title}
              </h2>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                lineHeight: 1.6,
                color: "var(--foreground)",
                marginBottom: "2rem",
              }}
            >
              {fac.longDesc}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fac.highlights?.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/5"
                >
                  <FiCheckCircle className="text-primary flex-shrink-0" size={18} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-foreground/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-foreground text-background font-mono font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Close Details
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── 3-D tilt card ────────────────────────────────────────────────────────────
function FacilityCard({
  fac,
  idx,
  triggered,
  onClick,
}: {
  fac: (typeof facilities)[0];
  idx: number;
  triggered: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22 });
  const sy = useSpring(my, { stiffness: 90, damping: 22 });
  const rotX = useTransform(sy, [-1, 1], [5, -5]);
  const rotY = useTransform(sx, [-1, 1], [-5, 5]);
  const glowX = useTransform(sx, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [-1, 1], ["0%", "100%"]);

  const alpha = alphaOf(fac.col);
  const color = colorOf(fac.col);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }, [mx, my]);

  const onLeave = useCallback(() => {
    mx.set(0); my.set(0);
    setHovered(false);
  }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.065, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.985 }}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* ── Base surface ── */}
        <div
          className="absolute inset-0 transition-all duration-400"
          style={{
            background: "var(--card)",
            border: "1px solid var(--foreground)",
            borderRadius: "1rem",
            boxShadow: hovered
              ? `0 16px 48px ${alpha(0.14)}, 0 2px 8px oklch(0 0 0 / 0.06)`
              : "0 2px 12px oklch(0 0 0 / 0.05)",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
          }}
        />

        {/* ── Image backdrop ── */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={fac.image}
              alt=""
              fill
              aria-hidden
              className="object-cover grayscale brightness-50 contrast-110"
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ opacity: 0.09 }}
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(145deg, ${alpha(0.055)} 0%, transparent 50%)` }}
          />
        </div>

        {/* ── Cursor spotlight ── */}
        <motion.div
          className="absolute w-[240px] h-[240px] rounded-full pointer-events-none hidden sm:block"
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, ${alpha(0.16)} 0%, transparent 68%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col h-full p-3 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <span style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: alpha(0.55),
              lineHeight: 1,
            }}>
              Zone {fac.index}
            </span>

            <span style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1,
              color: color,
              background: alpha(0.10),
              border: "1px solid var(--foreground)",
              borderRadius: "6px",
              padding: "4px 9px",
            }}>
              {fac.tag}
            </span>
          </div>

          <div
            className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center mb-4"
            style={{
              borderRadius: "10px",
              background: alpha(0.08),
              border: "1px solid var(--foreground)",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            <div
              className="absolute inset-0 blur-lg opacity-20"
              style={{ background: color, borderRadius: "inherit" }}
            />
            <fac.icon size={18} style={{ color, position: "relative" }} />
          </div>

          <div className="flex-1 flex flex-col">
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(0.88rem, 1.8vw, 1.1rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "8px",
            }}>
              {fac.title}
            </h3>

            <p style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(11px, 1.2vw, 13px)",
              lineHeight: 1.65,
              color: hovered ? "var(--foreground)" : "var(--muted-foreground)",
              transition: "color 0.3s ease",
              flex: 1,
            }}>
              {fac.desc}
            </p>
          </div>

          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={{
              borderTop: "1px solid var(--foreground)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "9px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: color,
            }}>
              Explore
            </span>
            <FiArrowUpRight size={13} style={{ color, flexShrink: 0 }} />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-350"
          style={{
            boxShadow: `inset 0 0 0 1px ${alpha(0.35)}`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Facilities() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const cardDrift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedFacility, setSelectedFacility] = useState<(typeof facilities)[0] | null>(null);

  const scrollToMembership = () => {
    const el = document.querySelector("#membership") as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedFacility) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedFacility]);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: "var(--background)" }}
    >
      <AnimatePresence>
        {selectedFacility && (
          <FacilityModal
            fac={selectedFacility}
            onClose={() => setSelectedFacility(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${aa(0.05)} 1px, transparent 1px), linear-gradient(90deg, ${aa(0.05)} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          y: bgY
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 14%, transparent 86%, var(--background) 100%)",
        }} />
        <motion.div className="absolute top-[12%] left-[5%] w-[520px] h-[520px] rounded-full" style={{
          background: `radial-gradient(circle, ${aa(0.12)} 0%, transparent 68%)`,
          filter: "blur(90px)",
          y: blob1Y
        }} />
        <motion.div className="absolute bottom-[12%] right-[5%] w-[400px] h-[400px] rounded-full" style={{
          background: `radial-gradient(circle, ${ia(0.10)} 0%, transparent 68%)`,
          filter: "blur(80px)",
          y: blob2Y
        }} />
        <div className="absolute inset-0 opacity-[0.028] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: -16 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-8 flex-shrink-0" style={{ background: ACCENT }} />
                <TbBarbell size={12} style={{ color: ACCENT, flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  lineHeight: 1,
                }}>
                  Facility Dossier
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "108%", skewY: 3 }}
                  animate={isInView ? { y: "0%", skewY: 0 } : {}}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: "clamp(2rem, 7.5vw, 5rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.92,
                    color: "var(--foreground)",
                  }}
                >
                  Engineered for{" "}
                  <span style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${ACCENT}`,
                    filter: `drop-shadow(0 0 18px ${aa(0.15)})`,
                  }}>
                    Intensity
                  </span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.55 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  lineHeight: 1.7,
                  color: "var(--muted-foreground)",
                  marginTop: "16px",
                  maxWidth: "480px",
                }}
              >
                Eight dedicated zones — each calibrated to a specific training discipline.
                All fully accessible to every Shield member.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.30, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 lg:w-[300px]"
            >
              <div className="rounded-2xl overflow-hidden" style={{
                background: "var(--card)",
                border: "1px solid var(--foreground)",
                boxShadow: `0 4px 24px ${aa(0.08)}`,
              }}>
                <div className="p-6 flex items-center gap-5">
                  <div>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "clamp(2.8rem, 5vw, 3.8rem)",
                      lineHeight: 1,
                      color: ACCENT,
                      display: "block",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      08
                    </span>
                  </div>
                  <div className="w-px self-stretch" style={{ background: aa(0.15) }} />
                  <div>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      color: "var(--foreground)",
                      marginBottom: "6px",
                    }}>
                      Functional Zones
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: 1.6,
                      color: "var(--muted-foreground)",
                    }}>
                      Integrated performance lab for total physical optimization.
                    </p>
                  </div>
                </div>
                <div className="h-[2px] w-full" style={{
                  background: `linear-gradient(90deg, ${ACCENT}, ${INDIGO}, transparent)`,
                }} />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          style={{ y: cardDrift }}
        >
          {facilities.map((fac, i) => (
            <FacilityCard
              key={fac.title}
              fac={fac}
              idx={i}
              triggered={isInView}
              onClick={() => setSelectedFacility(fac)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 rounded-2xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--foreground)",
            boxShadow: `0 4px 32px ${aa(0.07)}`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: aa(0.08),
                border: "1px solid var(--foreground)",
              }}>
                <div className="absolute inset-0 rounded-xl blur-xl opacity-20" style={{ background: ACCENT }} />
                <GiShield size={22} style={{ color: ACCENT, position: "relative" }} />
              </div>

              <div>
                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.15,
                  color: "var(--foreground)",
                  marginBottom: "6px",
                }}>
                  Access Protocol
                </h4>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1.2vw, 13px)",
                  lineHeight: 1.65,
                  color: "var(--muted-foreground)",
                  maxWidth: "400px",
                }}>
                  Every zone is fully accessible to all Shield members.
                  Sanitization cycles run every 120 minutes.
                </p>
              </div>
            </div>

            <motion.button
              onClick={scrollToMembership}
              whileHover={{ scale: 1.04, boxShadow: `0 8px 32px ${aa(0.40)}` }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto justify-center"
              style={{
                background: ACCENT,
                color: "var(--primary-foreground, oklch(0.15 0.02 60))",
                borderRadius: "10px",
                padding: "13px 24px",
                fontFamily: "var(--font-mono)",
                fontWeight: 800,
                fontSize: "11px",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                lineHeight: 1,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 4px 20px ${aa(0.28)}`,
              }}
            >
              <FiZap size={13} />
              Analyze Plans
              <FiArrowUpRight size={12} />
            </motion.button>
          </div>

          <div className="h-[2px]" style={{
            background: `linear-gradient(90deg, ${ACCENT}, ${INDIGO}, transparent)`,
          }} />
        </motion.div>
      </div>
    </section>
  );
}
