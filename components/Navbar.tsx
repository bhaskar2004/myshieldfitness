"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FiPhone, FiChevronRight, FiZap, FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { GiShield } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";

// ─── Color system ─────────────────────────────────────────────────────────────
const ACCENT = "oklch(0.72 0.18 48)";
const INDIGO = "oklch(0.50 0.150 280)";
const aa = (a: number) => `oklch(0.72 0.18 48 / ${a})`;
const ia = (a: number) => `oklch(0.50 0.150 280 / ${a})`;

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Membership", href: "#membership" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// ─── BurgerIcon — SVG path morph for pixel-perfect X ─────────────────────────
// Using SVG lets us drive both stroke-dashoffset and d-attribute for a crisp
// hamburger ↔ X morph with no floating-point centering issues.
function BurgerIcon({ open }: { open: boolean }) {
  // viewBox 20×14, bars at y=0, y=6.25 (mid-center), y=12.5
  // Open state: top bar rotates 45° through center, bottom rotates -45°
  return (
    <svg
      width="20" height="14"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* ── Top bar ── */}
      <motion.line
        x1="0" y1="1" x2="20" y2="1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ y1: 1, y2: 1, x1: 0, x2: 20, rotate: 0 }}
        animate={open
          ? { y1: 7, y2: 7, x1: 1.5, x2: 18.5, rotate: 45 }
          : { y1: 1, y2: 1, x1: 0, x2: 20, rotate: 0 }
        }
        style={{ transformOrigin: "10px 7px" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Middle bar — shorter, fades out ── */}
      <motion.line
        x1="3" y1="7" x2="20" y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 1, scaleX: 1 }}
        animate={open
          ? { opacity: 0, scaleX: 0.4 }
          : { opacity: 1, scaleX: 1 }
        }
        style={{ transformOrigin: "10px 7px" }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Bottom bar ── */}
      <motion.line
        x1="0" y1="13" x2="20" y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ y1: 13, y2: 13, x1: 0, x2: 20, rotate: 0 }}
        animate={open
          ? { y1: 7, y2: 7, x1: 1.5, x2: 18.5, rotate: -45 }
          : { y1: 13, y2: 13, x1: 0, x2: 20, rotate: 0 }
        }
        style={{ transformOrigin: "10px 7px" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: aa(0.06) }}>
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress / 100,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, ${INDIGO})`,
          boxShadow: `0 0 12px ${aa(0.55)}`,
        }}
      />
    </div>
  );
}

// ─── Desktop NavLink with magnetic + sliding pill ─────────────────────────────
function NavLink({
  children, href, active, onClick, isHovered, onHover,
}: {
  children: React.ReactNode;
  href: string;
  active: boolean;
  onClick: () => void;
  isHovered: boolean;
  onHover: (v: boolean) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); onHover(false); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative px-4 py-2 transition-colors duration-200"
      style={{
        x: sx,
        y: sy,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: "10px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: active ? "oklch(0.15 0.02 60)" : "var(--muted-foreground)",
      } as any}
    >
      {(active || isHovered) && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full z-0"
          style={{
            background: active ? ACCENT : aa(0.06),
            boxShadow: active ? `0 6px 18px -4px ${aa(0.42)}` : "none",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ─── Live status pill (time-aware) ────────────────────────────────────────────
function LiveStatus({ compact = false }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const h = new Date().getHours();
    setIsOpen(h >= 6 && h < 22);
  }, []);

  const color = isOpen ? "oklch(0.65 0.17 155)" : "oklch(0.65 0.18 25)";
  const label = isOpen ? "Open Now" : "Closed";
  const sub = isOpen ? "Closes 10 PM" : "Opens 6 AM";

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="relative flex items-center justify-center">
          {isOpen && (
            <span
              className="absolute w-3 h-3 rounded-full animate-ping opacity-30"
              style={{ background: color }}
            />
          )}
          <span className="relative w-2 h-2 rounded-full" style={{ background: color }} />
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color,
        }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: isOpen ? "oklch(0.65 0.17 155 / 0.07)" : "oklch(0.65 0.18 25 / 0.07)",
        border: `1px solid ${isOpen ? "oklch(0.65 0.17 155 / 0.22)" : "oklch(0.65 0.18 25 / 0.22)"}`,
      }}
    >
      <span className="relative flex items-center justify-center flex-shrink-0">
        {isOpen && (
          <span className="absolute w-4 h-4 rounded-full animate-ping opacity-25" style={{ background: color }} />
        )}
        <span className="relative w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      </span>
      <div>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          lineHeight: 1,
          color,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          fontSize: "9px",
          letterSpacing: "0.08em",
          lineHeight: 1,
          marginTop: "4px",
          color: "oklch(1 0 0 / 0.35)",
        }}>
          {sub} · 6AM daily
        </p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: "smooth" });
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <motion.nav
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass panel */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: scrolled ? "var(--background)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            borderBottom: scrolled ? `1px solid ${aa(0.12)}` : "1px solid transparent",
            opacity: scrolled ? 0.96 : 1,
          }}
        />
        {/* Scroll progress */}
        {scrolled && <ScrollProgress />}

        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px] max-w-7xl mx-auto">

            {/* ── Logo ── */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3 group flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-xl transition-all duration-400 group-hover:opacity-100 opacity-0"
                  style={{ background: ACCENT, boxShadow: `0 0 24px ${aa(0.45)}` }}
                />
                <div
                  className="absolute inset-0 rounded-xl transition-all duration-400 group-hover:opacity-0"
                  style={{ background: aa(0.08), border: `1px solid ${aa(0.22)}` }}
                />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src="/favicon.jpg"
                    alt="Shield's Fitness"
                    className="w-full h-full object-cover"
                    style={{ transform: "scale(1.15)" }}
                  />
                </div>
              </div>

              <div className="flex flex-col leading-none">
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 3.5vw, 22px)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--foreground)",
                  lineHeight: 1,
                }}>
                  SHIELD&apos;S
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-px w-4" style={{ background: ACCENT }} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    lineHeight: 1,
                  }}>
                    Fitness
                  </span>
                </div>
              </div>
            </motion.a>

            {/* ── Desktop nav ── */}
            <div
              className="hidden lg:flex items-center rounded-full p-1 mx-6"
              style={{ background: aa(0.04), border: `1px solid ${aa(0.10)}` }}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={activeSection === link.href.slice(1)}
                  isHovered={hoveredLink === link.href}
                  onHover={(h) => setHoveredLink(h ? link.href : null)}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ── Desktop right ── */}
            <div
              className="hidden lg:flex items-center gap-3 flex-shrink-0 pl-5"
              style={{ borderLeft: `1px solid ${aa(0.12)}` }}
            >
              <motion.a
                href="https://www.instagram.com/shields_basavanagudi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-250"
                style={{
                  background: aa(0.06),
                  border: `1px solid ${aa(0.14)}`,
                  color: "var(--muted-foreground)",
                }}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.94 }}
              >
                <FaInstagram size={15} />
              </motion.a>

              <motion.a
                href="tel:9019342121"
                className="h-9 flex items-center gap-2 px-3 rounded-lg transition-colors duration-250"
                style={{
                  background: aa(0.06),
                  border: `1px solid ${aa(0.14)}`,
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiPhone size={11} style={{ color: ACCENT, flexShrink: 0 }} />
                9019342121
              </motion.a>

              <motion.button
                onClick={() => scrollTo("#membership")}
                className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-lg"
                style={{
                  background: ACCENT,
                  color: "oklch(0.15 0.02 60)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  boxShadow: `0 6px 22px -6px ${aa(0.48)}`,
                  border: "none",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-8 h-full"
                  style={{ background: "oklch(1 0 0 / 0.20)", transform: "skewX(-25deg)" }}
                  animate={{ x: ["-200%", "500%"] }}
                  transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 4.2 }}
                />
                <FiZap size={12} className="relative z-10 flex-shrink-0" />
                <span className="relative z-10">Join Elite</span>
              </motion.button>
            </div>

            {/* ── Mobile: status + hamburger ── */}
            <div className="flex lg:hidden items-center gap-2.5">
              {/* Live status — compact, visible at a glance */}
              <div className="hidden sm:block">
                <LiveStatus compact />
              </div>

              {/* Burger button */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                whileTap={{ scale: 0.88 }}
                className="flex items-center justify-center flex-shrink-0 transition-all duration-250"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: mobileOpen ? aa(0.12) : aa(0.06),
                  border: `1.5px solid ${mobileOpen ? aa(0.35) : aa(0.16)}`,
                  color: mobileOpen ? ACCENT : "var(--foreground)",
                  transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                }}
              >
                <BurgerIcon open={mobileOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ══ MOBILE DRAWER ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-40"
              style={{ background: "oklch(0.06 0.015 40 / 0.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 360, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{
                width: "min(85vw, 360px)",
                background: "oklch(0.10 0.020 42)",
                borderLeft: `1px solid ${aa(0.18)}`,
                boxShadow: `-24px 0 80px oklch(0 0 0 / 0.40)`,
              }}
            >
              {/* Top accent bar */}
              <div className="flex-shrink-0 h-[2px]" style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT} 35%, ${INDIGO} 65%, transparent)`,
              }} />

              {/* Subtle grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(${aa(0.04)} 1px, transparent 1px), linear-gradient(90deg, ${aa(0.04)} 1px, transparent 1px)`,
                backgroundSize: "52px 52px",
              }} />

              {/* Glow orb */}
              <div className="absolute top-[-60px] right-[-40px] w-[260px] h-[260px] rounded-full pointer-events-none" style={{
                background: `radial-gradient(circle, ${aa(0.14)} 0%, transparent 68%)`,
                filter: "blur(36px)",
              }} />

              {/* ── Drawer header ── */}
              <div
                className="relative flex items-center justify-between px-5 py-4 flex-shrink-0"
                style={{ borderBottom: `1px solid ${aa(0.12)}` }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                    style={{ border: `1px solid ${aa(0.22)}`, background: aa(0.10) }}
                  >
                    <img src="/favicon.jpg" alt="Shield's Fitness" className="w-full h-full object-cover scale-110" />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "17px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "oklch(0.96 0.012 72)",
                      lineHeight: 1,
                    }}>
                      SHIELD&apos;S
                    </p>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: "8px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "oklch(1 0 0 / 0.35)",
                      lineHeight: 1,
                      marginTop: "4px",
                    }}>
                      Basavanagudi
                    </p>
                  </div>
                </div>

                {/* Close — X button, same 44×44 tap target */}
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  whileTap={{ scale: 0.86 }}
                  className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    background: aa(0.08),
                    border: `1.5px solid ${aa(0.22)}`,
                    color: "oklch(1 0 0 / 0.55)",
                  }}
                >
                  {/* Inline X — always open state */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <motion.line x1="1.5" y1="1.5" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <motion.line x1="12.5" y1="1.5" x2="1.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.button>
              </div>

              {/* ── Live status ── */}
              <div className="relative px-5 pt-4 flex-shrink-0">
                <LiveStatus compact={false} />
              </div>

              {/* ── Nav links ── */}
              <nav className="relative flex-1 overflow-y-auto px-4 pt-4 pb-2" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => scrollTo(link.href)}
                      className="group relative w-full flex items-center justify-between mb-1 text-left overflow-hidden"
                      style={{
                        // 56px min touch target
                        minHeight: "56px",
                        padding: "0 16px",
                        borderRadius: "12px",
                        background: isActive ? aa(0.12) : "transparent",
                        border: `1px solid ${isActive ? aa(0.28) : "transparent"}`,
                        cursor: "pointer",
                        transition: "background 0.22s ease, border-color 0.22s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)";
                          (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.07)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                        }
                      }}
                    >
                      {/* Active left accent bar */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-indicator"
                          className="absolute left-0 top-3 bottom-3 rounded-r-full"
                          style={{ width: "2.5px", background: ACCENT }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-4">
                        {/* Index */}
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 500,
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: isActive ? aa(0.8) : "oklch(1 0 0 / 0.22)",
                          minWidth: "18px",
                          lineHeight: 1,
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          0{i + 1}
                        </span>

                        {/* Label */}
                        <span style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 400,
                          textTransform: "uppercase",
                          fontSize: "clamp(1.2rem, 5.5vw, 1.45rem)",
                          letterSpacing: "0.04em",
                          lineHeight: 1,
                          color: isActive ? ACCENT : "oklch(1 0 0 / 0.75)",
                          transition: "color 0.2s ease",
                        }}>
                          {link.label}
                        </span>
                      </div>

                      <FiChevronRight
                        size={14}
                        style={{
                          color: isActive ? ACCENT : "oklch(1 0 0 / 0.22)",
                          flexShrink: 0,
                          transition: "transform 0.2s ease, color 0.2s ease",
                        }}
                        className="group-hover:translate-x-0.5"
                      />
                    </motion.button>
                  );
                })}
              </nav>

              {/* ── Footer actions ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-shrink-0 px-4 pt-4 pb-6"
                style={{ borderTop: `1px solid ${aa(0.12)}` }}
              >
                {/* Row 1: Call + Instagram — equal-weight secondary actions */}
                <div className="flex gap-2 mb-2.5">
                  <motion.a
                    href="tel:9019342121"
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 flex items-center justify-center gap-2"
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      background: aa(0.08),
                      border: `1px solid ${aa(0.20)}`,
                      color: "oklch(1 0 0 / 0.65)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = aa(0.14);
                      (e.currentTarget as HTMLElement).style.borderColor = aa(0.35);
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = aa(0.08);
                      (e.currentTarget as HTMLElement).style.borderColor = aa(0.20);
                    }}
                  >
                    <FiPhone size={13} style={{ color: ACCENT, flexShrink: 0 }} />
                    Call Us
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/shields_basavanagudi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: aa(0.08),
                      border: `1px solid ${aa(0.20)}`,
                      color: "oklch(1 0 0 / 0.55)",
                      textDecoration: "none",
                      flexShrink: 0,
                      transition: "background 0.2s, border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "oklch(0.62 0.18 0 / 0.12)";
                      el.style.borderColor = "oklch(0.65 0.16 8 / 0.40)";
                      el.style.color = "oklch(0.78 0.16 8)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = aa(0.08);
                      el.style.borderColor = aa(0.20);
                      el.style.color = "oklch(1 0 0 / 0.55)";
                    }}
                  >
                    <FaInstagram size={17} />
                  </motion.a>
                </div>

                {/* Row 2: Primary CTA — full width, dominant */}
                <motion.button
                  onClick={() => scrollTo("#membership")}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2.5"
                  style={{
                    height: "52px",
                    borderRadius: "12px",
                    background: ACCENT,
                    color: "oklch(0.15 0.02 60)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 800,
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: `0 8px 28px -6px ${aa(0.50)}`,
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-10 h-full"
                    style={{ background: "oklch(1 0 0 / 0.18)", transform: "skewX(-22deg)" }}
                    animate={{ x: ["-160%", "460%"] }}
                    transition={{ duration: 0.88, repeat: Infinity, repeatDelay: 3.6 }}
                  />
                  <FiZap size={15} className="relative z-10 flex-shrink-0" />
                  <span className="relative z-10">Join Elite</span>
                </motion.button>

                {/* Hours note */}
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 400,
                  fontSize: "8.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: "oklch(1 0 0 / 0.22)",
                  marginTop: "12px",
                  lineHeight: 1,
                }}>
                  Open Daily · 6:00 AM – 10:00 PM
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}