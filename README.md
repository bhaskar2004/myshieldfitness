# 🛡️ Shield's Fitness Club Basavanagudi — Official Website

A premium, production-ready fitness gym website built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- 🌑 **Dark Premium Design** — Black/charcoal with electric orange neon accents
- ⚡ **Framer Motion Animations** — Smooth scroll-triggered reveals, parallax hero
- 📱 **Fully Responsive** — Mobile-first, optimized for all screen sizes
- 🔍 **SEO Optimized** — Full metadata, Open Graph, JSON-LD structured data
- 🎯 **10 Complete Sections** — Hero, About, Facilities, Trainers, Membership, Reviews, Gallery, Instagram, Contact, Footer
- 🗺️ **Google Maps Embed** — Gym location with dark theme overlay
- 📸 **Lightbox Gallery** — Filterable photo gallery with zoom
- 📋 **Contact Form** — Free trial booking with success feedback
- 🏷️ **Schema Markup** — HealthClub JSON-LD for search ranking

---

## 🏗️ Tech Stack

| Technology | Version |
|---|---|
| Next.js | 14.2.0 |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3.4 |
| Framer Motion | 11 |
| React Icons | 5.2 |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**

That's it! No environment variables required.

---

## 📁 Project Structure

```
shields-fitness/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Home page (assembles all sections)
│   └── globals.css       # Custom CSS, animations, Google Fonts
├── components/
│   ├── Navbar.tsx         # Sticky navbar with mobile menu
│   ├── Hero.tsx           # Full-screen parallax hero
│   ├── MarqueeBanner.tsx  # Scrolling ticker banner
│   ├── About.tsx          # About the gym
│   ├── Facilities.tsx     # Icon card grid
│   ├── Trainers.tsx       # Trainer profile cards
│   ├── Membership.tsx     # Pricing plans
│   ├── Reviews.tsx        # Google review-style cards
│   ├── Gallery.tsx        # Filterable masonry gallery + lightbox
│   ├── InstagramSection.tsx # Instagram feed grid
│   ├── Contact.tsx        # Contact form + Google Maps
│   └── Footer.tsx         # Footer with scroll-to-top
├── public/
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 🎨 Color Palette

| Name | Hex |
|---|---|
| `gym-black` | `#0A0A0A` |
| `gym-dark` | `#111111` |
| `gym-card` | `#161616` |
| `gym-orange` | `#FF5500` |
| `gym-amber` | `#FFAA00` |
| `gym-gray` | `#888888` |

---

## 📞 Business Info

- **Gym:** Shield's Fitness Club Basavanagudi
- **Phone:** 9019342121
- **Instagram:** [@shields_basavanagudi](https://www.instagram.com/shields_basavanagudi/)
- **Address:** 3rd Floor, Aishwarya Sampurna, 79/1 Vanivilas Rd, Above KFC, Gandhi Bazaar, Basavanagudi, Bengaluru 560004
- **Hours:** 6:00 AM – 10:00 PM (Mon–Sun)

---

## 🔧 Customization

### Update membership pricing
Edit `components/Membership.tsx` → `plans` array

### Update Google Maps
In `components/Contact.tsx`, replace the `<iframe src>` with your actual Google Maps embed URL from [maps.google.com](https://maps.google.com) → Share → Embed a map

### Add real images
Replace `images.unsplash.com` URLs with your own gym photos hosted on a CDN

### Connect contact form
In `components/Contact.tsx` → `handleSubmit`, replace the mock logic with an API call to your backend or a service like [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com)
# shiled-fitness
