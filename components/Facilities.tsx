"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
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
import { FiUsers, FiArrowUpRight } from "react-icons/fi";

/* ─── facility data ─── */
const facilities = [
  {
    icon: GiWeightLiftingUp,
    title: "Strength Zone",
    desc: "Elite power racks, Olympic barbells and calibrated plates for heavy performance.",
    tag: "Powerlifting",
    index: "01",
    accent: "primary",
    image: "/facilities/strength.png",
  },
  {
    icon: GiWeight,
    title: "Free Weights",
    desc: "Premium dumbbells up to 50kg, precision benches and wide training spans.",
    tag: "Dumbbells",
    index: "02",
    accent: "indigo",
    image: "/facilities/strength.png",
  },
  {
    icon: GiRunningShoe,
    title: "Cardio Lab",
    desc: "Industrial-grade treadmills and endurance machines with digital telemetry.",
    tag: "Endurance",
    index: "03",
    accent: "primary",
    image: "/facilities/cardio.png",
  },
  {
    icon: GiPerson,
    title: "Elite Coaching",
    desc: "1-on-1 performance engineering with Bengaluru's most rigorous trainers.",
    tag: "1-on-1",
    index: "04",
    accent: "indigo",
    image: "/facilities/community.png",
  },
  {
    icon: FiUsers,
    title: "Power Groups",
    desc: "Sync your intensity in high-energy sessions engineered for group breakthroughs.",
    tag: "Community",
    index: "05",
    accent: "primary",
    image: "/facilities/community.png",
  },
  {
    icon: GiMuscleUp,
    title: "Hypertrophy",
    desc: "Specialized cable stacks and isolators designed for maximum muscle engagement.",
    tag: "Machines",
    index: "06",
    accent: "indigo",
    image: "/facilities/machines.png",
  },
  {
    icon: GiStairsGoal,
    title: "Spacious Floor",
    desc: "Expansive 3rd-floor layout above Gandhi Bazaar with high-flow ventilation.",
    tag: "3rd Floor",
    index: "07",
    accent: "primary",
    image: "/facilities/community.png",
  },
  {
    icon: GiShield,
    title: "Elite Hygiene",
    desc: "Rigorous daily deep-cleaning and medical-grade sanitization protocols.",
    tag: "Safe Space",
    index: "08",
    accent: "indigo",
    image: "/facilities/community.png",
  },
];

/* accent CSS vars per slot */
const accentColor = {
  primary: "var(--primary)",
  indigo: "oklch(0.50 0.150 280)",
};
const accentAlpha = {
  primary: (a: number) => `oklch(0.72 0.18 48 / ${a})`,
  indigo: (a: number) => `oklch(0.50 0.150 280 / ${a})`,
};

