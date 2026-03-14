"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// ─── Color system — matches Hero exactly ──────────────────────────────────────
const accentL = "0.72 0.18 48";
const indigoL = "0.50 0.150 280";
const ACCENT = `oklch(${accentL})`;
const INDIGO = `oklch(${indigoL})`;
const aa = (a: number) => `oklch(${accentL} / ${a})`;
const ia = (a: number) => `oklch(${indigoL} / ${a})`;

// ─── Arc progress ring — much more elegant than a flat bar ───────────────────
function ArcProgress({ progress, size = 160 }: { progress: number; size?: number }) {
    const cx = size / 2;
    const cy = size / 2;

    // Three rings at different radii
    const rings = [
        { r: 70, color: aa(0.14), dash: "4 8", speed: 60, dir: 1 },
        { r: 56, color: ia(0.18), dash: "none", speed: 0, dir: 0 }, // static
        { r: 40, color: aa(0.22), dash: "8 6", speed: 22, dir: -1 },
    ];

    // Progress arc — outermost
    const RADIUS = 72;
    const circ = 2 * Math.PI * RADIUS;
    const offset = circ * (1 - progress);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
            {/* Atmosphere glow */}
            <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.10" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                </radialGradient>
                <filter id="bloom">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <circle cx={cx} cy={cy} r={76} fill="url(#glow)" />

            {/* Decorative rings */}
            {rings.map((ring, i) => (
                <motion.circle key={i}
                    cx={cx} cy={cy} r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={i === 1 ? "0.75" : "1"}
                    strokeDasharray={ring.dash === "none" ? undefined : ring.dash}
                    animate={ring.speed ? { rotate: ring.dir * 360 } : undefined}
                    transition={ring.speed ? { duration: ring.speed, ease: "linear", repeat: Infinity } : undefined}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
            ))}

            {/* Progress track */}
            <circle cx={cx} cy={cy} r={RADIUS}
                fill="none" stroke={aa(0.08)} strokeWidth="1.5"
                style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }} />

            {/* Progress fill — animated stroke-dashoffset */}
            <motion.circle cx={cx} cy={cy} r={RADIUS}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.05, ease: "linear" }}
                filter="url(#bloom)"
                style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Leading dot — glows at the progress tip */}
            {progress > 0.02 && (
                <motion.circle
                    r="3"
                    fill={ACCENT}
                    filter="url(#bloom)"
                    initial={{
                        cx: cx + RADIUS * Math.cos((0.02 * 2 * Math.PI) - Math.PI / 2),
                        cy: cy + RADIUS * Math.sin((0.02 * 2 * Math.PI) - Math.PI / 2),
                    }}
                    animate={{
                        cx: cx + RADIUS * Math.cos((progress * 2 * Math.PI) - Math.PI / 2),
                        cy: cy + RADIUS * Math.sin((progress * 2 * Math.PI) - Math.PI / 2),
                    }}
                    transition={{ duration: 0.05, ease: "linear" }}
                />
            )}

            {/* Cardinal ticks */}
            {[0, 90, 180, 270].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                return (
                    <line key={i}
                        x1={cx + 78 * Math.cos(rad)} y1={cy + 78 * Math.sin(rad)}
                        x2={cx + 68 * Math.cos(rad)} y2={cy + 68 * Math.sin(rad)}
                        stroke={aa(0.30)} strokeWidth="1.5" />
                );
            })}

            {/* Centre reticle */}
            <circle cx={cx} cy={cy} r="4" fill={ACCENT} />
            <circle cx={cx} cy={cy} r="11" fill="none" stroke={aa(0.30)} strokeWidth="0.75" />
            <motion.circle cx={cx} cy={cy} r="18"
                fill="none" stroke={aa(0.12)} strokeWidth="0.5"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    );
}

