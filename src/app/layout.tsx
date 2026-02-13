import { ReactNode } from "react"
import { Roboto, Yellowtail, Orbitron } from "next/font/google"
import clsx from "clsx"
import StructuredData from "@/components/structured-data"

import "@/styles/globals.scss"

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
})

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail"
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron"
})

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: "Manuel Garcia Genta | Senior Frontend & UI Engineer",
  description:
    "Senior Frontend & UI Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design and technical standards.",
  metadataBase: new URL("https://ggmanolo.com"),
  keywords: [
    "Senior Frontend Engineer",
    "UI Engineer",
    "Product Engineer",
    "Frontend Architecture",
    "React Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "Manuel Garcia Genta",
    "GGManolo"
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
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ggmanolo.com",
    title: "Manuel Garcia Genta | Senior Frontend & UI Engineer",
    description:
      "Senior Frontend & UI Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design and technical standards.",
    images: [
      {
        url: "https://ggmanolo.com/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Garcia Genta - Senior Frontend & UI Engineer"
      }
    ],
    siteName: "GGManolo Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Garcia Genta | Senior Frontend & UI Engineer",
    description:
      "Senior Frontend & UI Engineer specializing in React and Next.js. I build visually refined, high-performance product interfaces with strong design and technical standards.",
    images: ["https://ggmanolo.com/img/og.jpg"],
    creator: "@ggmanolo"
  },
  icons: {
    icon: [
      { url: "/img/favicon.svg", type: "image/svg+xml" },
      { url: "/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    apple: "/img/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={clsx(roboto.className, yellowtail.variable, orbitron.variable)}
    >
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
