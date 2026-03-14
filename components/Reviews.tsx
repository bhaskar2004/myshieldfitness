"use client";

import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  FiStar, FiThumbsUp, FiChevronLeft, FiChevronRight,
  FiTrendingUp, FiAward, FiMessageSquare, FiArrowUpRight,
  FiPause, FiPlay,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  MdVerified, MdFormatQuote, MdEmojiEvents,
  MdStar, MdGroups, MdLocalFireDepartment,
} from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import { TbMoodHappy, TbTrendingUp, TbBarbell } from "react-icons/tb";

// ─── Data ───────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Runway Madhu",
    initials: "RM",
    date: "2 months ago",
    rating: 5,
    text: "The gym is well maintained with modern equipment and approachable trainers. I can already see improvements in my fitness. Great environment for workouts.",
    avatarBg: "from-orange-500 to-red-500",
    tag: "Equipment",
    tagIcon: TbBarbell,
    helpful: 14,
  },
  {
    name: "Hrudhay Mohan",
    initials: "HM",
    date: "2 months ago",
    rating: 5,
    text: "Very well maintained gym. The facility is clean, organized, and hygienic which makes workouts comfortable. Good variety of equipment.",
    avatarBg: "from-blue-500 to-indigo-600",
    tag: "Cleanliness",
    tagIcon: TbMoodHappy,
    helpful: 21,
  },
  {
    name: "Mahaveer Jain",
    initials: "MJ",
    date: "3 months ago",
    rating: 5,
    text: "Excellent gym and amazing trainers. Trainers like Rohan and Vasanth are motivating and knowledgeable.",
    avatarBg: "from-green-500 to-emerald-600",
    tag: "Trainers",
    tagIcon: MdLocalFireDepartment,
    helpful: 18,
  },
  {
    name: "Deepak Jayaram",
    initials: "DJ",
    date: "2 months ago",
    rating: 5,
    text: "Amazing gym with great facilities. Spacious, well-lit, and offers excellent equipment. Worth the price.",
    avatarBg: "from-purple-500 to-violet-600",
    tag: "Facilities",
    tagIcon: MdEmojiEvents,
    helpful: 16,
  },
  {
    name: "Pramod Armugam",
    initials: "PA",
    date: "1 year ago",
    rating: 5,
    text: "Absolutely amazing place. Great variety and quality of equipment, spacious layout, good services, and excellent hygiene.",
    avatarBg: "from-indigo-500 to-blue-600",
    tag: "Equipment",
    tagIcon: TbBarbell,
    helpful: 20,
  },
  {
    name: "Sutej Simha",
    initials: "SS",
    date: "4 months ago",
    rating: 5,
    text: "Great gym with excellent trainers and positive vibe. The equipment is top-notch and the gym is always clean.",
    avatarBg: "from-red-500 to-rose-600",
    tag: "Atmosphere",
    tagIcon: TbTrendingUp,
    helpful: 13,
  },
  {
    name: "Uma S",
    initials: "US",
    date: "2 months ago",
    rating: 5,
    text: "Top-tier gym with clean equipment, great music, and a motivating environment. One of the best gyms nearby.",
    avatarBg: "from-green-500 to-lime-600",
    tag: "Atmosphere",
    tagIcon: TbTrendingUp,
    helpful: 15,
  },
  {
    name: "Bhaskar NJ",
    initials: "BN",
    date: "4 months ago",
    rating: 5,
    text: "Great gym for transformation with certified trainers, good equipment, and friendly staff. Very affordable packages.",
    avatarBg: "from-yellow-500 to-orange-600",
    tag: "Transformation",
    tagIcon: TbTrendingUp,
    helpful: 25,
  },
  {
    name: "Arjun H K",
    initials: "AH",
    date: "1 month ago",
    rating: 5,
    text: "Perfect gym for beginners and regular fitness enthusiasts. Clean, spacious, and not overcrowded.",
    avatarBg: "from-sky-500 to-blue-600",
    tag: "Beginner Friendly",
    tagIcon: TbMoodHappy,
    helpful: 17,
  },
  {
    name: "Narayanan Thangavel",
    initials: "NT",
    date: "6 months ago",
    rating: 5,
    text: "Excellent timing, high quality equipment, and impressive cleanliness. The gym atmosphere is motivating.",
    avatarBg: "from-purple-500 to-indigo-600",
    tag: "Facility",
    tagIcon: MdEmojiEvents,
    helpful: 19,
  },
  {
    name: "Naveen Chandan",
    initials: "NC",
    date: "7 months ago",
    rating: 5,
    text: "Clean and welcoming gym with modern equipment and multiple classes. Overall great experience.",
    avatarBg: "from-teal-500 to-cyan-600",
    tag: "Community",
    tagIcon: MdGroups,
    helpful: 14,
  },
  {
    name: "Nikitha N",
    initials: "NN",
    date: "7 months ago",
    rating: 5,
    text: "Well-equipped and clean gym. After two months of training I am already seeing great results.",
    avatarBg: "from-pink-500 to-rose-600",
    tag: "Results",
    tagIcon: TbTrendingUp,
    helpful: 18,
  },
  {
    name: "Lavanya C",
    initials: "LC",
    date: "3 months ago",
    rating: 5,
    text: "Very good gym with supportive trainers and clean equipment. Highly recommended in Basavanagudi.",
    avatarBg: "from-green-400 to-emerald-600",
    tag: "Trainers",
    tagIcon: MdLocalFireDepartment,
    helpful: 12,
  },
  {
    name: "Mohmed Khan",
    initials: "MK",
    date: "7 months ago",
    rating: 5,
    text: "Clean space, top equipment, and great vibes. Best place to achieve fitness goals.",
    avatarBg: "from-orange-400 to-red-500",
    tag: "Equipment",
    tagIcon: TbBarbell,
    helpful: 10,
  },
  {
    name: "Chiranjeevi Vinayak",
    initials: "CV",
    date: "4 months ago",
    rating: 5,
    text: "Very friendly staff and experienced trainers. Highly recommend David sir as trainer.",
    avatarBg: "from-indigo-400 to-purple-600",
    tag: "Trainers",
    tagIcon: MdLocalFireDepartment,
    helpful: 13,
  },
  {
    name: "Sachin Gowda",
    initials: "SG",
    date: "2 years ago",
    rating: 5,
    text: "Very spacious and hygienic gym with great equipment. One of the best gyms in Basavanagudi.",
    avatarBg: "from-yellow-400 to-orange-500",
    tag: "Facility",
    tagIcon: MdEmojiEvents,
    helpful: 8,
  },
  {
    name: "Danish Dhanu",
    initials: "DD",
    date: "1 year ago",
    rating: 5,
    text: "Fantastic workout experience with modern machines, spacious layout, and helpful trainers.",
    avatarBg: "from-blue-400 to-indigo-600",
    tag: "Equipment",
    tagIcon: TbBarbell,
    helpful: 11,
  },
  {
    name: "Sathwik U",
    initials: "SU",
    date: "4 months ago",
    rating: 5,
    text: "Great environment and experienced trainers like David sir. Really good teaching and guidance.",
    avatarBg: "from-green-500 to-emerald-500",
    tag: "Trainers",
    tagIcon: MdLocalFireDepartment,
    helpful: 12,
  },
  {
    name: "Veer P",
    initials: "VP",
    date: "3 months ago",
    rating: 5,
    text: "Great trainers especially Vinod sir and David sir who teach new exercises and keep members motivated.",
    avatarBg: "from-blue-500 to-sky-600",
    tag: "Training",
    tagIcon: MdLocalFireDepartment,
    helpful: 14,
  },
  {
    name: "Dheeraj Raj",
    initials: "DR",
    date: "1 year ago",
    rating: 5,
    text: "Wonderful environment and great transformation guidance from coach Vasanth.",
    avatarBg: "from-purple-400 to-violet-600",
    tag: "Transformation",
    tagIcon: TbTrendingUp,
    helpful: 16,
  },
];

