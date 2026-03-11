"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaFire,
  FaTrophy,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import {
  FiHeart,
  FiMessageSquare,
  FiArrowUpRight,
  FiSend,
  FiBookmark,
  FiShare2,
  FiTrendingUp,
  FiZap,
  FiCamera,
  FiAward,
  FiStar,
} from "react-icons/fi";
import {
  MdOutlineVerified,
  MdLocalFireDepartment,
  MdEmojiEvents,
  MdGroups,
  MdFitnessCenter,
} from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import { FaHandRock } from "react-icons/fa";

// ─── Data ───────────────────────────────────────────────────────────────────

const INSTAGRAM_URL = "https://www.instagram.com/shields_basavanagudi/";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    likes: 1420,
    comments: 183,
    shares: 24,
    saves: 67,
    caption: "Early morning gains. Nothing beats 5am when the gym is all yours. #shieldsfit",
    tag: "Training",
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    likes: 2890,
    comments: 312,
    shares: 45,
    saves: 120,
    caption: "New equipment just dropped! #Basavanagudi",
    tag: "Facility",
  },
  {
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    likes: 1980,
    comments: 241,
    shares: 18,
    saves: 89,
    caption: "Free weights section ready for you.",
    tag: "Equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
    likes: 3150,
    comments: 428,
    shares: 76,
    saves: 201,
    caption: "Transformation Tuesday! Real results.",
    tag: "Results",
  },
  {
    src: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80",
    likes: 2670,
    comments: 350,
    shares: 33,
    saves: 145,
    caption: "Personal training session. #ShieldsFitness",
    tag: "Personal",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    likes: 1890,
    comments: 220,
    shares: 29,
    saves: 93,
    caption: "Group fitness is the best motivation.",
    tag: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
    likes: 2200,
    comments: 175,
    shares: 41,
    saves: 110,
    caption: "Late night hustle. The grind never stops. #ShieldsFit",
    tag: "Lifestyle",
  },
];

const stats = [
  { icon: FaUsers, label: "Followers", value: "4.3K+", color: "var(--primary)" },
  { icon: FiCamera, label: "Posts", value: "820+", color: "var(--primary)" },
  { icon: FiTrendingUp, label: "Avg. Reach", value: "12K", color: "var(--primary)" },
  { icon: FiHeart, label: "Total Likes", value: "98K+", color: "var(--primary)" },
];

const tagMeta: Record<string, { bg: string; text: string; Icon: React.ElementType }> = {
  Training: { bg: "var(--primary)", text: "var(--primary-foreground)", Icon: MdFitnessCenter },
  Facility: { bg: "oklch(0.50 0.150 280)", text: "var(--primary-foreground)", Icon: FiZap },
  Equipment: { bg: "oklch(0.65 0.150 250)", text: "var(--primary-foreground)", Icon: FiAward },
  Results: { bg: "oklch(0.60 0.150 150)", text: "var(--primary-foreground)", Icon: MdEmojiEvents },
  Personal: { bg: "oklch(0.55 0.150 350)", text: "var(--primary-foreground)", Icon: FaStar },
  Community: { bg: "oklch(0.70 0.150 80)", text: "var(--primary-foreground)", Icon: MdGroups },
  Lifestyle: { bg: "oklch(0.45 0.020 250)", text: "var(--primary-foreground)", Icon: MdLocalFireDepartment },
};

const tickerItems = [
  { icon: MdFitnessCenter, label: "EARLY MORNING SESSIONS" },
  { icon: FaFire, label: "NEW EQUIPMENT ARRIVED" },
  { icon: FaTrophy, label: "TRANSFORMATION RESULTS" },
  { icon: FiZap, label: "PERSONAL TRAINING" },
  { icon: FaHandRock, label: "GROUP CLASSES DAILY" },
  { icon: FiMoon, label: "NIGHT SESSIONS OPEN" },
  { icon: FaInstagram, label: "FOLLOW @shields_basavanagudi" },
  { icon: FiStar, label: "REAL RESULTS REAL PEOPLE" },
];

