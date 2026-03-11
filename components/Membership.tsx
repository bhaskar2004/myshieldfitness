"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiCheck,
  FiZap,
  FiArrowRight,
  FiPhone,
  FiX,
  FiShield,
  FiClock,
} from "react-icons/fi";
import { MdGroups, MdFitnessCenter } from "react-icons/md";
import {
  TbBarbell,
  TbFlame,
  TbCrown,
  TbBolt,
  TbSparkles,
} from "react-icons/tb";
import { IoSparkles } from "react-icons/io5";
import { RiVipCrownFill, RiLightbulbFlashLine } from "react-icons/ri";
import { GiMedal, GiWeightLiftingUp } from "react-icons/gi";
import { FiChevronDown } from "react-icons/fi";

// ─── Palette (oklch shorthand, matching --primary in globals.css) ───────────────
const GREEN = "oklch(0.72 0.18 48)";
const GREEN_A = (a: number) => `oklch(0.72 0.18 48 / ${a})`;
const INDIGO_A = (a: number) => `oklch(0.50 0.150 280 / ${a})`;
const AMBER_A = (a: number) => `oklch(0.80 0.150 85 / ${a})`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "basic",
    name: "Basic",
    period: "1 Month",
    price: "2,000",
    perMonth: "2,000",
    icon: TbBarbell,
    color: (a: number) => `oklch(0.65 0.020 250 / ${a})`,
    solidColor: "oklch(0.65 0.020 250)",
    tag: null,
    popular: false,
    features: [
      { text: "Full gym access", ok: true },
      { text: "Locker room access", ok: true },
      { text: "Trainer guidance", ok: true },
      { text: "Basic workout plan", ok: true },
      { text: "Group sessions", ok: true },
      { text: "Nutrition basics", ok: false },
      { text: "Progress tracking", ok: false },
      { text: "Priority booking", ok: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    period: "3 Months",
    price: "5,000",
    perMonth: "1,667",
    icon: TbBolt,
    color: INDIGO_A,
    solidColor: "oklch(0.50 0.150 280)",
    tag: "Save 16%",
    popular: false,
    features: [
      { text: "Full gym access", ok: true },
      { text: "Locker room access", ok: true },
      { text: "Trainer guidance", ok: true },
      { text: "Custom workout plan", ok: true },
      { text: "Group sessions", ok: true },
      { text: "Nutrition basics", ok: true },
      { text: "Progress tracking", ok: true },
      { text: "Priority booking", ok: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    period: "6 Months",
    price: "7,000",
    perMonth: "1,167",
    icon: TbFlame,
    color: GREEN_A,
    solidColor: GREEN,
    tag: "Most Popular",
    popular: true,
    features: [
      { text: "Full gym access", ok: true },
      { text: "Locker room access", ok: true },
      { text: "Dedicated trainer", ok: true },
      { text: "Custom workout plan", ok: true },
      { text: "Group + solo sessions", ok: true },
      { text: "Nutrition consultation", ok: true },
      { text: "Monthly assessments", ok: true },
      { text: "Priority booking", ok: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    period: "12 Months",
    price: "9,999",
    perMonth: "833",
    icon: TbCrown,
    color: AMBER_A,
    solidColor: "oklch(0.80 0.150 85)",
    tag: "Best Value",
    popular: false,
    features: [
      { text: "Full gym access", ok: true },
      { text: "Personal trainer", ok: true },
      { text: "Advanced workout plan", ok: true },
      { text: "All equipment access", ok: true },
      { text: "Unlimited sessions", ok: true },
      { text: "Full nutrition plan", ok: true },
      { text: "Weekly assessments", ok: true },
      { text: "Guest passes (2/month)", ok: true },
    ],
  },
];

const perks = [
  {
    icon: FiShield,
    label: "No Hidden Fees",
    desc: "What you see is what you pay",
    color: GREEN_A,
    solid: GREEN,
  },
  {
    icon: GiMedal,
    label: "Certified Trainers",
    desc: "Nationally accredited coaches",
    color: INDIGO_A,
    solid: "oklch(0.50 0.150 280)",
  },
  {
    icon: FiClock,
    label: "Open 5AM – 11PM",
    desc: "7 days, 365 days a year",
    color: GREEN_A,
    solid: GREEN,
  },
  {
    icon: MdGroups,
    label: "500+ Members",
    desc: "A thriving fitness community",
    color: INDIGO_A,
    solid: "oklch(0.50 0.150 280)",
  },
];

const compareItems = [
  {
    icon: GiWeightLiftingUp,
    title: "Just starting out?",
    rec: "Basic or Standard",
    color: INDIGO_A,
    solid: "oklch(0.50 0.150 280)",
    desc: "Build the habit first, upgrade later.",
  },
  {
    icon: TbFlame,
    title: "Serious about results?",
    rec: "Premium — 6 Months",
    color: GREEN_A,
    solid: GREEN,
    desc: "Best balance of price and features.",
  },
  {
    icon: RiVipCrownFill,
    title: "All-in commitment?",
    rec: "Elite — 12 Months",
    color: AMBER_A,
    solid: "oklch(0.80 0.150 85)",
    desc: "Maximum savings + everything included.",
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function scrollToContact() {
  const el = document.querySelector("#contact") as HTMLElement | null;
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

// ─── Perks Strip ──────────────────────────────────────────────────────────────

function PerksStrip({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
    >
      {perks.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.48 + i * 0.07 }}
            className="group flex items-center gap-3 px-4 py-4 cursor-default transition-all duration-300"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.875rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = p.color(0.35);
              (e.currentTarget as HTMLElement).style.background = p.color(0.06);
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${p.color(0.10)}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--card)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: p.color(0.14) }}
            >
              <Icon style={{ color: p.solid }} size={16} />
            </div>
            <div className="min-w-0">
              <p
                className="font-mono font-bold text-[11px] truncate"
                style={{ color: "var(--foreground)" }}
              >
                {p.label}
              </p>
              <p
                className="font-mono text-[9px] tracking-wide mt-0.5 truncate"
                style={{ color: "var(--muted-foreground)" }}
              >
                {p.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Promo Banner ─────────────────────────────────────────────────────────────

function PromoBanner({ isInView }: { isInView: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          exit={{
            opacity: 0,
            height: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          transition={{ delay: 0.32 }}
          className="group relative flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 mb-8 overflow-hidden transition-colors duration-300"
          style={{
            border: `1px solid ${GREEN_A(0.22)}`,
            background: `linear-gradient(90deg, ${GREEN_A(0.07)}, ${GREEN_A(0.03)})`,
            borderRadius: "0.875rem",
          }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
            style={{ background: GREEN }}
          />
          {/* Hover sweep */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${GREEN_A(0.10)}, transparent 60%)`,
            }}
          />

          <div
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: GREEN_A(0.16) }}
          >
            <IoSparkles style={{ color: GREEN }} size={14} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs leading-snug" style={{ color: "var(--foreground)" }}>
              <span className="font-bold" style={{ color: GREEN }}>
                LIMITED OFFER:{" "}
              </span>
              First month free on annual Elite membership · Use code{" "}
              <span
                className="font-bold tracking-widest px-1.5 py-0.5 rounded-md text-[10px]"
                style={{
                  background: GREEN_A(0.12),
                  border: `1px solid ${GREEN_A(0.25)}`,
                  color: GREEN,
                }}
              >
                SHIELDS2025
              </span>
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="flex-shrink-0 flex items-center gap-1.5 font-mono font-bold text-[10px] tracking-widest uppercase transition-all hover:gap-2.5"
            style={{ color: GREEN }}
          >
            <span className="hidden sm:inline">Claim</span>
            <FiArrowRight size={11} />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 p-1 transition-colors rounded-lg hover:bg-black/5"
            style={{ color: "var(--muted-foreground)" }}
          >
            <FiX size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  index,
  isInView,
  expanded,
  onToggle,
}: {
  plan: (typeof plans)[0];
  index: number;
  isInView: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const PlanIcon = plan.icon;
  const included = plan.features.filter((f) => f.ok);
  const excluded = plan.features.filter((f) => !f.ok);

  // ── Mobile slim card ──────────────────────────────────────────────────────
  const MobileCard = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="sm:hidden relative overflow-hidden"
      style={{
        borderRadius: "0.875rem",
        border: plan.popular ? `1px solid ${GREEN_A(0.45)}` : "1px solid var(--border)",
        background: plan.popular
          ? `linear-gradient(135deg, var(--contact-bg) 0%, oklch(0.09 0.022 40) 100%)`
          : "var(--card)",
        boxShadow: plan.popular
          ? `0 8px 32px ${GREEN_A(0.2)}, 0 0 0 1px ${GREEN_A(0.1)}`
          : "0 1px 8px oklch(0 0 0 / 0.05)",
      }}
    >
      {/* Popular top-glow */}
      {plan.popular && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${GREEN_A(0.13)}, transparent)`,
          }}
        />
      )}

      {/* ── Collapsed header row ── */}
      <button
        onClick={onToggle}
        className="relative w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: plan.color(0.15) }}
        >
          <PlanIcon style={{ color: plan.solidColor }} size={17} />
        </div>

        {/* Name + period */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className="font-display font-black italic leading-none"
              style={{
                fontSize: "1.05rem",
                color: plan.popular ? "oklch(1 0 0 / 0.92)" : "var(--foreground)",
              }}
            >
              {plan.name}
            </p>
            {plan.tag && (
              <span
                className="font-mono font-black text-[8px] tracking-[2px] uppercase px-1.5 py-0.5"
                style={{
                  background: plan.color(0.12),
                  color: plan.solidColor,
                  border: `1px solid ${plan.color(0.25)}`,
                  borderRadius: "4px",
                }}
              >
                {plan.tag}
              </span>
            )}
          </div>
          <p
            className="font-mono text-[9px] tracking-widest uppercase mt-0.5"
            style={{ color: plan.popular ? "oklch(1 0 0 / 0.38)" : "var(--muted-foreground)" }}
          >
            {plan.period}
          </p>
        </div>

        {/* Price + chevron */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="text-right">
            <p
              className="font-display font-black italic leading-none"
              style={{
                fontSize: "1.3rem",
                color: plan.popular ? GREEN : "var(--foreground)",
              }}
            >
              ₹{plan.price}
            </p>
            <p
              className="font-mono text-[8px] tracking-wide"
              style={{ color: plan.popular ? "oklch(1 0 0 / 0.35)" : "var(--muted-foreground)" }}
            >
              ₹{plan.perMonth}/mo
            </p>
          </div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0"
            style={{
              background: plan.color(0.10),
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <FiChevronDown size={12} style={{ color: plan.solidColor }} />
          </div>
        </div>
      </button>

      {/* ── Expandable features panel ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-1"
              style={{ borderTop: `1px solid ${plan.color(0.12)}` }}
            >
              {/* Feature grid — 2 cols for compactness */}
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 mb-4">
                {included.map((feat) => (
                  <li key={feat.text} className="flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: plan.color(0.16) }}
                    >
                      <FiCheck style={{ color: plan.solidColor }} size={7} strokeWidth={3} />
                    </div>
                    <span
                      className="font-mono text-[10px] leading-tight"
                      style={{ color: plan.popular ? "oklch(1 0 0 / 0.62)" : "var(--muted-foreground)" }}
                    >
                      {feat.text}
                    </span>
                  </li>
                ))}
                {excluded.map((feat) => (
                  <li key={feat.text} className="flex items-center gap-1.5" style={{ opacity: 0.3 }}>
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: plan.popular ? "oklch(1 0 0 / 0.06)" : "var(--muted)" }}
                    >
                      <FiX style={{ color: "var(--muted-foreground)" }} size={7} strokeWidth={3} />
                    </div>
                    <span className="font-mono text-[10px] line-through leading-tight" style={{ color: "var(--muted-foreground)" }}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={scrollToContact}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden w-full py-3 font-mono font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300"
                style={
                  plan.popular
                    ? {
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      boxShadow: `0 4px 20px ${GREEN_A(0.28)}`,
                      borderRadius: "0.625rem",
                    }
                    : {
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                      background: "transparent",
                      borderRadius: "0.625rem",
                    }
                }
              >
                {plan.popular && (
                  <motion.div
                    className="absolute top-0 left-0 w-10 h-full skew-x-[25deg] -translate-x-full"
                    style={{ background: "oklch(1 0 0 / 0.18)" }}
                    animate={{ x: ["-120%", "380%"] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
                  />
                )}
                <FiZap size={11} />
                {plan.popular ? "Get Started" : "Join Now"}
                <FiArrowRight size={10} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // ── Desktop tall card (unchanged) ────────────────────────────────────────
  const DesktopCard = (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.12 + index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="hidden sm:flex relative flex-col overflow-hidden"
      style={{
        borderRadius: "1rem",
        border: plan.popular
          ? `1px solid ${GREEN_A(0.45)}`
          : "1px solid var(--border)",
        boxShadow: plan.popular
          ? `0 0 0 1px ${GREEN_A(0.15)}, 0 24px 48px ${GREEN_A(0.18)}`
          : "0 2px 12px oklch(0 0 0 / 0.06)",
        background: plan.popular
          ? `linear-gradient(160deg, var(--contact-bg) 0%, oklch(0.08 0.022 40) 100%)`
          : "var(--card)",
      }}
    >
      {plan.popular && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${GREEN_A(0.12)}, transparent)`,
            borderRadius: "inherit",
          }}
        />
      )}

      {plan.tag && (
        <div
          className="relative flex items-center justify-center gap-1.5 py-2 border-b"
          style={{ background: plan.color(0.08), borderColor: plan.color(0.18) }}
        >
          {plan.id === "premium" && <TbSparkles style={{ color: plan.solidColor }} size={10} />}
          {plan.id === "elite" && <RiVipCrownFill style={{ color: plan.solidColor }} size={10} />}
          {plan.id === "standard" && <GiMedal style={{ color: plan.solidColor }} size={10} />}
          <span className="font-mono font-bold text-[9px] tracking-[3px] uppercase" style={{ color: plan.solidColor }}>
            {plan.tag}
          </span>
        </div>
      )}

      <div className="relative flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: plan.color(0.14) }}>
              <PlanIcon style={{ color: plan.solidColor }} size={18} />
            </div>
            <p
              className="font-display font-black italic leading-none"
              style={{ fontSize: "clamp(1.3rem, 3vw, 1.6rem)", color: plan.popular ? "oklch(1 0 0 / 0.92)" : "var(--foreground)" }}
            >
              {plan.name}
            </p>
            <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: plan.popular ? "oklch(1 0 0 / 0.4)" : "var(--muted-foreground)" }}>
              {plan.period}
            </p>
          </div>
          <div
            className="inline-flex items-baseline gap-1 px-2.5 py-2"
            style={{
              background: plan.popular ? "oklch(1 0 0 / 0.06)" : "var(--secondary)",
              border: plan.popular ? "1px solid oklch(1 0 0 / 0.10)" : "1px solid var(--border)",
              borderRadius: "0.625rem",
            }}
          >
            <span className="font-mono text-[9px]" style={{ color: plan.popular ? "oklch(1 0 0 / 0.4)" : "var(--muted-foreground)" }}>₹/mo</span>
            <span className="font-mono font-bold text-sm" style={{ color: plan.popular ? "oklch(1 0 0 / 0.9)" : "var(--foreground)" }}>{plan.perMonth}</span>
          </div>
        </div>

        <div className="mb-5 pb-5" style={{ borderBottom: plan.popular ? "1px solid oklch(1 0 0 / 0.08)" : "1px solid var(--border)" }}>
          <div className="flex items-end gap-1">
            <span className="font-mono text-lg font-bold mb-0.5" style={{ color: "var(--muted-foreground)" }}>₹</span>
            <span className="font-display font-black italic leading-none" style={{ fontSize: "clamp(2.4rem, 5vw, 3rem)", color: plan.popular ? GREEN : "var(--foreground)" }}>
              {plan.price}
            </span>
          </div>
          <p className="font-mono text-[9px] tracking-widest mt-1.5 uppercase" style={{ color: plan.popular ? "oklch(1 0 0 / 0.4)" : "var(--muted-foreground)" }}>
            for {plan.period.toLowerCase()}
          </p>
        </div>

        <ul className="flex flex-col gap-2 mb-3">
          {included.map((feat) => (
            <li key={feat.text} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: plan.color(0.15) }}>
                <FiCheck style={{ color: plan.solidColor }} size={8} strokeWidth={3} />
              </div>
              <span className="font-mono text-[11px]" style={{ color: plan.popular ? "oklch(1 0 0 / 0.65)" : "var(--muted-foreground)" }}>{feat.text}</span>
            </li>
          ))}
        </ul>

        {excluded.length > 0 && (
          <ul className="flex flex-col gap-2 mb-3" style={{ opacity: 0.3 }}>
            {excluded.map((feat) => (
              <li key={feat.text} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: plan.popular ? "oklch(1 0 0 / 0.06)" : "var(--muted)" }}>
                  <FiX size={7} style={{ color: "var(--muted-foreground)" }} strokeWidth={3} />
                </div>
                <span className="font-mono text-[11px] line-through" style={{ color: "var(--muted-foreground)" }}>{feat.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1" />

        <motion.button
          onClick={scrollToContact}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden w-full py-3.5 font-mono font-bold text-[11px] tracking-widest uppercase flex items-center justify-center gap-2.5 mt-5 transition-all duration-300"
          style={
            plan.popular
              ? { background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: `0 4px 28px ${GREEN_A(0.25)}`, borderRadius: "0.75rem" }
              : { border: "1px solid var(--border)", color: "var(--muted-foreground)", background: "transparent", borderRadius: "0.75rem" }
          }
        >
          {plan.popular && (
            <motion.div
              className="absolute top-0 left-0 w-10 h-full skew-x-[25deg] -translate-x-full"
              style={{ background: "oklch(1 0 0 / 0.18)" }}
              animate={{ x: ["-120%", "380%"] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
            />
          )}
          <FiZap size={13} />
          {plan.popular ? "Get Started" : "Join Now"}
          <FiArrowRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <>
      {MobileCard}
      {DesktopCard}
    </>
  );
}

// ─── Compare Banner ───────────────────────────────────────────────────────────

function CompareBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.85 }}
      className="mt-10 overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        background: "var(--card)",
      }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2.5">
          <RiLightbulbFlashLine style={{ color: GREEN }} size={16} />
          <span
            className="font-mono font-bold text-sm"
            style={{ color: "var(--foreground)" }}
          >
            Not sure which plan fits?
          </span>
        </div>
        <button
          onClick={scrollToContact}
          className="hidden sm:flex items-center gap-1.5 font-mono font-bold text-[10px] tracking-widest uppercase transition-all hover:gap-2.5"
          style={{ color: GREEN }}
        >
          Free Consultation <FiArrowRight size={11} />
        </button>
      </div>

      {/* Option rows */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x"
        style={{ borderColor: "var(--border)" }}
      >
        {compareItems.map(({ icon: Icon, title, rec, color, solid, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 px-5 py-5 cursor-default transition-colors duration-200"
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = color(0.05))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
              style={{ background: color(0.12) }}
            >
              <Icon style={{ color: solid }} size={17} />
            </div>
            <div>
              <p
                className="font-mono text-[9px] tracking-widest uppercase mb-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {title}
              </p>
              <p
                className="font-mono font-bold text-sm"
                style={{ color: "var(--foreground)" }}
              >
                {rec}
              </p>
              <p
                className="font-mono text-[10px] mt-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Contact Footer ───────────────────────────────────────────────────────────

function ContactNote({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 1.0 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 mt-8 pt-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <a
        href="tel:9019342121"
        className="group flex items-center gap-3 font-mono text-xs transition-colors"
        style={{ color: "var(--muted-foreground)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ background: GREEN_A(0.12) }}
        >
          <FiPhone style={{ color: GREEN }} size={13} />
        </div>
        Call{" "}
        <span
          className="font-bold underline underline-offset-2 decoration-dotted"
          style={{ color: GREEN }}
        >
          9019342121
        </span>{" "}
        to confirm pricing
      </a>

      <div
        className="h-4 w-px hidden sm:block"
        style={{ background: "var(--border)" }}
      />

      <button
        onClick={scrollToContact}
        className="group flex items-center gap-3 font-mono text-xs transition-colors"
        style={{ color: "var(--muted-foreground)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ background: GREEN_A(0.12) }}
        >
          <MdFitnessCenter style={{ color: GREEN }} size={13} />
        </div>
        Or{" "}
        <span
          className="font-bold group-hover:underline underline-offset-2"
          style={{ color: GREEN }}
        >
          Book a Free Trial Session
        </span>
      </button>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Membership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section
      id="membership"
      ref={ref}
      className="py-20 sm:py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Section edge lines */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${GREEN_A(0.25)}, transparent)`,
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${GREEN_A(0.25)}, transparent)`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GREEN_A(0.04)} 1px, transparent 1px), linear-gradient(90deg, ${GREEN_A(0.04)} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: GREEN_A(0.04),
          filter: "blur(200px)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{
          background: INDIGO_A(0.04),
          filter: "blur(180px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div
              className="h-px w-10"
              style={{ background: GREEN_A(0.5) }}
            />
            <TbBarbell style={{ color: GREEN }} size={14} />
            <span
              className="font-mono font-bold text-[10px] tracking-[5px] uppercase"
              style={{ color: GREEN }}
            >
              Membership Plans
            </span>
            <div
              className="h-px w-10"
              style={{ background: GREEN_A(0.5) }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-black italic leading-[0.92]"
            style={{
              fontSize: "clamp(2.6rem, 8vw, 5rem)",
              color: "var(--foreground)",
            }}
          >
            INVEST IN
            <br />
            <span
              className="glow-text"
              style={{
                color: "transparent",
                WebkitTextStroke: `1.5px ${GREEN}`,
              }}
            >
              YOUR BODY
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22 }}
            className="font-mono text-xs sm:text-[13px] tracking-widest mt-5 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Flexible plans to match every goal and budget.{" "}
            <span style={{ color: GREEN }}>All prices in INR (₹).</span>
          </motion.p>
        </div>

        <PromoBanner isInView={isInView} />
        <PerksStrip isInView={isInView} />

        {/* ── Plan Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 items-start">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isInView={isInView}
              expanded={expandedCard === plan.id}
              onToggle={() =>
                setExpandedCard((p) => (p === plan.id ? null : plan.id))
              }
            />
          ))}
        </div>

        <CompareBanner isInView={isInView} />
        <ContactNote isInView={isInView} />
      </div>
    </section>
  );
}