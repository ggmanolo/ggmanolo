import { Roboto, Yellowtail, Orbitron } from "next/font/google"
import clsx from "clsx"

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
  children: React.ReactNode
}

export const metadata = {
  title: "Manuel Garcia Genta | Web Developer",
  description:
    "I'm a frontend developer experienced in HTML, CSS, and JavaScript. Check out my portfolio and CV to see my work and skills. Let's build something awesome together.",
  metadataBase: new URL("https://ggmanolo.com"),
  twitter: {
    card: "summary_large_image",
    title: "Manuel Garcia Genta | Web Developer",
    description:
      "I'm a frontend developer experienced in HTML, CSS, and JavaScript. Check out my portfolio and CV to see my work and skills. Let's build something awesome together.",
    images: ["https://ggmanolo.com/img/og.jpg"]
  },
  icons: {
    icon: "img/favicon.svg"
  }
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={clsx(roboto.className, yellowtail.variable, orbitron.variable)}
    >
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