function fmtNum(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

// ─── Ticker Banner ──────────────────────────────────────────────────────────

function TickerBanner() {
  return (
    <div className="relative overflow-hidden bg-accent/95 py-2.5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-white font-mono font-bold text-[11px] tracking-[3px] uppercase px-8"
          >
            <item.icon size={13} className="text-white/70" />
            {item.label}
            <span className="text-white/30 text-base">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Stats Banner ────────────────────────────────────────────────────────────

function StatsBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
    >
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 + i * 0.07 }}
            className="relative flex items-center gap-3.5 rounded-xl border border-foreground/[0.05] bg-surface px-4 py-3.5 overflow-hidden group hover:border-accent/40 transition-all duration-300 cursor-default"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
              style={{ background: `${s.color}22` }}
            >
              <Icon style={{ color: s.color }} size={18} />
            </div>
            <div>
              <p className="text-text-hi font-mono font-bold text-xl leading-none">{s.value}</p>
              <p className="text-text-lo font-mono text-[10px] tracking-widest uppercase mt-1">{s.label}</p>
            </div>
            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Promo / Live Banner ──────────────────────────────────────────────────────

function PromoBanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.65 }}
      className="group flex items-center gap-4 rounded-xl border border-primary/25 bg-primary/[0.06] hover:bg-primary/[0.12] hover:border-primary/50 px-5 py-3.5 mb-6 transition-all duration-300"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <RiLiveLine className="text-red-500 animate-pulse" size={18} />
        <span className="text-red-400 font-mono font-bold text-[10px] tracking-widest uppercase">
          Live
        </span>
      </div>
      <div className="h-4 w-px bg-foreground/10 flex-shrink-0" />
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <FaTrophy className="text-accent flex-shrink-0" size={13} />
        <span className="text-text-mid font-mono text-xs truncate">
          This week's transformation winner just posted — see the results!
        </span>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1.5 text-accent font-mono text-[11px] font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 group-hover:gap-2 transition-all">
        See post <FiArrowUpRight size={12} />
      </div>
    </motion.a>
  );
}

// ─── Post Card ───────────────────────────────────────────────────────────────

