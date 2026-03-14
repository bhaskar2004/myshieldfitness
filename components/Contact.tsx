"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiMapPin, FiPhone, FiClock, FiSend, FiInstagram,
  FiCheck, FiUser, FiMail, FiMessageSquare,
  FiArrowRight, FiZap, FiShield, FiStar, FiChevronDown,
} from "react-icons/fi";
import {
  MdLocalFireDepartment, MdVerified, MdSupportAgent,
  MdAccessTime, MdFitnessCenter, MdEmojiEvents,
  MdOutlineLocationOn,
} from "react-icons/md";
import { TbBarbell, TbRocket, TbBrandWhatsapp, TbBolt, TbFlame, TbCrown } from "react-icons/tb";
import { RiLiveLine, RiUserHeartLine } from "react-icons/ri";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

// ─── Data ────────────────────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    icon: FiMapPin,
    accentIcon: MdOutlineLocationOn,
    title: "Location",
    color: "var(--primary)",
    lines: [
      "3rd Floor, Aishwarya Sampurna",
      "79/1 Vanivilas Rd, Above KFC",
      "Gandhi Bazaar, Basavanagudi",
      "Bengaluru – 560004",
    ],
    cta: { label: "Get Directions", href: "https://maps.app.goo.gl/FGdUKxcSXiu8sJLy5?g_st=aw" },
  },
  {
    icon: FiPhone,
    accentIcon: MdSupportAgent,
    title: "Call Us",
    color: "oklch(0.60 0.150 150)",
    lines: ["9019342121"],
    cta: { label: "Call Now", href: "tel:9019342121" },
  },
  {
    icon: FiClock,
    accentIcon: MdAccessTime,
    title: "Opening Hours",
    color: "oklch(0.65 0.150 250)",
    lines: ["Mon – Sun", "6:00 AM – 10:00 PM", "Open on all holidays"],
    cta: null,
  },
  {
    icon: FiInstagram,
    accentIcon: FaInstagram,
    title: "Instagram",
    color: "oklch(0.60 0.18 48)",
    lines: ["@shields_basavanagudi", "4,300+ followers"],
    cta: { label: "Follow Us", href: "https://www.instagram.com/shields_basavanagudi/" },
  },
];

const TRUST_BADGES = [
  { icon: MdVerified, label: "Certified Trainers" },
  { icon: MdEmojiEvents, label: "500+ Members" },
  { icon: FiStar, label: "4.8 ★ Rated" },
  { icon: FiShield, label: "No Hidden Fees" },
];

const PLANS = [
  { value: "trial", label: "Free Trial", price: "Free", tag: "Session", icon: FiZap },
  { value: "basic", label: "1 Month", price: "₹2,000", tag: "Basic", icon: TbBarbell },
  { value: "standard", label: "3 Months", price: "₹5,000", tag: "Standard", icon: TbBolt },
  { value: "premium", label: "6 Months", price: "₹7,000", tag: "Popular", icon: TbFlame },
  { value: "elite", label: "12 Months", price: "₹9,999", tag: "Best Value", icon: TbCrown },
];

// ─── Trust Bar ────────────────────────────────────────────────────────────────

function TrustBar({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.38 }}
      className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:divide-x divide-foreground/[0.08] border border-foreground rounded-2xl overflow-hidden mb-12"
    >
      {TRUST_BADGES.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.43 + i * 0.07 }}
            className="flex items-center gap-2.5 px-5 py-3 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-colors w-1/2 sm:w-auto sm:flex-1 justify-center group cursor-default"
          >
            <Icon size={14} style={{ color: "var(--primary)" }} className="group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>{b.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Promo Strip ─────────────────────────────────────────────────────────────

function PromoStrip({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.32 }}
      className="flex items-center gap-3 sm:gap-5 rounded-xl px-4 sm:px-5 py-3 mb-6"
      style={{
        border: "1px solid var(--foreground)",
        background: "oklch(0.72 0.18 48 / 0.07)",
      }}
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.72 0.18 48 / 0.15)" }}>
        <IoSparkles style={{ color: "var(--primary)" }} size={13} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>
          <span style={{ color: "var(--primary)" }} className="font-bold">FREE TRIAL: </span>
          Visit us for a complimentary session — no commitment required.
        </p>
      </div>
      <div className="flex-shrink-0 hidden sm:flex items-center gap-1.5 font-mono font-bold text-[10px] tracking-widest uppercase" style={{ color: "var(--primary)" }}>
        Book below <FiArrowRight size={11} />
      </div>
    </motion.div>
  );
}

// ─── Info Card ────────────────────────────────────────────────────────────────

