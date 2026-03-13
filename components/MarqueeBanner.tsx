"use client";

import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";
import { RiFlashlightLine } from "react-icons/ri";
import { TbBarbell, TbYoga, TbRun, TbFlame, TbHeartbeat, TbTrophy } from "react-icons/tb";
import { FiAward, FiShield, FiUsers, FiTrendingUp, FiZap, FiStar } from "react-icons/fi";

// ─── Data ────────────────────────────────────────────────────────────────────

export const tickerRow1 = [
  { icon: TbBarbell, label: "Strength Training" },
  { icon: TbRun, label: "Cardio Zone" },
  { icon: RiFlashlightLine, label: "HIIT Classes" },
  { icon: GiWeightLiftingUp, label: "Free Weights" },
  { icon: TbYoga, label: "Personal Training" },
  { icon: TbFlame, label: "Fat Burn Programs" },
  { icon: GiMuscleUp, label: "Muscle Building" },
  { icon: MdLocationOn, label: "Basavanagudi" },
];

export const tickerRow2 = [
  { icon: FiAward, label: "4.8 ★ Google Rating" },
  { icon: TbHeartbeat, label: "500+ Active Members" },
  { icon: FiShield, label: "Certified Trainers" },
  { icon: TbBarbell, label: "State-of-the-Art Equipment" },
  { icon: TbRun, label: "6AM – 10PM Daily" },
  { icon: GiMuscleUp, label: "Elite Atmosphere" },
  { icon: MdLocationOn, label: "Gandhi Bazaar, BLR" },
  { icon: RiFlashlightLine, label: "No Hidden Fees" },
];

export const tickerRow3 = [
  { label: "Strength Training", icon: TbBarbell },
  { label: "HIIT Classes", icon: TbFlame },
  { label: "Personal Training", icon: FiUsers },
  { label: "Powerlifting", icon: TbBarbell },
  { label: "Cardio Zone", icon: FiTrendingUp },
  { label: "Nutrition Guidance", icon: FiZap },
  { label: "Functional Fitness", icon: FiAward },
  { label: "Yoga & Recovery", icon: FiStar },
];

// ─── Marquee Row ─────────────────────────────────────────────────────────────

export function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
  dark = false,
}: {
  items: { icon: React.ElementType; label: string }[];
  reverse?: boolean;
  speed?: number;
  dark?: boolean;
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden relative py-2.5"
      style={{
        background: dark ? "oklch(0.72 0.18 48)" : "oklch(0.96 0.02 48 / 0.6)",
        borderTop: dark ? "none" : "1px solid var(--foreground)",
        borderBottom: dark ? "none" : "1px solid var(--foreground)",
      }}
    >
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(90deg, oklch(0.72 0.18 48), transparent)"
            : "linear-gradient(90deg, var(--background), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(270deg, oklch(0.72 0.18 48), transparent)"
            : "linear-gradient(270deg, var(--background), transparent)",
        }}
      />

      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-2 font-mono font-bold text-[10px] sm:text-[11px] tracking-[3px] uppercase px-5"
              style={{
                color: dark ? "oklch(1 0 0 / 0.9)" : "oklch(0.72 0.18 48)",
              }}
            >
              <Icon
                size={13}
                style={{ color: dark ? "oklch(1 0 0 / 0.6)" : "oklch(0.72 0.18 48 / 0.6)" }}
              />
              {item.label}
              <span
                className="mx-1"
                style={{ color: dark ? "oklch(1 0 0 / 0.25)" : "oklch(0.72 0.18 48 / 0.3)" }}
              >
                ·
              </span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Composed Export ─────────────────────────────────────────────────────────

export default function MarqueeBanners() {
  return (
    <div className="w-full">
      {/* Primary orange ticker */}
      <MarqueeRow items={tickerRow1} dark speed={32} />
      {/* Secondary light ticker — reverse direction */}
      <MarqueeRow items={tickerRow2} reverse speed={40} />
    </div>
  );
}