function PostCard({
  post,
  index,
  isInView,
  featured = false,
}: {
  post: (typeof posts)[0];
  index: number;
  isInView: boolean;
  featured?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const meta = tagMeta[post.tag] ?? tagMeta["Training"];
  const TagIcon = meta.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.65 }}
      className="relative group rounded-xl overflow-hidden border border-foreground/[0.05] hover:border-accent/30 transition-all duration-300"
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* Image link */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block absolute inset-0"
      >
        <Image
          src={post.src}
          alt={post.caption}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          sizes={featured ? "40vw" : "25vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/25" />
      </a>

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 z-10">
        {/* Tag pill */}
        <div
          className="flex items-center gap-1.5 rounded-md px-2 py-1 backdrop-blur-md"
          style={{ background: `${meta.bg}cc` }}
        >
          <TagIcon color={meta.text} size={10} />
          <span
            className="font-mono font-bold text-[9px] tracking-widest uppercase"
            style={{ color: meta.text }}
          >
            {post.tag}
          </span>
        </div>

        {/* IG avatar icon */}
        <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
          <FaInstagram className="text-white" size={13} />
        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        {/* Caption */}
        <div
          className={`transition-all duration-300 ${featured
            ? "opacity-100 translate-y-0 mb-2.5"
            : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 mb-2"
            }`}
        >
          <p
            className={`text-white/90 font-mono leading-relaxed line-clamp-2 ${featured ? "text-xs" : "text-[10px]"
              }`}
          >
            {post.caption}
          </p>
        </div>

        {/* Stats + actions row */}
        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((l) => !l);
            }}
            className="flex items-center gap-1 transition-transform active:scale-125"
          >
            <FiHeart
              size={featured ? 13 : 11}
              className={`transition-all duration-200 ${liked
                ? "fill-pink-500 text-pink-500 scale-125"
                : "text-white/55 group-hover:text-pink-400"
                }`}
            />
            <span className="text-white/50 font-mono text-[10px]">
              {fmtNum(post.likes + (liked ? 1 : 0))}
            </span>
          </button>

          {/* Comments */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors font-mono text-[10px]"
          >
            <FiMessageSquare size={featured ? 12 : 10} />
            {fmtNum(post.comments)}
          </a>

          {/* Shares */}
          <span className="flex items-center gap-1 text-white/40 font-mono text-[10px]">
            <FiSend size={featured ? 11 : 9} />
            {post.shares}
          </span>

          {/* Save */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            className="ml-auto transition-transform active:scale-125"
          >
            <FiBookmark
              size={featured ? 13 : 11}
              className={`transition-all duration-200 ${saved
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-white/45 hover:text-yellow-400"
                }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CTABanner({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9 }}
      className="relative mt-8 rounded-2xl overflow-hidden border border-foreground/[0.05]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 40%, #2d0c0c 80%, #0d0d0d 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, #833ab4 0%, transparent 55%),
                            radial-gradient(circle at 85% 50%, #fcb045 0%, transparent 55%)`,
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-5">
        {/* Left — brand */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
            }}
          >
            <FaInstagram className="text-white" size={22} />
          </div>
          <div>
            <p className="text-text-hi font-mono font-bold text-sm">
              Join our Instagram community
            </p>
            <p className="text-text-lo font-mono text-xs mt-0.5">
              Daily workout inspiration · Member spotlights · Exclusive offers
            </p>
          </div>
        </div>

        {/* Middle — quick stats */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { Icon: FaUsers, val: "4.3K", label: "Followers" },
            { Icon: FaFire, val: "Daily", label: "Posts" },
            { Icon: MdEmojiEvents, val: "Top", label: "Gym IG" },
          ].map(({ Icon, val, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 border border-foreground/[0.08] rounded-lg px-3 py-2 bg-foreground/[0.03]"
            >
              <Icon className="text-accent" size={12} />
              <span className="text-text-hi font-mono text-xs font-bold">{val}</span>
              <span className="text-text-lo font-mono text-[10px]">{label}</span>
            </div>
          ))}
        </div>

        {/* Right — CTA */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-shrink-0 inline-flex items-center gap-2.5 text-primary-fg font-mono font-bold text-sm tracking-widest uppercase px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--primary)",
            boxShadow: `0 4px 24px var(--primary)`,
          }}
        >
          <FaInstagram size={16} />
          Follow Now
          <FiArrowUpRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <section ref={ref} className="bg-dark relative overflow-hidden">
      {/* Ticker */}
      <TickerBanner />

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-accent" />
              <FaInstagram className="text-accent" size={13} />
              <span className="text-accent text-[10px] tracking-[5px] uppercase font-mono font-bold">
                @shields_basavanagudi
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl xs:text-5xl lg:text-6xl xl:text-7xl font-display font-black italic text-text-hi leading-[0.92] tracking-tighter"
            >
              FOLLOW
              <br />
              OUR{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--primary)" }}
              >
                JOURNEY
              </span>
            </motion.h2>
          </div>

          {/* Profile card */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="group flex flex-col xs:flex-row items-center gap-4 border border-foreground/[0.08] hover:border-accent/30 bg-surface backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 w-full lg:w-auto lg:min-w-[310px]"
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-full p-[2.5px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                }}
              >
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                  <FaInstagram className="text-text-hi" size={22} />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-text-hi font-mono font-bold text-sm">
                  shields_basavanagudi
                </span>
                <MdOutlineVerified className="text-blue-400 flex-shrink-0" size={15} />
              </div>
              <p className="text-text-lo font-mono text-[11px] mt-0.5">
                4,300+ followers · Basavanagudi, BLR
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <div className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2 sm:px-3 py-1 rounded-md inline-flex items-center gap-1.5 text-primary-fg bg-primary">
                  <FiShare2 size={9} /> Follow
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2 sm:px-3 py-1 rounded-md inline-flex items-center gap-1.5 text-text-lo border border-foreground/[0.08] hover:border-foreground/[0.2] transition-colors">
                  <FiSend size={9} /> DM
                </div>
              </div>
            </div>
            <FiArrowUpRight
              className="text-text-lo/30 group-hover:text-accent transition-colors flex-shrink-0"
              size={18}
            />
          </motion.a>
        </div>

        {/* Stats Banner */}
        <StatsBanner isInView={isInView} />

        {/* Promo / Live Banner */}
        <PromoBanner isInView={isInView} />

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {/* Featured 2×2 */}
          <div className="col-span-2 row-span-2">
            <PostCard post={featuredPost} index={0} isInView={isInView} featured />
          </div>
          {/* Grid 2×3 */}
          {gridPosts.map((post, i) => (
            <PostCard key={post.src} post={post} index={i + 1} isInView={isInView} />
          ))}
        </motion.div>

        {/* CTA Banner */}
        <CTABanner isInView={isInView} />

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t border-foreground/[0.05]"
        >
          <div className="flex items-center gap-2 text-text-lo/40 font-mono text-[10px] tracking-widest">
            <FiCamera size={11} />
            TAGGED: #SHIELDSFIT · #BASAVANAGUDI · #SHIELDSFITNESS
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase text-text-lo hover:text-text-hi transition-colors"
          >
            View all posts on Instagram <FiArrowUpRight size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}