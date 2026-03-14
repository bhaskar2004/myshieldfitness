"use client";

import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Direction = "up" | "down" | "left" | "right" | "none";

type Preset =
  | "fade"          // opacity only
  | "slide"         // directional translate + fade
  | "blur"          // blur + fade
  | "scale"         // scale up + fade
  | "scaleDown"     // scale down + fade
  | "clipLeft"      // clip-path wipe from left
  | "clipRight"     // clip-path wipe from right
  | "clipTop"       // clip-path wipe from top
  | "clipBottom"    // clip-path wipe from bottom
  | "blurSlide"     // blur + directional translate + fade
  | "scaleBlur"     // scale + blur + fade
  | "rise"          // larger translate + blur + fade (dramatic)
  | "tilt";         // perspective tilt + fade

type Easing =
  | "spring"        // snappy spring
  | "smooth"        // silky ease-out
  | "bounce"        // slight overshoot
  | "expo"          // exponential ease-out
  | "linear";       // constant

// ─── Easing Map ──────────────────────────────────────────────────────────────

const EASINGS: Record<Easing, Transition> = {
  spring: { type: "spring", stiffness: 280, damping: 24 },
  smooth: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  bounce: { type: "spring", stiffness: 320, damping: 18 },
  expo:   { duration: 0.9,  ease: [0.16, 1, 0.3, 1]  },
  linear: { duration: 0.6,  ease: "linear"            },
};

// ─── Slide offset helper ──────────────────────────────────────────────────────

function slideOffset(dir: Direction, dist: number) {
  return {
    x: dir === "left" ? dist : dir === "right" ? -dist : 0,
    y: dir === "up"   ? dist : dir === "down"  ? -dist : 0,
  };
}

// ─── Preset builder ──────────────────────────────────────────────────────────