// ─── Boot sequence lines ───────────────────────────────────────────────────────
const BOOT_LINES = [
    { text: "CORE SYSTEMS ONLINE", delay: 0.10, color: aa(0.55) },
    { text: "LOADING TRAINING STACK", delay: 0.55, color: ia(0.55) },
    { text: "CALIBRATING INTENSITY", delay: 1.00, color: aa(0.55) },
    { text: "READY", delay: 1.45, color: ACCENT },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Loader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Smooth progress that reaches ~95% naturally, then jumps to 100% on exit
    useEffect(() => {
        const DURATION = 1600; // ms — matches setTimeout below
        const startTime = performance.now();

        const tick = () => {
            const elapsed = performance.now() - startTime;
            const t = Math.min(elapsed / DURATION, 1);
            // Ease-out cubic — fast start, slows near end
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased);
            if (t < 1) requestAnimationFrame(tick);
            else setProgress(1);
        };

        const raf = requestAnimationFrame(tick);
        const timer = setTimeout(() => setLoading(false), 1900);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        // Curtain wipe upward — more dramatic than a plain fade
                        clipPath: ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"],
                        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "var(--background)" }}
                >
                    {/* ── Noise texture ── */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.032] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: "200px 200px",
                        }} />

                    {/* ── Grid ── */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(${aa(0.04)} 1px, transparent 1px), linear-gradient(90deg, ${aa(0.04)} 1px, transparent 1px)`,
                            backgroundSize: "64px 64px",
                        }} />

                    {/* ── Glow orb ── */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
                        style={{
                            background: `radial-gradient(circle, ${aa(0.08)} 0%, transparent 68%)`,
                            filter: "blur(24px)",
                        }} />

                    {/* ── Logo + ring composition ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Arc progress ring */}
                        <ArcProgress progress={progress} size={160} />

                        {/* Logo card — centred inside the ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                                {/* Glow behind logo */}
                                <div className="absolute inset-0 rounded-xl blur-xl opacity-25"
                                    style={{ background: ACCENT }} />
                                {/* Card */}
                                <div className="absolute inset-0 rounded-xl overflow-hidden"
                                    style={{
                                        background: "var(--card)",
                                        border: "1px solid var(--foreground)",
                                        boxShadow: `0 4px 24px ${aa(0.14)}, 0 1px 2px oklch(0 0 0 / 0.06)`,
                                    }} />
                                <div className="absolute inset-0 flex items-center justify-center p-2.5">
                                    <Image
                                        src="/favicon.jpg"
                                        alt="Shield Fitness Club"
                                        width={64}
                                        height={64}
                                        priority
                                        className="w-full h-full object-contain rounded-lg opacity-90"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Brand name ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 flex flex-col items-center gap-1"
                    >
                        {/* Primary — large, italic display */}
                        <span style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 400,
                            fontSize: "clamp(22px, 5vw, 30px)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            lineHeight: 1,
                            color: "var(--foreground)",
                        }}>
                            Shield&apos;s
                        </span>

                        {/* Separator line + tagline */}
                        <div className="flex items-center gap-3 mt-1">
                            <div className="h-px w-5" style={{ background: aa(0.40) }} />
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontWeight: 500,
                                fontSize: "9px",
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                                lineHeight: 1,
                                color: "var(--muted-foreground)",
                                opacity: 0.55,
                            }}>
                                Engineered for Intensity
                            </span>
                            <div className="h-px w-5" style={{ background: aa(0.40) }} />
                        </div>
                    </motion.div>

                    {/* ── Boot sequence ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="mt-8 flex flex-col items-center gap-1.5"
                        aria-hidden
                    >
                        {BOOT_LINES.map((line, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: line.delay, duration: 0.4, ease: "easeOut" }}
                                className="flex items-center gap-2"
                            >
                                {/* Bullet */}
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: line.delay + 0.1, duration: 0.3 }}
                                    style={{
                                        width: 3,
                                        height: 3,
                                        borderRadius: "50%",
                                        background: line.color,
                                        display: "inline-block",
                                        flexShrink: 0,
                                    }} />
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontWeight: i === BOOT_LINES.length - 1 ? 700 : 400,
                                    fontSize: "9px",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    lineHeight: 1,
                                    color: line.color,
                                }}>
                                    {line.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── HUD corners — committed, actually readable ── */}
                    <div className="absolute inset-x-6 bottom-6 flex justify-between items-end pointer-events-none hidden sm:flex"
                        style={{ opacity: 0.22 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.12em", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
                                VER: 2.0.UX<br />
                                SYS: SHIELD_CORE
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.5 }}
                            style={{ textAlign: "right" }}
                        >
                            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.12em", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
                                LOC: BLR · BASAVANAGUDI<br />
                                STATUS: ONLINE
                            </p>
                        </motion.div>
                    </div>

                    {/* ── Corner bracket marks — architectural accent ── */}
                    {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                        <div key={pos} className="absolute pointer-events-none hidden sm:block"
                            style={{
                                top: pos.startsWith("t") ? 20 : "auto",
                                bottom: pos.startsWith("b") ? 20 : "auto",
                                left: pos.endsWith("l") ? 20 : "auto",
                                right: pos.endsWith("r") ? 20 : "auto",
                            }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                                {pos === "tl" && <><line x1="0" y1="0" x2="16" y2="0" stroke="var(--foreground)" strokeWidth="1" /><line x1="0" y1="0" x2="0" y2="16" stroke="var(--foreground)" strokeWidth="1" /></>}
                                {pos === "tr" && <><line x1="0" y1="0" x2="16" y2="0" stroke="var(--foreground)" strokeWidth="1" /><line x1="16" y1="0" x2="16" y2="16" stroke="var(--foreground)" strokeWidth="1" /></>}
                                {pos === "bl" && <><line x1="0" y1="16" x2="16" y2="16" stroke="var(--foreground)" strokeWidth="1" /><line x1="0" y1="0" x2="0" y2="16" stroke="var(--foreground)" strokeWidth="1" /></>}
                                {pos === "br" && <><line x1="0" y1="16" x2="16" y2="16" stroke="var(--foreground)" strokeWidth="1" /><line x1="16" y1="0" x2="16" y2="16" stroke="var(--foreground)" strokeWidth="1" /></>}
                            </svg>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}