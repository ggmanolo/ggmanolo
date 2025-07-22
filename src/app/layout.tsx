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
  title: "Manuel Garcia Genta | Frontend Developer & UI/UX Specialist",
  description:
    "Frontend developer specializing in React, Next.js, HTML, CSS, and JavaScript. Creating pixel-perfect, responsive web applications with exceptional user experiences. View my portfolio and CV.",
  metadataBase: new URL("https://ggmanolo.com"),
  keywords: [
    "frontend developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "JavaScript developer",
    "UI/UX designer",
    "portfolio",
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
    title: "Manuel Garcia Genta | Frontend Developer & UI/UX Specialist",
    description:
      "Frontend developer specializing in React, Next.js, HTML, CSS, and JavaScript. Creating pixel-perfect, responsive web applications with exceptional user experiences.",
    images: [
      {
        url: "https://ggmanolo.com/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "Manuel Garcia Genta - Frontend Developer"
      }
    ],
    siteName: "GGManolo Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Garcia Genta | Frontend Developer & UI/UX Specialist",
    description:
      "Frontend developer specializing in React, Next.js, HTML, CSS, and JavaScript. Creating pixel-perfect, responsive web applications with exceptional user experiences.",
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
