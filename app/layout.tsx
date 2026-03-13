import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shield's Fitness Club Basavanagudi | Premium Gym in Bengaluru",
  description:
    "Shield's Fitness Club in Basavanagudi, Bengaluru — rated 4.8⭐ with 287+ reviews. Modern equipment, certified trainers, strength & cardio training. Join today!",
  keywords: [
    "gym in Basavanagudi",
    "fitness club Bengaluru",
    "Shield's Fitness Club",
    "best gym Basavanagudi",
    "personal training Bengaluru",
    "weight training gym Bengaluru",
    "gym near Gandhi Bazaar",
    "fitness center Bengaluru",
  ],
  authors: [{ name: "Shield's Fitness Club" }],
  creator: "Shield's Fitness Club",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shieldsfitness.in",
    siteName: "Shield's Fitness Club Basavanagudi",
    title: "Shield's Fitness Club Basavanagudi | Premium Gym in Bengaluru",
    description:
      "Join Bengaluru's premier fitness destination. 4.8⭐ rated gym with modern equipment, certified trainers, and a motivating environment.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shield's Fitness Club Basavanagudi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shield's Fitness Club Basavanagudi | Premium Gym in Bengaluru",
    description:
      "Join Bengaluru's premier fitness destination. 4.8⭐ rated gym with modern equipment and certified trainers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.jpg" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthClub",
              name: "Shield's Fitness Club Basavanagudi",
              description:
                "Premium fitness center in Basavanagudi, Bengaluru with certified trainers and modern equipment.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "3rd Floor, Aishwarya Sampurna 79/1 Vanivilas Rd, Above KFC Gandhi Bazaar",
                addressLocality: "Basavanagudi",
                addressRegion: "Karnataka",
                postalCode: "560004",
                addressCountry: "IN",
              },
              telephone: "+919019342121",
              openingHours: "Mo-Su 06:00-22:00",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "287",
              },
              sameAs: [
                "https://www.instagram.com/shields_basavanagudi/",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
