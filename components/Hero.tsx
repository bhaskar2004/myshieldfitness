"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { tag: "Daily Access", value: "16", suffix: "hrs", aside: ["6 AM – 10 PM", "Every day"] },
  { tag: "Active Members", value: "500", suffix: "+", aside: ["Growing", "community"] },
  { tag: "Google Rating", value: "4.8", suffix: "★", aside: ["287+", "reviews"] },
  { tag: "Elite Trainers", value: "12", suffix: "+", aside: ["NSCA / ACE", "certified"] },
];

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;1,9..144,200;1,9..144,300&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --sf-bg:          var(--background);
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

  .sf-grain::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 200px; opacity: 0.022; mix-blend-mode: multiply;
  }

  .sf-slide-1 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.38s forwards; }
  .sf-slide-2 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.50s forwards; }
  .sf-slide-3 { transform: translateY(108%); animation: sfSlideUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.62s forwards; }
  .sf-slide-sub { transform: translateY(100%); animation: sfSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s forwards; }

  .sf-stat::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--sf-amber); transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .sf-stat:hover::before { transform: scaleY(1); }
  .sf-stat:hover { background: rgba(196,132,26,0.03); }

  .sf-blink { animation: sfBlink 2s ease infinite; }
  .sf-scroll-dot { animation: sfScroll 1.9s ease infinite; }

  @keyframes sfSlideUp  { to { transform: translateY(0); } }
  @keyframes sfBlink    { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes sfScroll   { 0%,100%{transform:translateY(0);opacity:.8} 50%{transform:translateY(8px);opacity:.12} }
`;

function StatItem({ stat }: any) {
  return (
    <div className="sf-stat" style={{ padding: "clamp(18px, 2.5vh, 26px) 0 clamp(18px, 2.5vh, 26px) 20px", borderTop: "1px solid var(--sf-border)", position: "relative", overflow: "hidden", cursor: "default", transition: "background 0.3s" }}>
      <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9, fontWeight: 400, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--sf-muted)", display: "block", marginBottom: 9 }}>
        {stat.tag}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--sf-serif)", fontWeight: 200, fontSize: "clamp(40px, 4.5vw, 58px)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--sf-fg)", fontVariantNumeric: "tabular-nums" }}>
          {stat.value}
          <span style={{ fontStyle: "italic", color: "var(--sf-amber)", fontSize: "0.58em", marginLeft: 1 }}>{stat.suffix}</span>
        </span>
        <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sf-muted)", opacity: 0.5, textAlign: "right", lineHeight: 1.55 }}>
          {stat.aside[0]}<br />{stat.aside[1]}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [fillHover, setFillHover] = useState(false);
  const [outlineHover, setOutlineHover] = useState(false);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div aria-hidden style={{ position: "fixed", borderRadius: 9999, pointerEvents: "none", filter: "blur(100px)", width: 700, height: 480, top: -120, right: -60, background: "radial-gradient(circle, rgba(196,132,26,0.10) 0%, transparent 70%)", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", borderRadius: 9999, pointerEvents: "none", filter: "blur(100px)", width: 500, height: 500, bottom: 0, left: -120, background: "radial-gradient(circle, rgba(91,77,181,0.07) 0%, transparent 70%)", zIndex: 0 }} />

      <section className="sf-grain" id="hero" style={{ position: "relative", zIndex: 1, minHeight: "100svh", display: "grid", gridTemplateRows: "auto 1fr auto", padding: "0 clamp(24px, 7vw, 108px)", background: "var(--sf-bg)", color: "var(--sf-fg)", fontFamily: "var(--sf-serif)", WebkitFontSmoothing: "antialiased" }}>

        <motion.header
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.05 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "clamp(22px, 3vh, 34px) 0", borderBottom: "1px solid var(--sf-border)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", border: "1px solid var(--sf-amber-dim)", borderRadius: 999, background: "var(--sf-amber-glow)" }}>
            <span className="sf-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#3da862", display: "block" }} />
            <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-amber)" }}>Open Now</span>
          </div>
        </motion.header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "clamp(48px, 8vw, 96px)", alignItems: "center", padding: "clamp(52px, 9vh, 88px) 0" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(28px, 4.5vh, 48px)" }}>
              <span style={{ width: 28, height: 1, background: "var(--sf-amber)", opacity: 0.55 }} />
              <span style={{ fontFamily: "var(--sf-mono)", fontSize: 9.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--sf-amber)" }}>Basavanagudi · Bangalore · Est. 2018</span>
            </motion.div>

            <div style={{ marginBottom: "clamp(18px, 3vh, 32px)" }}>
              <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <span className="sf-slide-1" style={{ display: "block", fontFamily: "var(--font-hero)", fontSize: "clamp(48px, 10.5vw, 148px)", letterSpacing: "-0.025em", fontStyle: "italic", fontWeight: 400 }}>Shield</span>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <span className="sf-slide-2" style={{ display: "block", fontFamily: "var(--font-hero)", fontSize: "clamp(48px, 10.5vw, 148px)", letterSpacing: "-0.025em", fontWeight: 400, WebkitTextStroke: "1.2px rgba(28,26,21,0.28)", color: "transparent" }}>Fitness</span>
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <span className="sf-slide-3" style={{ display: "block", fontFamily: "var(--font-hero)", fontSize: "clamp(48px, 10.5vw, 148px)", letterSpacing: "-0.025em", fontStyle: "italic", color: "var(--sf-amber)", fontWeight: 400 }}>Club</span>
              </div>
            </div>

            <div style={{ overflow: "hidden", marginTop: "clamp(10px, 1.8vh, 18px)" }}>
              <div className="sf-slide-sub" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 22, height: 1, background: "rgba(28,26,21,0.18)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--sf-mono)", fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--sf-muted)" }}>Unleash your peak</span>
              </div>
            </div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88 }} style={{ fontFamily: "var(--sf-serif)", fontStyle: "italic", fontWeight: 200, fontSize: "clamp(15px, 1.7vw, 19px)", lineHeight: 1.72, color: "var(--sf-muted)", maxWidth: 420, marginTop: "clamp(24px, 4vh, 40px)", marginBottom: "clamp(32px, 5vh, 52px)" }}>
              A premium training environment where discipline is the craft — built for those who refuse ordinary.
            </motion.p>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => scrollTo("#membership")} onMouseEnter={() => setFillHover(true)} onMouseLeave={() => setFillHover(false)} style={{ padding: "13px 26px", background: fillHover ? "var(--sf-amber-mid)" : "var(--sf-amber)", color: "#fff", border: "none", borderRadius: 3, fontFamily: "var(--sf-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.22s" }}>Join The Club</button>
              <button onClick={() => scrollTo("#facilities")} onMouseEnter={() => setOutlineHover(true)} onMouseLeave={() => setOutlineHover(false)} style={{ padding: "12px 22px", background: outlineHover ? "rgba(28,26,21,0.03)" : "transparent", color: "var(--sf-fg)", border: "1px solid var(--sf-border)", borderRadius: 3, fontFamily: "var(--sf-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.22s" }}>View Programs</button>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column" }}>
            {STATS.map((s) => <StatItem key={s.tag} stat={s} />)}
            <div style={{ borderBottom: "1px solid var(--sf-border)" }} />
          </aside>
        </div>

        <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(16px, 2.2vh, 24px) 0", borderTop: "1px solid var(--sf-border)", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "var(--sf-mono)", fontSize: 9.5, color: "var(--sf-muted)", textTransform: "uppercase" }}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>⊙ Basavanagudi, Bangalore</a>
            <span style={{ width: 1, height: 14, background: "var(--sf-rule)" }} />
            <span>◷ 06:00 – 22:00</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--sf-mono)", fontSize: 9, textTransform: "uppercase", color: "var(--sf-muted)", opacity: 0.4 }}>
            <div style={{ width: 15, height: 22, border: "1px solid rgba(28,26,21,0.18)", borderRadius: 8, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4 }}>
              <span className="sf-scroll-dot" style={{ width: 2, height: 5, borderRadius: 2, background: "var(--sf-amber)", display: "block" }} />
            </div>
            Scroll
          </div>
        </footer>
      </section>
    </>
  );
}