function InfoCard({
  item, index, isInView,
}: {
  item: typeof INFO_CARDS[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col gap-3 rounded-2xl border border-foreground p-4 sm:p-5 transition-all duration-300 overflow-hidden group"
      style={{ background: "var(--card)" }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at top left, ${item.color}18, transparent 70%)` }}
      />

      {/* Icon row */}
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${item.color}20` }}
        >
          <Icon style={{ color: item.color }} size={17} />
        </div>
        <div
          className="h-1.5 w-1.5 rounded-full mt-1"
          style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
        />
      </div>

      {/* Content */}
      <div>
        <p className="font-mono text-[9px] tracking-widest uppercase mb-1.5" style={{ color: "var(--muted-foreground)" }}>{item.title}</p>
        {item.lines.map((line, j) => (
          <p key={j} className="font-mono text-[10px] sm:text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{line}</p>
        ))}
      </div>

      {/* CTA */}
      {item.cta && (
        <a
          href={item.cta.href}
          target={item.cta.href.startsWith("http") ? "_blank" : undefined}
          rel={item.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 font-mono font-bold text-[10px] tracking-widest uppercase transition-all mt-auto group-hover:gap-2"
          style={{ color: item.color }}
        >
          {item.cta.label} <FiArrowRight size={9} />
        </a>
      )}
    </motion.div>
  );
}

// ─── WhatsApp Banner ─────────────────────────────────────────────────────────

function WhatsAppBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.a
      href="https://wa.me/919019342121?text=Hi%2C%20I%20want%20to%20book%20a%20free%20trial%20at%20Shield's%20Fitness"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.55 }}
      className="group flex items-center gap-3 rounded-xl border border-foreground bg-green-500/[0.06] hover:bg-green-500/[0.12] px-4 py-3 mt-4 transition-all duration-300"
    >
      <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <FaWhatsapp className="text-green-400" size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono font-bold text-xs" style={{ color: "var(--foreground)" }}>Prefer WhatsApp?</p>
        <p className="font-mono text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>Chat with us directly to book your session</p>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1 text-green-400 font-mono font-bold text-[10px] tracking-widest uppercase group-hover:gap-2 transition-all">
        Chat <FiArrowRight size={10} />
      </div>
    </motion.a>
  );
}

// ─── Form ────────────────────────────────────────────────────────────────────