/* ─── 3-D tilt card ─── */
function FacilityCard({
  fac,
  index,
  triggered,
}: {
  fac: (typeof facilities)[0];
  index: number;
  triggered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotX = useTransform(sy, [-1, 1], [6, -6]);
  const rotY = useTransform(sx, [-1, 1], [-6, 6]);
  const glowX = useTransform(sx, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [-1, 1], ["0%", "100%"]);
  const imgScale = useSpring(hovered ? 1.12 : 1, { stiffness: 120, damping: 22 });

  const col = fac.accent as "primary" | "indigo";
  const alpha = accentAlpha[col];
  const color = accentColor[col];

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative h-full min-h-[200px] sm:min-h-[290px] overflow-hidden cursor-default"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          background: "var(--card)",
          border: `1px solid ${alpha(0.12)}`,
          borderRadius: "1rem",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          boxShadow: hovered
            ? `0 20px 52px ${alpha(0.12)}, 0 0 0 1px ${alpha(0.25)}, inset 0 1px 0 oklch(1 0 0 / 0.06)`
            : "0 2px 16px oklch(0 0 0 / 0.06)",
        }}
      >
        {/* Stadium image backdrop */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ scale: imgScale, height: "100%", width: "100%" }}>
            <Image
              src={fac.image}
              alt={fac.title}
              fill
              className="object-cover opacity-[0.10] filter grayscale brightness-50 contrast-125"
            />
          </motion.div>
          {/* gentle top-left highlight */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(145deg, ${alpha(0.06)} 0%, transparent 55%)`,
            }}
          />
        </div>

        {/* Mouse-following spotlight */}
        <motion.div
          className="absolute w-[280px] h-[280px] rounded-full pointer-events-none z-[1]"
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle at center, ${alpha(0.18)} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 p-5 sm:p-6 flex flex-col h-full"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Header row — index + tag */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <span
              className="font-mono text-[9px] tracking-[4px] uppercase"
              style={{ color: alpha(0.5) }}
            >
              Zone {fac.index}
            </span>
            <span
              className="font-mono text-[8px] font-black tracking-[3px] uppercase px-2 py-1"
              style={{
                background: alpha(0.10),
                border: `1px solid ${alpha(0.28)}`,
                color: color,
                borderRadius: "4px",
              }}
            >
              {fac.tag}
            </span>
          </div>

          {/* Icon */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-500"
            style={{ borderRadius: "0.75rem" }}
          >
            <div
              className="absolute inset-0 opacity-20 blur-md"
              style={{ background: color, borderRadius: "inherit" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: alpha(0.08),
                border: `1px solid ${alpha(0.25)}`,
                borderRadius: "inherit",
              }}
            />
            <fac.icon
              size={20}
              style={{ color }}
              className="relative z-10"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3
              className="font-display font-black italic uppercase leading-none mb-2 sm:mb-3"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                color: "var(--foreground)",
                letterSpacing: "0.04em",
              }}
            >
              {fac.title}
            </h3>
            <p
              className="text-[11px] sm:text-[13px] leading-relaxed transition-colors duration-300"
              style={{
                color: hovered ? "var(--foreground)" : "var(--muted-foreground)",
                fontFamily: "var(--font-body)",
              }}
            >
              {fac.desc}
            </p>
          </div>

          {/* Hover footer */}
          <div
            className="mt-5 flex items-center justify-between transition-all duration-500"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${alpha(0.5)}, transparent)`,
              }}
            />
            <FiArrowUpRight size={14} style={{ color, marginLeft: "10px" }} />
          </div>
        </div>

        {/* Inset border on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            borderRadius: "1rem",
            border: `1px solid ${alpha(0.4)}`,
            boxShadow: `inset 0 0 18px ${alpha(0.08)}`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════ MAIN ══════════════════ */
export default function Facilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="facilities"
      ref={ref}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            opacity: 0.4,
          }}
        />
        {/* Vignette top/bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 80%, var(--background) 100%)",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-[15%] left-[8%] w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.18 48 / 0.18), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[8%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.50 0.150 280 / 0.14), transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-16 sm:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-4 mb-6"
              >
                <div
                  className="h-px w-10"
                  style={{ background: "oklch(0.72 0.18 48)" }}
                />
                <span
                  className="font-mono font-black text-[10px] tracking-[6px] uppercase"
                  style={{ color: "oklch(0.72 0.18 48)" }}
                >
                  Facility Dossier
                </span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black italic leading-none uppercase"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5.5rem)",
                    color: "var(--foreground)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Engineered for
                  <br />
                  <span
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px var(--primary)",
                      filter: "drop-shadow(0 0 20px oklch(0.72 0.18 48 / 0.15))",
                    }}
                  >
                    Intensity
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="lg:w-[340px]"
            >
              <div
                className="p-1 rounded-2xl"
                style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                }}
              >
                <div
                  className="p-6 rounded-[14px] flex items-center gap-5"
                  style={{
                    background: "oklch(1 0 0 / 0.02)",
                    border: "1px solid oklch(1 0 0 / 0.05)",
                  }}
                >
                  <div
                    className="font-display font-black italic leading-none shrink-0"
                    style={{
                      fontSize: "3.5rem",
                      color: "oklch(0.72 0.18 48)",
                    }}
                  >
                    08
                  </div>
                  <div
                    className="w-px h-12 shrink-0"
                    style={{ background: "oklch(1 0 0 / 0.10)" }}
                  />
                  <div>
                    <p
                      className="font-mono text-[9px] tracking-[3px] uppercase mb-1"
                      style={{ color: "oklch(1 0 0 / 0.4)" }}
                    >
                      Functional Zones
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(1 0 0 / 0.6)", fontFamily: "var(--font-body)" }}
                    >
                      Integrated performance lab engineered for total physical optimization.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Facility Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {facilities.map((fac, i) => (
            <FacilityCard key={fac.title} fac={fac} index={i} triggered={isInView} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="mt-16 sm:mt-24"
          style={{
            background: "oklch(1 0 0 / 0.02)",
            border: "1px solid oklch(1 0 0 / 0.08)",
            borderRadius: "1.5rem",
            padding: "1px",
          }}
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-10"
            style={{
              borderRadius: "calc(1.5rem - 1px)",
              background: "linear-gradient(135deg, oklch(1 0 0 / 0.03) 0%, transparent 100%)",
            }}
          >
            <div className="flex items-center gap-6">
              {/* Shield icon box */}
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "oklch(0.72 0.18 48 / 0.08)",
                  border: "1px solid oklch(0.72 0.18 48 / 0.2)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-30 blur-xl animate-pulse"
                  style={{
                    background: "oklch(0.72 0.18 48)",
                    borderRadius: "inherit",
                  }}
                />
                <GiShield size={30} style={{ color: "oklch(0.72 0.18 48)", position: "relative" }} />
              </div>
              <div>
                <h4
                  className="font-display font-black italic uppercase mb-1"
                  style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                    color: "var(--primary-foreground)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Access Protocol
                </h4>
                <p
                  className="text-sm max-w-md"
                  style={{ color: "oklch(1 0 0 / 0.5)", fontFamily: "var(--font-body)" }}
                >
                  Every facility zone is fully accessible to all Shield members. Comprehensive sanitization cycles every 120 minutes.
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                const el = document.querySelector("#membership");
                if (el)
                  window.scrollTo({
                    top: (el as HTMLElement).offsetTop - 80,
                    behavior: "smooth",
                  });
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 28px oklch(0.72 0.18 48 / 0.45)",
              }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary px-8 py-4 shrink-0"
              style={{ borderRadius: "0.75rem" }}
            >
              Analyze Plans
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}