import PropTypes from "prop-types"
import { Analytics } from "@vercel/analytics/react"
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <main
        className={clsx(
          roboto.className,
          yellowtail.variable,
          orbitron.variable
        )}
      >
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
