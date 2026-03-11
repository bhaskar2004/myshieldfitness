"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FiPhone, FiChevronRight, FiZap } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { GiShield } from "react-icons/gi";

/* ─── Animated burger / X icon ─── */
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      {/* Top bar */}
      <motion.span
        className="block h-[1.5px] rounded-full bg-current origin-center"
        animate={open ? { rotate: 45, y: 7.5, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Middle bar */}
      <motion.span
        className="block h-[1.5px] rounded-full bg-current origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "75%" }}
      />
      {/* Bottom bar */}
      <motion.span
        className="block h-[1.5px] rounded-full bg-current origin-center"
        animate={open ? { rotate: -45, y: -7.5, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Membership", href: "#membership" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

/* ─── magnetic button with sliding pill ─── */
function NavLink({
  children,
  href,
  active,
  onClick,
  isHovered,
  onHover,
}: {
  children: React.ReactNode;
  href: string;
  active: boolean;
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx * 0.35);
    y.set(cy * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); onHover(false); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`relative px-5 py-2 text-[10px] font-black tracking-[3px] uppercase font-mono transition-colors duration-300 group ${active ? "text-white" : "text-text-lo hover:text-text-hi"
        }`}
    >
      {/* sliding pill background */}
      {(active || isHovered) && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full z-0"
          style={{
            background: active ? "var(--primary)" : "oklch(0.12 0.026 40 / 0.04)",
            boxShadow: active ? "0 8px 20px -6px oklch(0.72 0.18 48 / 0.4)" : "none"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* ─── scroll progress bar ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/[0.03]">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress / 100,
          background: "linear-gradient(90deg, transparent, var(--primary), oklch(0.50 0.150 280))",
          boxShadow: "0 0 15px oklch(0.72 0.18 48 / 0.6)",
        }}
      />
    </div>
  );
}

/* ══════════════ MAIN ══════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      setScrolled(sy > 40);

      // active section detection
      const ids = navLinks.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 76, behavior: "smooth" });
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* glass bg panel */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: scrolled
              ? "oklch(0.975 0.016 72 / 0.8)"
              : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid oklch(0.72 0.18 48 / 0.08)" : "1px solid oklch(0.12 0.026 40 / 0.03)",
          }}
        />
        {/* top accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent" />

        {/* scroll progress */}
        {scrolled && <ScrollProgress />}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* ── Logo ── */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3.5 group shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              {/* icon */}
              <div className="relative w-10 h-10 shrink-0">
                <div
                  className="absolute inset-0 rounded-lg transition-all duration-500 group-hover:opacity-100 opacity-0"
                  style={{ background: "var(--primary)", boxShadow: "0 0 30px oklch(0.72 0.18 48 / 0.4)" }}
                />
                <div
                  className="absolute inset-0 rounded-lg transition-all duration-500 group-hover:opacity-0"
                  style={{ background: "oklch(0.72 0.18 48 / 0.1)", border: "1px solid oklch(0.72 0.18 48 / 0.3)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GiShield
                    size={20}
                    className="text-accent group-hover:text-white transition-colors duration-500"
                  />
                </div>
              </div>

              {/* wordmark */}
              <div className="flex flex-col">
                <span className="font-display font-black text-[18px] sm:text-[22px] leading-tight tracking-[0.05em] text-text-hi">
                  SHIELD&apos;S
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1 h-[1px] sm:w-1.5 sm:h-[1.5px] bg-accent" />
                  <span className="text-text-lo text-[7px] sm:text-[9px] tracking-[0.35em] uppercase font-mono font-black">
                    FITNESS
                  </span>
                </div>
              </div>
            </motion.a>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center bg-foreground/[0.03] border border-foreground/[0.05] rounded-full p-1 lg:mx-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={activeSection === link.href.slice(1)}
                  isHovered={hoveredSection === link.href}
                  onHover={(h) => setHoveredSection(h ? link.href : null)}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ── Desktop right actions ── */}
            <div className="hidden lg:flex items-center gap-4 shrink-0 pl-6 border-l border-foreground/[0.06] ml-4">
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <motion.a
                  href="https://www.instagram.com/shields_basavanagudi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-text-lo hover:text-text-hi transition-all duration-300 rounded-lg bg-foreground/[0.03] border border-foreground/[0.05] hover:bg-foreground/[0.08]"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram size={16} />
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:9019342121"
                  className="h-9 flex items-center gap-2.5 px-3.5 rounded-lg bg-foreground/[0.03] border border-foreground/[0.05] text-text-lo hover:text-text-hi text-[10px] font-mono font-black tracking-widest transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPhone size={12} className="text-accent" />
                  9019342121
                </motion.a>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => scrollTo("#membership")}
                className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 text-white text-[10px] font-black tracking-[3.2px] uppercase font-mono rounded-lg"
                style={{ background: "var(--primary)", boxShadow: "0 8px 25px -8px oklch(0.72 0.18 48 / 0.4)" }}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* scanning beam */}
                <motion.div
                  className="absolute top-0 left-0 w-[30px] h-full bg-white/20 skew-x-[25deg] -translate-x-[200%]"
                  animate={{ translateX: ["-200%", "500%"] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
                />
                <FiZap size={13} className="relative z-10" />
                <span className="relative z-10">Join Elite</span>
              </motion.button>
            </div>

            {/* ── Mobile hamburger ── */}
            <motion.button
              className="lg:hidden relative flex items-center justify-center transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.88 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: "0.625rem",
                background: mobileOpen ? "oklch(0.72 0.18 48 / 0.12)" : "oklch(0.12 0.026 40 / 0.05)",
                border: mobileOpen ? "1px solid oklch(0.72 0.18 48 / 0.3)" : "1px solid oklch(0.12 0.026 40 / 0.08)",
                color: mobileOpen ? "oklch(0.72 0.18 48)" : "var(--foreground)",
                transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
              }}
            >
              <BurgerIcon open={mobileOpen} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ══ MOBILE DRAWER ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-[6px]"
              style={{ background: "oklch(0.08 0.018 40 / 0.75)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col overflow-hidden"
              style={{
                width: "min(88vw, 380px)",
                background: "linear-gradient(160deg, oklch(0.11 0.022 40) 0%, oklch(0.08 0.016 40) 100%)",
                borderLeft: "1px solid oklch(0.72 0.18 48 / 0.15)",
              }}
            >
              {/* Top accent glow bar */}
              <div
                className="h-[2px] w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.18 48), oklch(0.60 0.140 85), transparent)" }}
              />

              {/* Subtle grid texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(oklch(0.72 0.18 48 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.18 48 / 0.04) 1px, transparent 1px)`,
                  backgroundSize: "44px 44px",
                }}
              />

              {/* Ambient glow orb */}
              <div
                className="absolute top-[-80px] right-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, oklch(0.72 0.18 48 / 0.15), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* ── Header ── */}
              <div
                className="relative flex items-center justify-between px-6 py-5 flex-shrink-0"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.72 0.18 48 / 0.15)",
                      border: "1px solid oklch(0.72 0.18 48 / 0.3)",
                      boxShadow: "0 0 16px oklch(0.72 0.18 48 / 0.2)",
                    }}
                  >
                    <GiShield size={20} style={{ color: "oklch(0.72 0.18 48)" }} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-display font-black italic leading-none tracking-wider"
                      style={{ fontSize: "1.05rem", color: "oklch(1 0 0 / 0.92)" }}
                    >
                      SHIELD&apos;S
                    </span>
                    <span
                      className="font-mono font-black text-[8px] tracking-[4px] uppercase mt-0.5"
                      style={{ color: "oklch(1 0 0 / 0.35)" }}
                    >
                      Basavanagudi
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.88 }}
                  className="relative flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "0.625rem",
                    background: "oklch(1 0 0 / 0.05)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    color: "oklch(1 0 0 / 0.5)",
                  }}
                >
                  <BurgerIcon open={true} />
                </motion.button>
              </div>

              {/* ── Live status ── */}
              <div className="relative px-6 pt-5">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "oklch(0.55 0.15 155 / 0.06)",
                    border: "1px solid oklch(0.55 0.15 155 / 0.15)",
                  }}
                >
                  <div className="relative flex items-center justify-center flex-shrink-0">
                    <div className="absolute w-3 h-3 rounded-full animate-ping" style={{ background: "oklch(0.74 0.19 145 / 0.5)" }} />
                    <div className="relative w-2 h-2 rounded-full" style={{ background: "oklch(0.74 0.19 145)", boxShadow: "0 0 8px oklch(0.74 0.19 145 / 0.8)" }} />
                  </div>
                  <div>
                    <p className="font-mono font-black text-[9px] tracking-[3px] uppercase leading-none" style={{ color: "oklch(0.74 0.19 145)" }}>Gym Is Open</p>
                    <p className="font-mono text-[8px] mt-0.5 tracking-widest" style={{ color: "oklch(1 0 0 / 0.3)" }}>Open until 10:00 PM · 6AM daily</p>
                  </div>
                </div>
              </div>

              {/* ── Nav links ── */}
              <nav className="relative flex-1 overflow-y-auto px-4 py-6">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                      onClick={() => scrollTo(link.href)}
                      className="group relative w-full flex items-center justify-between px-4 py-3.5 mb-1 text-left overflow-hidden"
                      style={{
                        borderRadius: "0.75rem",
                        background: isActive ? "oklch(0.72 0.18 48 / 0.12)" : "transparent",
                        border: isActive
                          ? "1px solid oklch(0.72 0.18 48 / 0.28)"
                          : "1px solid transparent",
                        transition: "background 0.25s ease, border-color 0.25s ease",
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)";
                          (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.06)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                        }
                      }}
                    >
                      {/* Active left bar */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-bar"
                          className="absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full"
                          style={{ background: "oklch(0.72 0.18 48)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-4 pl-1">
                        <span
                          className="font-mono text-[9px] font-black w-5 flex-shrink-0 tabular-nums"
                          style={{ color: isActive ? "oklch(0.72 0.18 48)" : "oklch(1 0 0 / 0.2)" }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className="font-display font-black italic transition-colors duration-200"
                          style={{
                            fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
                            letterSpacing: "0.04em",
                            color: isActive ? "oklch(0.72 0.18 48)" : "oklch(1 0 0 / 0.72)",
                          }}
                        >
                          {link.label}
                        </span>
                      </div>

                      <FiChevronRight
                        size={14}
                        style={{
                          color: isActive ? "oklch(0.72 0.18 48)" : "oklch(1 0 0 / 0.2)",
                          transform: "translateX(0)",
                          transition: "transform 0.2s ease, color 0.2s ease",
                        }}
                        className="group-hover:translate-x-1"
                      />
                    </motion.button>
                  );
                })}
              </nav>

              {/* ── Footer ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="relative flex-shrink-0 px-5 pt-4 pb-7"
                style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
              >
                {/* Quick actions row */}
                <div className="flex gap-2.5 mb-3">
                  <motion.a
                    href="tel:9019342121"
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 h-11 flex items-center justify-center gap-2 font-mono font-black text-[9px] tracking-widest uppercase transition-all duration-200"
                    style={{
                      borderRadius: "0.625rem",
                      background: "oklch(1 0 0 / 0.05)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      color: "oklch(1 0 0 / 0.55)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.08)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.85)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.05)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.55)";
                    }}
                  >
                    <FiPhone size={13} style={{ color: "oklch(0.72 0.18 48)" }} />
                    Call Us
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/shields_basavanagudi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                    className="w-11 h-11 flex items-center justify-center transition-all duration-200"
                    style={{
                      borderRadius: "0.625rem",
                      background: "oklch(1 0 0 / 0.05)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      color: "oklch(1 0 0 / 0.5)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.60 0.18 0 / 0.1)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.18 0)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.05)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.5)";
                    }}
                  >
                    <FaInstagram size={17} />
                  </motion.a>
                </div>

                {/* Primary CTA */}
                <motion.button
                  onClick={() => scrollTo("#membership")}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden w-full h-13 flex items-center justify-center gap-2.5 font-mono font-black text-[11px] tracking-[4px] uppercase"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 8px 28px oklch(0.72 0.18 48 / 0.35)",
                    height: "3.25rem",
                  }}
                >
                  {/* shimmer sweep */}
                  <motion.div
                    className="absolute top-0 left-0 w-10 h-full skew-x-[25deg] -translate-x-full"
                    style={{ background: "oklch(1 0 0 / 0.18)" }}
                    animate={{ x: ["-120%", "420%"] }}
                    transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3.5 }}
                  />
                  <FiZap size={15} className="relative z-10" />
                  <span className="relative z-10">Join Elite</span>
                </motion.button>

                <p
                  className="font-mono text-center text-[8px] tracking-[3px] uppercase mt-4"
                  style={{ color: "oklch(1 0 0 / 0.22)" }}
                >
                  Open Daily &middot; 6:00 AM – 10:00 PM
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}