function buildVariants(
  preset: Preset,
  direction: Direction,
  distance: number,
  blur: number,
  scale: number,
): Variants {
  const off = slideOffset(direction, distance);

  switch (preset) {
    // ── fade ──────────────────────────────────────────────────────────────────
    case "fade":
      return {
        hidden:  { opacity: 0 },
        visible: { opacity: 1 },
      };

    // ── slide ─────────────────────────────────────────────────────────────────
    case "slide":
      return {
        hidden:  { opacity: 0, x: off.x, y: off.y },
        visible: { opacity: 1, x: 0,     y: 0      },
      };

    // ── blur ──────────────────────────────────────────────────────────────────
    case "blur":
      return {
        hidden:  { opacity: 0, filter: `blur(${blur}px)` },
        visible: { opacity: 1, filter: "blur(0px)"        },
      };

    // ── scale ─────────────────────────────────────────────────────────────────
    case "scale":
      return {
        hidden:  { opacity: 0, scale: scale },
        visible: { opacity: 1, scale: 1     },
      };

    // ── scaleDown ─────────────────────────────────────────────────────────────
    case "scaleDown":
      return {
        hidden:  { opacity: 0, scale: 2 - scale },
        visible: { opacity: 1, scale: 1          },
      };

    // ── clipLeft ──────────────────────────────────────────────────────────────
    case "clipLeft":
      return {
        hidden:  { opacity: 1, clipPath: "inset(0 100% 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0 0%   0 0)" },
      };

    // ── clipRight ─────────────────────────────────────────────────────────────
    case "clipRight":
      return {
        hidden:  { opacity: 1, clipPath: "inset(0 0 0 100%)" },
        visible: { opacity: 1, clipPath: "inset(0 0 0 0%)"   },
      };

    // ── clipTop ───────────────────────────────────────────────────────────────
    case "clipTop":
      return {
        hidden:  { opacity: 1, clipPath: "inset(0 0 100% 0)" },
        visible: { opacity: 1, clipPath: "inset(0 0 0%   0)" },
      };

    // ── clipBottom ────────────────────────────────────────────────────────────
    case "clipBottom":
      return {
        hidden:  { opacity: 1, clipPath: "inset(100% 0 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0%   0 0 0)" },
      };

    // ── blurSlide ─────────────────────────────────────────────────────────────
    case "blurSlide":
      return {
        hidden:  { opacity: 0, x: off.x, y: off.y, filter: `blur(${blur}px)` },
        visible: { opacity: 1, x: 0,     y: 0,      filter: "blur(0px)"       },
      };

    // ── scaleBlur ─────────────────────────────────────────────────────────────
    case "scaleBlur":
      return {
        hidden:  { opacity: 0, scale: scale, filter: `blur(${blur}px)` },
        visible: { opacity: 1, scale: 1,     filter: "blur(0px)"       },
      };

    // ── rise (dramatic entrance) ───────────────────────────────────────────────
    case "rise":
      return {
        hidden:  { opacity: 0, y: distance * 2, filter: `blur(${blur * 1.5}px)` },
        visible: { opacity: 1, y: 0,            filter: "blur(0px)"               },
      };

    // ── tilt ──────────────────────────────────────────────────────────────────
    case "tilt":
      return {
        hidden: {
          opacity: 0,
          rotateX: direction === "up" || direction === "none" ? 14 : -14,
          y: off.y || distance * 0.6,
          filter: `blur(${blur * 0.5}px)`,
        },
        visible: { opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" },
      };

    default:
      return {
        hidden:  { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0        },
      };
  }
}

// ─── Stagger wrapper variants ─────────────────────────────────────────────────

function buildStaggerVariants(staggerDelay: number): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SectionRevealProps {
  children: React.ReactNode;

  /** Animation preset. Default: "blurSlide" */
  preset?: Preset;

  /** Slide direction (used by slide/blurSlide/rise/tilt presets). Default: "up" */
  direction?: Direction;

  /** Entry delay in seconds. Default: 0 */
  delay?: number;

  /** Easing curve. Default: "expo" */
  easing?: Easing;

  /** Translate distance in px (slide-based presets). Default: 40 */
  distance?: number;

  /** Blur radius in px (blur-based presets). Default: 10 */
  blurAmount?: number;

  /** Scale origin value (scale presets). Default: 0.88 */
  scaleAmount?: number;

  /** Intersection margin before triggering. Default: "-80px" */
  margin?: string;

  /** Only trigger once (true) or re-trigger on scroll (false). Default: true */
  once?: boolean;

  /** Wrap children in a stagger container (they must also be motion elements). Default: false */
  stagger?: boolean;

  /** Delay between staggered children in seconds. Default: 0.08 */
  staggerDelay?: number;

  /** Custom className on the wrapper. */
  className?: string;

  /** Custom style on the wrapper. */
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SectionReveal({
  children,
  preset      = "blurSlide",
  direction   = "up",
  delay       = 0,
  easing      = "expo",
  distance    = 40,
  blurAmount  = 10,
  scaleAmount = 0.88,
  margin      = "-80px",
  once        = true,
  stagger     = false,
  staggerDelay = 0.08,
  className,
  style,
}: SectionRevealProps) {
  const ref     = useRef(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  const baseTransition: Transition = {
    ...EASINGS[easing],
    // spring types don't accept `delay` at the top level for some versions,
    // so we also spread it explicitly here:
    delay,
  };

  // For spring presets, framer-motion accepts delay on the spring object
  const transition: Transition =
    easing === "spring" || easing === "bounce"
      ? { ...baseTransition, delay }
      : baseTransition;

  const animVariants = buildVariants(preset, direction, distance, blurAmount, scaleAmount);

  // Merge transition into visible state
  const mergedVariants: Variants = {
    hidden:  animVariants.hidden,
    visible: {
      ...animVariants.visible,
      transition,
    },
  };

  if (stagger) {
    const staggerVariants = buildStaggerVariants(staggerDelay);
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ ...staggerVariants, hidden: staggerVariants.hidden }}
        className={className}
        style={style}
      >
        {/* Each direct child should be wrapped in a SectionReveal or motion.div
            with variants={{ hidden, visible }} to participate in the stagger */}
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={mergedVariants}
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Child ────────────────────────────────────────────────────────────
// Drop-in child for <SectionReveal stagger> containers.
// It inherits the stagger timing from the parent automatically.

export interface StaggerChildProps {
  children: React.ReactNode;
  preset?:  Preset;
  direction?: Direction;
  distance?:  number;
  blurAmount?: number;
  scaleAmount?: number;
  easing?: Easing;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerChild({
  children,
  preset      = "blurSlide",
  direction   = "up",
  distance    = 32,
  blurAmount  = 8,
  scaleAmount = 0.9,
  easing      = "expo",
  className,
  style,
}: StaggerChildProps) {
  const childVariants = buildVariants(preset, direction, distance, blurAmount, scaleAmount);
  const childTransition: Transition = { ...EASINGS[easing] };

  const mergedVariants: Variants = {
    hidden:  childVariants.hidden,
    visible: { ...childVariants.visible, transition: childTransition },
  };

  return (
    <motion.div
      variants={mergedVariants}
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
    >
      {children}
    </motion.div>
  );
}
