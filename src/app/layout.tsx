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

const siteUrl = "https://ggmanolo.com"
const brandName = "GGManolo"
const pageTitle = `${brandName} | Creative Engineer`
const pageDescription =
  "Staff Frontend Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design, technical standards, and AI-augmented engineering workflows."

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  applicationName: brandName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "ggmanolo",
    "GGManolo",
    "Manuel Garcia Genta",
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
    "Agentic AI Development",
    "AI-augmented development",
  ],
  authors: [
    { name: brandName, url: siteUrl },
    { name: "Manuel Garcia Genta", url: siteUrl },
  ],
  creator: brandName,
  publisher: brandName,
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
    url: siteUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@ggmanolo",
    site: "@ggmanolo",
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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: brandName,
        alternateName: ["ggmanolo", "Manuel Garcia Genta"],
        description: pageDescription,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Manuel Garcia Genta",
        alternateName: [brandName, "ggmanolo"],
        description:
          "Staff Frontend Engineer specializing in React, Next.js and product-driven interfaces with AI-augmented engineering workflows.",
        url: siteUrl,
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/img/avatar.png`,
          width: "400",
          height: "400",
        },
        sameAs: [
          "https://www.linkedin.com/in/ggmanolo/",
          "https://github.com/ggmanolo",
          "https://x.com/ggmanolo",
        ],
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
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
    ],
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
