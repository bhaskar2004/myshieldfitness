"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import Membership from "@/components/Membership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--background)" }}>
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <About />
      <Facilities />
      <Membership />
      <Contact />
      <Footer />
    </main>
  );
}
