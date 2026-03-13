"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiStar, FiThumbsUp, FiChevronLeft, FiChevronRight,
  FiTrendingUp, FiAward, FiMessageSquare, FiArrowUpRight,
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
    name: "Suresh Murthy",
    initials: "SM",
    date: "2 weeks ago",
    rating: 5,
    text: "Great gym with a motivating environment and well-maintained equipment. The trainers are supportive and helpful for both beginners and experienced members. Highly recommended!",
    avatarBg: "from-orange-500 to-red-500",
    tag: "Equipment",
    tagIcon: TbBarbell,
    helpful: 14,
  },
  {
    name: "Ananya Krishnan",
    initials: "AK",
    date: "1 month ago",
    rating: 5,
    text: "Shield's Fitness has completely changed my life. In just 3 months I've lost 8kg and built visible muscle. The trainer Rajesh is exceptional — patient, knowledgeable, and always motivating.",
    avatarBg: "from-blue-500 to-indigo-600",
    tag: "Transformation",
    tagIcon: TbTrendingUp,
    helpful: 31,
  },
  {
    name: "Vikram Shetty",
    initials: "VS",
    date: "3 weeks ago",
    rating: 5,
    text: "Best gym in Basavanagudi by a mile. The equipment is always clean and working, the space is well-organized, and the trainers actually care about your progress. 5 stars easily.",
    avatarBg: "from-green-500 to-emerald-600",
    tag: "Facility",
    tagIcon: MdLocalFireDepartment,
    helpful: 22,
  },
  {
    name: "Deepa Narayanan",
    initials: "DN",
    date: "1 month ago",
    rating: 5,
    text: "I was a complete beginner when I joined, and the team made me feel so comfortable. The training sessions are well-structured and the progress I've made in 4 months is incredible.",
    avatarBg: "from-purple-500 to-violet-600",
    tag: "Beginner Friendly",
    tagIcon: TbMoodHappy,
    helpful: 18,
  },
  {
    name: "Kiran Hegde",
    initials: "KH",
    date: "2 months ago",
    rating: 5,
    text: "Above KFC is a great location, easy to find. Gym is on the 3rd floor with a surprisingly spacious layout. Very clean, modern equipment. The trainer guided me well on form and nutrition.",
    avatarBg: "from-red-500 to-rose-600",
    tag: "Location",
    tagIcon: MdGroups,
    helpful: 9,
  },
  {
    name: "Pradeep Bhat",
    initials: "PB",
    date: "3 months ago",
    rating: 4,
    text: "Excellent gym overall. Great variety of equipment, dedicated trainers, and a real community feel. The premium membership is worth every rupee. My strength gains have been phenomenal.",
    avatarBg: "from-indigo-500 to-blue-600",
    tag: "Community",
    tagIcon: MdEmojiEvents,
    helpful: 26,
  },
];

const highlights = [
  { icon: MdStar, value: "4.8", label: "Google Rating", color: "#facc15" },
  { icon: MdGroups, value: "287", label: "Reviews", color: "#60a5fa" },
  { icon: FiTrendingUp, value: "98%", label: "Recommend Us", color: "#34d399" },
  { icon: MdEmojiEvents, value: "#1", label: "In Basavanagudi", color: "var(--primary)" },
];

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

// ─── Highlight Banner ─────────────────────────────────────────────────────────

function HighlightBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.45 }}
      className="grid grid-cols-2 md:grid-cols-4 divide-foreground/[0.07] border border-foreground rounded-xl overflow-hidden mb-10"
    >
      {highlights.map((h, i) => {
        const Icon = h.icon;
        return (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="flex items-center gap-3.5 px-5 py-4 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-colors group cursor-default"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: h.color.includes('rgb') ? h.color.replace('rgb(', 'rgba(').replace(')', ', 0.12)') : `${h.color}1f` }}
            >
              <Icon style={{ color: h.color }} size={16} />
            </div>
            <div>
              <p className="text-text-hi font-mono font-bold text-lg leading-none">{h.value}</p>
              <p className="text-text-lo font-mono text-[9px] tracking-widest uppercase mt-0.5">{h.label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Featured / Top Review ────────────────────────────────────────────────────

function FeaturedReview({ review, isInView }: { review: typeof reviews[0]; isInView: boolean }) {
  const [helped, setHelped] = useState(false);
  const TagIcon = review.tagIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.55 }}
      className="relative col-span-full rounded-2xl border border-foreground overflow-hidden mb-5 group"
    >
      {/* BG gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--contact-bg) 0%, var(--foreground) 50%, var(--foreground) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, var(--primary), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row gap-6 p-6 md:p-8">
        {/* Quote icon watermark */}
        <RiDoubleQuotesL
          className="absolute top-6 right-6 text-black/[0.04] pointer-events-none"
          size={80}
        />

        {/* Left — reviewer info */}
        <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 md:w-44">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-white font-bold text-lg font-mono shadow-lg flex-shrink-0`}
          >
            {review.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-text-hi font-mono font-bold text-sm">{review.name}</span>
              <MdVerified className="text-blue-400 flex-shrink-0" size={14} />
            </div>
            <p className="text-text-lo font-mono text-[10px] tracking-widest mt-0.5">{review.date}</p>
            <div className="mt-2">
              <Stars rating={review.rating} size={12} />
            </div>
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/15 border border-foreground">
              <TagIcon className="text-accent" size={11} />
              <span className="text-accent font-mono font-bold text-[9px] tracking-widest uppercase">
                {review.tag}
              </span>
            </div>
            <span className="text-accent font-mono text-[10px] tracking-widest uppercase bg-accent/10 px-2 py-0.5 rounded-sm">
              Top Review
            </span>
          </div>

          <p className="text-text-hi text-sm font-mono leading-relaxed mb-4">
            &ldquo;{review.text}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setHelped((h) => !h)}
              className={`flex items-center gap-1.5 font-mono text-xs transition-all duration-200 ${helped ? "text-accent" : "text-text-lo hover:text-text-hi"
                }`}
            >
              <FiThumbsUp size={11} className={helped ? "fill-accent" : ""} />
              Helpful ({review.helpful + (helped ? 1 : 0)})
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
  review: typeof reviews[0];
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
      {/* Subtle corner glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at top right, oklch(0.72 0.18 48 / 0.08), transparent 70%)" }} />

      {/* Watermark quote */}
      <MdFormatQuote
        className="absolute bottom-4 right-4 text-black/[0.04] pointer-events-none"
        size={48}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-white font-bold text-sm font-mono shadow-md flex-shrink-0`}
          >
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

      {/* Stars + tag row */}
      <div className="flex items-center gap-2 mb-3">
        <Stars rating={review.rating} />
        <div className="ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-foreground/[0.04] border border-foreground">
          <TagIcon className="text-text-lo" size={9} />
          <span className="text-text-lo font-mono text-[8px] tracking-widest uppercase">{review.tag}</span>
        </div>
      </div>

      {/* Text */}
      <p className="text-text-mid text-xs font-mono leading-relaxed flex-1 mb-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-foreground">
        <button
          onClick={() => setHelped((h) => !h)}
          className={`flex items-center gap-1.5 font-mono text-[10px] transition-all duration-200 ${helped ? "text-accent" : "text-text-lo hover:text-text-hi"
            }`}
        >
          <FiThumbsUp size={10} className={helped ? "fill-accent" : ""} />
          Helpful ({review.helpful + (helped ? 1 : 0)})
        </button>
        <FiAward
          size={11}
          className={`ml-auto ${review.rating === 5 ? "text-yellow-500/60" : "text-black/15"}`}
        />
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
          <p className="text-text-lo font-mono text-[9px] tracking-widest mt-0.5">
            Share your story — it helps others find us
          </p>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil((reviews.length - 1) / perPage); // -1 for featured
  const restReviews = reviews.slice(1);
  const visible = restReviews.slice(currentPage * perPage, currentPage * perPage + perPage);

  return (
    <section id="reviews" ref={ref} className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-yellow-500/3 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/4 blur-[140px] rounded-full pointer-events-none" />

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
              <span className="text-accent text-[10px] tracking-[5px] uppercase font-mono font-bold">
                Member Reviews
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl xs:text-5xl lg:text-6xl xl:text-7xl font-display font-black italic text-text-hi leading-[0.92]"
            >
              REAL RESULTS,
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--primary)" }}
              >
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
              <p className="text-text-hi font-display font-black text-4xl sm:text-5xl leading-none">4.8</p>
              <div className="flex justify-center my-2">
                <Stars rating={5} size={14} />
              </div>
              <p className="text-text-lo font-mono text-[10px] tracking-widest">287 reviews</p>
            </div>
            <div className="hidden sm:block h-16 w-px bg-foreground/[0.06]" />
            <div className="w-full sm:w-auto space-y-2.5">
              {[5, 4, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="text-text-lo font-mono text-[10px] w-2">{n}</span>
                  <FiStar size={9} className="text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 sm:w-20 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: n === 5 ? "88%" : n === 4 ? "9%" : "3%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.a>
        </div>

        {/* ── Highlight Banner ── */}
        <HighlightBanner isInView={isInView} />

        {/* ── Featured Review ── */}
        <FeaturedReview review={reviews[0]} isInView={isInView} />

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
            aria-label="Previous page of reviews"
            className="w-9 h-9 rounded-lg border border-foreground flex items-center justify-center text-text-lo hover:text-accent transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              aria-label={`Go to page ${i + 1}`}
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
            aria-label="Next page of reviews"
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