function ContactForm({ isInView }: { isInView: boolean }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", plan: "trial", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectPlan = (val: string) => {
    setForm(p => ({ ...p, plan: val }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => {
      const newErrors = { ...p };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", plan: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 placeholder-text-lo/40 text-sm font-mono focus:outline-none transition-all duration-200 ${errors[field]
      ? "border-red-500/60 focus:border-red-400 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
      : "border-foreground focus:border-accent shadow-sm"
    }`;

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="relative rounded-2xl border border-foreground overflow-hidden"
      style={{ background: "var(--card)" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, var(--card) 0%, var(--background) 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 80% 0%, var(--primary), transparent 55%)" }}
      />

      <div className="relative border-b border-foreground px-6 sm:px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.72 0.18 48 / 0.12)" }}>
            <TbRocket style={{ color: "var(--primary)" }} size={18} />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl leading-none" style={{ color: "var(--foreground)" }}>
              BOOK YOUR FREE TRIAL
            </h3>
            <p className="font-mono text-[10px] tracking-widest mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              We&apos;ll call you within 24 hours to schedule
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-foreground"
                style={{ background: "oklch(0.72 0.18 48 / 0.12)" }}
              >
                <FiCheck size={28} strokeWidth={3} style={{ color: "var(--primary)" }} />
              </motion.div>
              <div>
                <p className="font-display font-black italic text-2xl" style={{ color: "var(--foreground)" }}>WE&apos;LL CALL YOU!</p>
                <p className="font-mono text-xs mt-2 max-w-xs mx-auto" style={{ color: "var(--muted-foreground)" }}>
                  Our team will reach out to schedule your free trial session at Shield&apos;s Fitness.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest" style={{ color: "var(--primary)" }}>
                <RiLiveLine className="animate-pulse" size={12} /> Team notified
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="flex flex-col gap-4"
              animate={Object.keys(errors).length > 0 ? "shake" : ""}
              variants={shakeVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
                    <FiUser size={9} /> Full Name <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" autoFocus
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="text-red-400 font-mono text-[9px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
                    <FiPhone size={9} /> Phone <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="9XXXXXXXXX"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-red-400 font-mono text-[9px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-text-lo font-mono text-[9px] tracking-widest uppercase mb-2">
                  <FiMail size={9} /> Email <span className="text-text-lo/40">(optional)</span>
                </label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass("email")}
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-text-lo font-mono text-[9px] tracking-widest uppercase mb-3">
                  <TbBarbell size={10} /> Choose Your Path <span style={{ color: "var(--primary)" }}>*</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PLANS.map((p) => {
                    const Icon = p.icon;
                    const isSelected = form.plan === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => selectPlan(p.value)}
                        className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 group ${isSelected
                          ? "border-foreground bg-primary/10 shadow-[0_0_20px_oklch(0.72_0.18_48_/_0.15)]"
                          : "border-foreground bg-foreground/[0.02]"
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}
                          style={{ background: isSelected ? "var(--primary)" : "var(--foreground)/10" }}
                        >
                          <Icon size={14} style={{ color: isSelected ? "var(--primary-foreground)" : "var(--primary)" }} />
                        </div>
                        <p className={`font-display text-[9px] uppercase tracking-wider mb-0.5 text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {p.label}
                        </p>
                        <p className="font-mono text-[8px] opacity-40 uppercase tracking-widest">
                          {p.price}
                        </p>

                        {isSelected && (
                          <motion.div
                            layoutId="activePlan"
                            className="absolute inset-0 rounded-xl border-2 border-foreground pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-text-lo font-mono text-[9px] tracking-widest uppercase mb-2">
                  <span className="flex items-center gap-1.5">
                    <FiMessageSquare size={9} /> Your Goals <span className="text-text-lo/40">(optional)</span>
                  </span>
                  <span className={form.message.length > 450 ? "text-red-400" : "text-text-lo/40"}>
                    {form.message.length}/500
                  </span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="e.g. Weight loss, muscle gain, stamina…"
                  rows={3} maxLength={500}
                  className={`${inputClass("message")} resize-none`}
                />
              </div>

              <p className="text-text-lo/40 font-mono text-[9px] tracking-widest -mt-1">
                <FiShield className="inline-block mr-1" size={9} />
                Your information is private and never shared.
              </p>

              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 rounded-xl font-mono font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300 hover:brightness-110 disabled:opacity-70"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  boxShadow: "0 4px 24px oklch(0.72 0.18 48 / 0.35)",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-foreground/20 border-t-text-hi rounded-full"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiZap size={15} />
                    Book Free Trial
                    <FiArrowRight size={14} />
                  </>
                )}
              </motion.button>

              <div className="flex items-center gap-4 pt-1">
                <div className="h-px flex-1 bg-foreground/[0.05]" />
                <span className="text-text-lo/40 font-mono text-[9px] tracking-widest uppercase">or</span>
                <div className="h-px flex-1 bg-foreground/[0.05]" />
              </div>
              <a
                href="tel:9019342121"
                className="group flex items-center justify-center gap-2.5 border border-foreground hover:border-accent/40 rounded-xl py-3 text-text-lo hover:text-text-hi font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                <FiPhone className="text-accent group-hover:scale-110 transition-transform" size={13} />
                Call 9019342121
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.05] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-10 bg-accent" />
            <MdFitnessCenter className="text-accent" size={14} />
            <span className="text-accent text-[10px] tracking-[5px] uppercase font-mono font-bold">
              Get In Touch
            </span>
            <div className="h-px w-10 bg-accent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-text-hi leading-[0.92]"
          >
            START YOUR
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--primary)" }}>
              TRANSFORMATION
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-text-lo font-mono text-xs sm:text-sm tracking-widest mt-4 max-w-md mx-auto"
          >
            Drop us a message and our team will reach out within{" "}
            <span className="text-accent font-bold">24 hours</span>.
          </motion.p>
        </div>

        {/* ── Trust Bar ── */}
        <TrustBar isInView={isInView} />

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-14">

          {/* Left */}
          <div>
            {/* Promo Strip */}
            <PromoStrip isInView={isInView} />

            {/* Info Cards 2×2 */}
            <div className="grid grid-cols-2 gap-3 mb-0">
              {INFO_CARDS.map((item, i) => (
                <InfoCard key={item.title} item={item} index={i} isInView={isInView} />
              ))}
            </div>

            {/* WhatsApp Banner */}
            <WhatsAppBanner isInView={isInView} />

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              className="mt-4 rounded-2xl overflow-hidden border border-foreground h-52 sm:h-64"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6050048988777!2d77.56899761480194!3d12.940985990884696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159992dbe9a1%3A0xb74bb517b9effe5c!2sSHIELD'S+FITNESS+CLUB!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shield's Fitness Club Location"
              />
              <div className="absolute inset-0 pointer-events-none border border-foreground rounded-2xl" />
            </motion.div>
          </div>

          {/* Right — Form */}
          <ContactForm isInView={isInView} />
        </div>
      </div>
    </section>
  );
}