"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MarqueeRow, tickerRow1, tickerRow2, tickerRow3 } from "@/components/MarqueeBanner";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import Membership from "@/components/Membership";
import Reviews from "@/components/Reviews";
import InstagramSection from "@/components/InstagramSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
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
      <SectionReveal>
        <MarqueeRow items={tickerRow3} speed={25} />
        <About />
      </SectionReveal>

      <SectionReveal>
        <MarqueeRow items={tickerRow1} dark speed={32} />
        <Facilities />
      </SectionReveal>

      <SectionReveal>
        <MarqueeRow items={tickerRow2} reverse speed={40} />
        <Membership />
      </SectionReveal>

      <SectionReveal>
        <MarqueeRow items={tickerRow1} speed={28} />
        <Reviews />
      </SectionReveal>

      {/* <SectionReveal>
        <InstagramSection />
      </SectionReveal> */}

      <SectionReveal>
        <Contact />
      </SectionReveal>

      <Footer />
    </main>
  );
}
