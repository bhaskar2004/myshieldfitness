"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Stat {
  tag: string;
  value: string;
  suffix: string;
  aside: [string, string];
  accentColor?: "amber" | "indigo";
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { tag: "Daily Access", value: "16", suffix: "hrs", aside: ["6 AM – 10 PM", "Every day"] },
  { tag: "Active Members", value: "500", suffix: "+", aside: ["Growing", "community"] },
  { tag: "Google Rating", value: "4.8", suffix: "★", aside: ["287+", "reviews"] },
  { tag: "Elite Trainers", value: "12", suffix: "+", aside: ["NSCA / ACE", "certified"] },
];

// ─── CSS injected once ─────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;1,9..144,200;1,9..144,300&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --sf-bg:          #faf8f4;
    --sf-fg:          #1c1a15;
    --sf-muted:       rgba(28,26,21,0.42);
    --sf-rule:        rgba(28,26,21,0.08);
    --sf-border:      rgba(28,26,21,0.09);
    --sf-amber:       #c4841a;
    --sf-amber-mid:   #d4962a;
    --sf-amber-dim:   rgba(196,132,26,0.12);
    --sf-amber-glow:  rgba(196,132,26,0.055);
    --sf-indigo:      #5b4db5;
    --sf-serif:       'Fraunces', Georgia, serif;
    --sf-mono:        'DM Mono', 'Courier New', monospace;
  }

  /* ── Grain overlay ── */
  .sf-grain::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 200px;
    opacity: 0.022; mix-blend-mode: multiply;
  }

  /* ── Headline slide-up ── */
  .sf-slide-1 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.38s forwards; }
  .sf-slide-2 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.50s forwards; }
  .sf-slide-3 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.62s forwards; }
  .sf-slide-sub { transform: translateY(100%); animation: sfSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s forwards; }

  /* ── Stat hover stripe ── */
  .sf-stat::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--sf-amber); transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .sf-stat:hover::before { transform: scaleY(1); }
  .sf-stat:hover { background: rgba(196,132,26,0.03); }

  /* ── Open dot blink ── */
  .sf-blink { animation: sfBlink 2s ease infinite; }

  /* ── Scroll dot ── */
  .sf-scroll-dot { animation: sfScroll 1.9s ease infinite; }

  @keyframes sfSlideUp  { to { transform: translateY(0); } }
  @keyframes sfBlink    { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes sfScroll   { 0%,100%{transform:translateY(0);opacity:.8} 50%{transform:translateY(8px);opacity:.12} }
`;

// ─── Sub-components ────────────────────────────────────────────────────────────

function StyleInjector() {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);
  return null;
}

function LogoMark() {
  return (
    <div
      style={{
        position: "relative", width: 32, height: 32,
        border: "1.5px solid var(--sf-amber)", borderRadius: 5,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute", width: 14, height: 14,
          border: "1px solid rgba(196,132,26,0.45)",
          borderRadius: 2, transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

function Topbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(22px, 3vh, 34px) 0",
        borderBottom: "1px solid var(--sf-border)",
      }}
    >
      {/* Logo */}
      {/* Logo Removed */}
      <div />

      {/* Nav Section Removed as per Request */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* Open badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "7px 14px",
          border: "1px solid var(--sf-amber-dim)", borderRadius: 999,
          background: "var(--sf-amber-glow)", marginLeft: 8,
        }}>
          <span className="sf-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#3da862", display: "block" }} />
          <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-amber)" }}>
            Open Now
          </span>
        </div>
      </div>
    </motion.header>
  );
}

function Headline() {
  const lines: { cls: string; style: React.CSSProperties }[] = [
    {
      cls: "sf-slide-1",
      style: { fontStyle: "italic", color: "var(--sf-fg)", fontWeight: 200 },
    },
    {
      cls: "sf-slide-2",
      style: {
        fontStyle: "normal", fontWeight: 300,
        WebkitTextStroke: "1.2px rgba(28,26,21,0.28)", color: "transparent",
      },
    },
    {
      cls: "sf-slide-3",
      style: { fontStyle: "italic", color: "var(--sf-amber)", fontWeight: 200 },
    },
  ];
  const words = ["Shield", "Fitness", "Club"];

  return (
    <div style={{ marginBottom: "clamp(18px, 3vh, 32px)" }}>
      {lines.map(({ cls, style }, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 0.88 }}>
          <span
            className={cls}
            style={{
              display: "block",
              fontFamily: "var(--sf-serif)",
              fontSize: "clamp(64px, 10.5vw, 148px)",
              letterSpacing: "-0.025em",
              ...style,
            }}
          >
            {words[i]}
          </span>
        </div>
      ))}

      {/* Sub-line */}
      <div style={{ overflow: "hidden", marginTop: "clamp(10px, 1.8vh, 18px)" }}>
        <div className="sf-slide-sub" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 22, height: 1, background: "rgba(28,26,21,0.18)", flexShrink: 0, display: "block" }} />
          <span style={{
            fontFamily: "var(--sf-mono)", fontSize: "clamp(9px, 1vw, 11px)",
            fontWeight: 400, letterSpacing: "0.24em", textTransform: "uppercase",
            color: "var(--sf-muted)",
          }}>
            Unleash your peak
          </span>
        </div>
      </div>
    </div>
  );
}

function CTAs() {
  const [fillHover, setFillHover] = useState(false);
  const [outlineHover, setOutlineHover] = useState(false);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.02, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
    >
      <button
        onClick={() => scrollTo("#membership")}
        onMouseEnter={() => setFillHover(true)}
        onMouseLeave={() => setFillHover(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "13px 26px",
          background: fillHover ? "var(--sf-amber-mid)" : "var(--sf-amber)",
          color: "#fff", border: "none", borderRadius: 3,
          fontFamily: "var(--sf-mono)", fontSize: 10, fontWeight: 500,
          letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer",
          boxShadow: fillHover ? "0 6px 26px rgba(196,132,26,0.32)" : "0 3px 18px rgba(196,132,26,0.22)",
          transform: fillHover ? "translateY(-1px)" : "none",
          transition: "all 0.22s ease",
        }}
      >
        Join The Club
        <span style={{ transition: "transform 0.2s", transform: fillHover ? "translateX(3px)" : "none", display: "inline-block" }}>
          →
        </span>
      </button>

      <button
        onClick={() => scrollTo("#programs")}
        onMouseEnter={() => setOutlineHover(true)}
        onMouseLeave={() => setOutlineHover(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "12px 22px", background: outlineHover ? "rgba(28,26,21,0.03)" : "transparent",
          color: "var(--sf-fg)",
          border: outlineHover ? "1px solid rgba(28,26,21,0.22)" : "1px solid var(--sf-border)",
          borderRadius: 3,
          fontFamily: "var(--sf-mono)", fontSize: 10, fontWeight: 400,
          letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer",
          transform: outlineHover ? "translateY(-1px)" : "none",
          transition: "all 0.22s ease",
        }}
      >
        View Programs
      </button>

      <a
        href="tel:9019342121"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginLeft: 6,
          fontFamily: "var(--sf-mono)", fontSize: 10, fontWeight: 400,
          letterSpacing: "0.12em", color: "var(--sf-muted)", textDecoration: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--sf-fg)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--sf-muted)"; }}
      >
        <span style={{
          width: 26, height: 26, borderRadius: 6, background: "var(--sf-amber-dim)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "var(--sf-amber)",
        }}>
          ↗
        </span>
        9019342121
      </a>
    </motion.div>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div
      className="sf-stat"
      style={{
        padding: "clamp(18px, 2.5vh, 26px) 0 clamp(18px, 2.5vh, 26px) 20px",
        borderTop: "1px solid var(--sf-border)",
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "background 0.3s",
      }}
    >
      <span style={{
        fontFamily: "var(--sf-mono)", fontSize: 9, fontWeight: 400,
        letterSpacing: "0.26em", textTransform: "uppercase",
        color: "var(--sf-muted)", display: "block", marginBottom: 9,
      }}>
        {stat.tag}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "var(--sf-serif)", fontWeight: 200,
          fontSize: "clamp(40px, 4.5vw, 58px)",
          lineHeight: 1, letterSpacing: "-0.03em", color: "var(--sf-fg)",
          fontVariantNumeric: "tabular-nums",
        }}>
          {stat.value}
          <span style={{ fontStyle: "italic", color: "var(--sf-amber)", fontSize: "0.58em", marginLeft: 1 }}>
            {stat.suffix}
          </span>
        </span>
        <span style={{
          fontFamily: "var(--sf-mono)", fontSize: 9, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--sf-muted)", opacity: 0.5,
          textAlign: "right", lineHeight: 1.55,
        }}>
          {stat.aside[0]}<br />{stat.aside[1]}
        </span>
      </div>
    </div>
  );
}

function StatsPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Key statistics"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {STATS.map((s) => <StatItem key={s.tag} stat={s} />)}
      {/* Bottom border on last item */}
      <div style={{ borderBottom: "1px solid var(--sf-border)" }} />
    </motion.aside>
  );
}

function BottomBar() {
  const iconAmber: React.CSSProperties = { color: "var(--sf-amber)", fontSize: 10 };
  const iconIndigo: React.CSSProperties = { color: "var(--sf-indigo)", fontSize: 10 };
  const barItem: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 7,
    fontFamily: "var(--sf-mono)", fontSize: 9.5, fontWeight: 400,
    letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sf-muted)",
    textDecoration: "none",
  };
  const sep: React.CSSProperties = { width: 1, height: 14, background: "var(--sf-rule)", flexShrink: 0 };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 1.32, ease: "easeOut" }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "clamp(16px, 2.2vh, 24px) 0",
        borderTop: "1px solid var(--sf-border)",
        gap: 16, flexWrap: "wrap",
      }}
    >
      {/* Left group */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={barItem}>
          <span style={iconAmber}>⊙</span> Basavanagudi, Bangalore
        </a>
        <span style={sep} />
        <span style={barItem}>
          <span style={iconIndigo}>◷</span> 06:00 – 22:00 Daily
        </span>
        <span style={sep} />
        <span style={barItem}>
          <span style={iconAmber}>☑</span> Ranked #1 · Basavanagudi
        </span>
      </div>

      {/* Right group */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <a href="https://instagram.com/shields_basavanagudi" target="_blank" rel="noopener noreferrer" style={barItem}>
          <span>◈</span> @shields_fitness
        </a>
        <span style={sep} />
        {/* Scroll hint */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--sf-mono)", fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--sf-muted)", opacity: 0.4 }}>
          <div style={{ width: 15, height: 22, border: "1px solid rgba(28,26,21,0.18)", borderRadius: 8, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4 }}>
            <span className="sf-scroll-dot" style={{ width: 2, height: 5, borderRadius: 2, background: "var(--sf-amber)", display: "block" }} />
          </div>
          Scroll
        </div>
      </div>
    </motion.footer>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <>
      <StyleInjector />

      {/* Ambient orbs */}
      <div aria-hidden style={{ position: "fixed", borderRadius: 9999, pointerEvents: "none", filter: "blur(100px)", width: 700, height: 480, top: -120, right: -60, background: "radial-gradient(circle, rgba(196,132,26,0.10) 0%, transparent 70%)" }} />
      <div aria-hidden style={{ position: "fixed", borderRadius: 9999, pointerEvents: "none", filter: "blur(100px)", width: 500, height: 500, bottom: 0, left: -120, background: "radial-gradient(circle, rgba(91,77,181,0.07) 0%, transparent 70%)" }} />

      <section
        className="sf-grain"
        id="hero"
        style={{
          position: "relative", zIndex: 1,
          minHeight: "100svh",
          display: "grid", gridTemplateRows: "auto 1fr auto",
          padding: "0 clamp(24px, 7vw, 108px)",
          background: "var(--sf-bg)",
          color: "var(--sf-fg)",
          fontFamily: "var(--sf-serif)",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Topbar />

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "clamp(48px, 8vw, 96px)",
          alignItems: "center",
          padding: "clamp(52px, 9vh, 88px) 0",
        }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(28px, 4.5vh, 48px)" }}
            >
              <span style={{ width: 28, height: 1, background: "var(--sf-amber)", opacity: 0.55, flexShrink: 0, display: "block" }} />
              <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9.5, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--sf-amber)", opacity: 0.85 }}>
                Basavanagudi · Bangalore · Est. 2018
              </span>
            </motion.div>

            <Headline />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.88, ease: "easeOut" }}
              style={{
                fontFamily: "var(--sf-serif)", fontStyle: "italic", fontWeight: 200,
                fontSize: "clamp(15px, 1.7vw, 19px)", lineHeight: 1.72,
                color: "var(--sf-muted)", maxWidth: 420,
                marginBottom: "clamp(32px, 5vh, 52px)",
              }}
            >
              A premium training environment where discipline is the craft — built for those who refuse ordinary.
            </motion.p>

            <CTAs />
          </div>

          {/* Right */}
          <StatsPanel />
        </div>

        <BottomBar />
      </section>
    </>
  );
}