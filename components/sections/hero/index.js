import React, { useRef } from "react"
import { useGoogleFontsLoaded } from "@/hooks/use-google-fonts-loaded"
import Stars from "./stars"
import clsx from "clsx"

import s from "./hero.module.scss"
import BgSvg from "./bg"

const Hero = () => {
  const containerRef = useRef(null)

  const isFontsLoaded = useGoogleFontsLoaded([
    "'Orbitron', sans-serif",
    "'Yellowtail', cursive"
  ])

  return (
    <section id="hero" className={s.hero} ref={containerRef}>
      <div className={clsx(s.wrapper, isFontsLoaded && s.loaded)}>
        <h1 className={s.title}>GGMANOLO</h1>
        <h2 className={s.subtitle}>Developer</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 405.6 304.2"
          height={300}
          className={s.triangle}
        >
          <linearGradient
            id="a"
            x1={-94.08}
            x2={-93.08}
            y1={577.635}
            y2={578.635}
            gradientTransform="matrix(400 0 0 -300 37584.691 173554.5)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#323232" />
            <stop offset={1} />
          </linearGradient>
          <path
            fill="url(#a)"
            stroke="var(--cyan)"
            strokeWidth={3}
            d="M2.8 1.5h400l-200 300-200-300z"
          />
        </svg>
      </div>
      <div className={s.stars}>
        <Stars />
      </div>
      {/* <BgSvg className={s.bgsvg} /> */}
    </section>
  )
}

export default Hero
