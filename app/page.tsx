"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MarqueeRow, tickerRow1, tickerRow2, tickerRow3 } from "@/components/MarqueeBanner";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import Membership from "@/components/Membership";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--background)" }}>
      <Navbar />
      <Hero />
      <MarqueeRow items={tickerRow3} speed={25} />
      <About />
      <MarqueeRow items={tickerRow1} dark speed={32} />
      <Facilities />
      <MarqueeRow items={tickerRow2} reverse speed={40} />
      <Membership />
      <MarqueeRow items={tickerRow1} speed={28} />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