const highlights = [
  { icon: MdStar, value: "4.8", label: "Google Rating", color: "#fab515ff" },
  { icon: MdGroups, value: "287", label: "Reviews", color: "#60a5fa" },
  { icon: FiTrendingUp, value: "98%", label: "Recommend Us", color: "#03744b" },
  { icon: MdEmojiEvents, value: "#1", label: "In Basavanagudi", color: "var(--primary)" },
];

const AUTOPLAY_INTERVAL = 4000; // ms between featured rotations

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-black/15"}
        />
      ))}
    </div>
  );
}

// ─── Progress Bar (autoplay indicator) ───────────────────────────────────────

function ProgressBar({ active, paused }: { active: boolean; paused: boolean }) {
  return (
    <div className="h-[2px] w-full bg-foreground/[0.07] rounded-full overflow-hidden">
      {active && (
        <motion.div
          key={paused ? "paused" : "running"}
          className="h-full bg-accent rounded-full"
          initial={{ width: "0%" }}
          animate={paused ? {} : { width: "100%" }}
          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}

// ─── Highlight Banner ─────────────────────────────────────────────────────────

function HighlightBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.45 }}
      className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-foreground/[0.08] border border-foreground rounded-xl overflow-hidden mb-10 bg-foreground/[0.01]"
    >
      {highlights.map((h, i) => {
        const Icon = h.icon;
        return (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="flex items-center gap-3.5 px-6 py-5 hover:bg-foreground/[0.03] transition-colors group cursor-default"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: `${h.color}24` }}
            >
              <Icon style={{ color: h.color }} size={18} />
            </div>
            <div>
              <p className="text-text-hi font-mono font-bold text-xl leading-none">{h.value}</p>
              <p className="text-text-lo font-mono text-[10px] tracking-wider uppercase mt-1 opacity-80">{h.label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Featured / Auto-rotating Review ─────────────────────────────────────────

function FeaturedReview({ isInView }: { isInView: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [helped, setHelped] = useState<Record<number, boolean>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback(
    (next: number, dir: 1 | -1 = 1) => {
      setDirection(dir);
      setActiveIndex((next + reviews.length) % reviews.length);
    },
    []
  );

  const prev = () => goTo(activeIndex - 1, -1);
  const next = () => goTo(activeIndex + 1, 1);

  // Autoplay
  useEffect(() => {
    if (paused || !isInView) return;
    const id = setInterval(() => goTo(activeIndex + 1, 1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [activeIndex, paused, isInView, goTo]);

  const review = reviews[activeIndex];
  const TagIcon = review.tagIcon;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -40, scale: 0.98 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.55 }}
      className="col-span-full mb-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dot indicators + controls row */}
      <div className="flex items-center gap-3 mb-3">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous review"
          className="w-7 h-7 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent hover:border-accent/40 transition-all duration-200 flex-shrink-0"
        >
          <FiChevronLeft size={13} />
        </button>

        {/* Dot track */}
        <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${i === activeIndex
                ? "w-6 bg-accent"
                : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="font-mono text-[9px] tracking-widest text-text-lo flex-shrink-0">
          {String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
        </span>

        {/* Pause/play */}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
          className="w-7 h-7 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent hover:border-accent/40 transition-all duration-200 flex-shrink-0"
        >
          {paused ? <FiPlay size={11} /> : <FiPause size={11} />}
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next review"
          className="w-7 h-7 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent hover:border-accent/40 transition-all duration-200 flex-shrink-0"
        >
          <FiChevronRight size={13} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <ProgressBar active={isInView} paused={paused} />
      </div>

      {/* Card */}
      <div className="relative rounded-2xl border border-foreground overflow-hidden" style={{ minHeight: 180 }}>
        {/* BG */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--background) 50%, var(--background) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, var(--primary), transparent 60%)" }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
            className="relative flex flex-col md:flex-row gap-6 p-6 md:p-8"
          >
            {/* Watermark */}
            <RiDoubleQuotesL className="absolute top-6 right-6 text-black/[0.04] pointer-events-none" size={80} />

            {/* Left — reviewer */}
            <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 md:w-44">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-white font-bold text-lg font-mono shadow-lg flex-shrink-0`}>
                {review.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-text-hi font-mono font-bold text-sm">{review.name}</span>
                  <MdVerified className="text-blue-400 flex-shrink-0" size={14} />
                </div>
                <p className="text-text-lo font-mono text-[10px] tracking-widest mt-0.5">{review.date}</p>
                <div className="mt-2"><Stars rating={review.rating} size={12} /></div>
                <div className="flex items-center gap-1.5 mt-2">
                  <FcGoogle size={14} />
                  <span className="text-text-lo font-mono text-[9px] tracking-widest uppercase">Google Review</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-foreground/[0.06] flex-shrink-0" />

            {/* Right — content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-foreground">
                   <TagIcon className="text-primary" size={12} />
                   <span className="text-primary font-mono font-bold text-[10px] tracking-wider uppercase">{review.tag}</span>
                 </div>
                 <span className="text-primary font-mono font-bold text-[10px] tracking-wider uppercase bg-primary/5 px-2.5 py-1 rounded-sm border border-primary/20">
                   Featured Review
                 </span>
               </div>

              <p className="text-text-hi text-sm font-mono leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setHelped((h) => ({ ...h, [activeIndex]: !h[activeIndex] }))}
                  className={`flex items-center gap-1.5 font-mono text-xs transition-all duration-200 ${helped[activeIndex] ? "text-accent" : "text-text-lo hover:text-text-hi"}`}
                >
                  <FiThumbsUp size={11} className={helped[activeIndex] ? "fill-accent" : ""} />
                  Helpful ({review.helpful + (helped[activeIndex] ? 1 : 0)})
                </button>
                <a
                  href="https://g.co/kgs/shields"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-text-lo hover:text-text-mid transition-colors ml-auto"
                >
                  <FiMessageSquare size={11} /> Reply <FiArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  index,
  isInView,
}: {
  review: (typeof reviews)[0];
  index: number;
  isInView: boolean;
}) {
  const [helped, setHelped] = useState(false);
  const TagIcon = review.tagIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col bg-surface border border-foreground rounded-2xl p-5 hover:bg-foreground/[0.02] transition-all duration-300 group overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at top right, oklch(0.72 0.18 48 / 0.08), transparent 70%)" }}
      />
      <MdFormatQuote className="absolute bottom-4 right-4 text-black/[0.04] pointer-events-none" size={48} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-white font-bold text-sm font-mono shadow-md flex-shrink-0`}>
            {review.initials}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-text-hi font-mono font-bold text-sm leading-none">{review.name}</span>
              <MdVerified className="text-blue-400 flex-shrink-0" size={13} />
            </div>
            <p className="text-text-lo font-mono text-[9px] tracking-widest mt-0.5">{review.date}</p>
          </div>
        </div>
        <FcGoogle size={18} className="flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Stars rating={review.rating} />
        <div className="ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-foreground/[0.04] border border-foreground">
          <TagIcon className="text-text-lo" size={9} />
          <span className="text-text-lo font-mono text-[8px] tracking-widest uppercase">{review.tag}</span>
        </div>
      </div>

      <p className="text-text-mid text-xs font-mono leading-relaxed flex-1 mb-4">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-foreground">
        <button
          onClick={() => setHelped((h) => !h)}
          className={`flex items-center gap-1.5 font-mono text-[10px] transition-all duration-200 ${helped ? "text-accent" : "text-text-lo hover:text-text-hi"}`}
        >
          <FiThumbsUp size={10} className={helped ? "fill-accent" : ""} />
          Helpful ({review.helpful + (helped ? 1 : 0)})
        </button>
        <FiAward size={11} className={`ml-auto ${review.rating === 5 ? "text-yellow-500/60" : "text-black/15"}`} />
      </div>
    </motion.div>
  );
}

// ─── Write Review CTA ────────────────────────────────────────────────────────

function WriteReviewBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.a
      href="https://g.co/kgs/shields"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9 }}
      className="group flex flex-col xs:flex-row items-center justify-between gap-4 mt-8 rounded-xl border border-foreground bg-foreground/[0.02] px-6 py-4 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-foreground/[0.03] border border-foreground flex items-center justify-center flex-shrink-0">
          <FcGoogle size={20} />
        </div>
        <div>
          <p className="text-text-hi font-mono font-bold text-sm">Had a great experience?</p>
          <p className="text-text-lo font-mono text-[9px] tracking-widest mt-0.5">Share your story — it helps others find us</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-accent font-mono font-bold text-[10px] xs:text-xs tracking-widest uppercase group-hover:gap-3 transition-all">
        Write a Review <FiArrowUpRight size={13} />
      </div>
    </motion.a>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const titleY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(currentPage * perPage, currentPage * perPage + perPage);

  return (
    <section id="reviews" ref={sectionRef} className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      {/* Ambient */}
      <motion.div 
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-yellow-500/3 blur-[160px] rounded-full pointer-events-none" 
        style={{ y: bgY1 }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/4 blur-[140px] rounded-full pointer-events-none" 
        style={{ y: bgY2 }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-accent" />
              <FiStar className="text-accent" size={12} />
              <span className="text-accent text-[10px] tracking-[5px] uppercase font-mono font-bold">Member Reviews</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              style={{ y: titleY }}
              transition={{ delay: 0.1 }}
              className="text-3xl xs:text-4xl lg:text-6xl xl:text-7xl font-display text-text-hi leading-[0.92]"
            >
              REAL RESULTS,
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--primary)" }}>
                REAL PEOPLE
              </span>
            </motion.h2>
          </div>

          {/* Google rating card */}
          <motion.a
            href="https://g.co/kgs/shields"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="group flex flex-col sm:flex-row items-center gap-5 border border-foreground bg-foreground/[0.01] hover:bg-foreground/[0.03] rounded-2xl px-6 py-5 transition-all duration-300 w-full lg:w-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <FcGoogle size={22} />
                <span className="text-text-lo font-mono text-xs tracking-widest">Google</span>
              </div>
              <p className="text-text-hi font-display text-4xl sm:text-5xl leading-none">4.8</p>
              <div className="flex justify-center my-2"><Stars rating={5} size={14} /></div>
              <p className="text-text-lo font-mono text-[10px] tracking-widest">287 reviews</p>
            </div>
            <div className="hidden sm:block h-16 w-px bg-foreground/[0.06]" />
            <div className="w-full sm:w-auto space-y-2.5">
              {[5, 4, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="text-text-lo font-mono text-[10px] w-2">{n}</span>
                  <FiStar size={9} className="text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 sm:w-20 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-yellow-400" style={{ width: n === 5 ? "88%" : n === 4 ? "9%" : "3%" }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.a>
        </div>

        {/* ── Highlight Banner ── */}
        <HighlightBanner isInView={isInView} />

        {/* ── Auto-rotating Featured Review ── */}
        <FeaturedReview isInView={isInView} />

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8"
          >
            {visible.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="w-9 h-9 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`w-9 h-9 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${i === currentPage
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "border border-foreground text-text-lo hover:text-accent"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
            className="w-9 h-9 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
        </div>

        {/* ── Write Review CTA ── */}
        <WriteReviewBanner isInView={isInView} />
      </div>
    </section>
  );
}