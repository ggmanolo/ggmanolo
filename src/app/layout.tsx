import { ReactNode } from "react"
import { Roboto, Yellowtail, Orbitron } from "next/font/google"
import Script from "next/script"
import clsx from "clsx"

import "@/styles/globals.scss"

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: "Manuel Garcia Genta | Staff Frontend Engineer",
  description:
    "Staff Frontend Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design, technical standards, and AI-augmented engineering workflows.",
  metadataBase: new URL("https://ggmanolo.com"),
  alternates: {
    canonical: "https://ggmanolo.com",
  },
  keywords: [
    "Staff Frontend Engineer",
    "Senior Frontend Engineer",
    "UI Engineer",
    "Product Engineer",
    "Frontend Architecture",
    "React Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "GSAP Animation",
    "Tailwind CSS",
    "Sanity CMS",
    "Agentic AI Development",
    "AI-augmented development",
    "Manuel Garcia Genta",
    "GGManolo",
  ],
  authors: [{ name: "Manuel Garcia Genta", url: "https://ggmanolo.com" }],
  creator: "Manuel Garcia Genta",
  publisher: "Manuel Garcia Genta",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ggmanolo.com",
    title: "Manuel Garcia Genta | Staff Frontend Engineer",
    description:
      "Staff Frontend Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design, technical standards, and AI-augmented engineering workflows.",
    siteName: "GGManolo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Garcia Genta | Staff Frontend Engineer",
    description:
      "Staff Frontend Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design, technical standards, and AI-augmented engineering workflows.",
    creator: "@ggmanolo",
  },
  icons: {
    icon: [
      { url: "/img/favicon.svg", type: "image/svg+xml" },
      { url: "/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/img/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#d100b1",
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Manuel Garcia Genta",
      alternateName: "GGManolo",
      description:
        "Staff Frontend Engineer specializing in React, Next.js and product-driven interfaces with AI-augmented engineering workflows.",
      url: "https://ggmanolo.com",
      image: {
        "@type": "ImageObject",
        url: "https://ggmanolo.com/img/avatar.png",
        width: "400",
        height: "400",
      },
      sameAs: ["https://www.linkedin.com/in/ggmanolo/", "https://github.com/ggmanolo"],
      jobTitle: "Staff Frontend Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Independent / Contract",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Frontend Architecture",
        "UI Engineering",
        "Design Systems",
        "Product Development",
        "Performance Optimization",
        "Web Applications",
      ],
      email: "hellothere@ggmanolo.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AR",
      },
    },
  }

  return (
    <html lang="en" className={clsx(roboto.className, yellowtail.variable, orbitron.variable)}>
      <body>
        {children}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}

export default RootLayout
