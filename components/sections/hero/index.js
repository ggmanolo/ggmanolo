import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Gradient from "@/components/gradient"
import Stars from "@/components/stars"

import s from "./hero.module.scss"

const Hero = () => {
  const containerRef = useRef(null)
  const triangleRef = useRef(null)
  const titleRef = useRef(null)
  const subTitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      triangleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    )
      .to(triangleRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "slowmo.inout"
      })
      .fromTo(
        titleRef.current,
        { autoAlpha: 0, scale: 3 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: "slowmo.inout" },
        ">0.2"
      )
      .fromTo(
        subTitleRef.current,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "sine.inout" },
        ">0.2"
      )
  }, [])

  return (
    <section id="hero" className={s.hero} ref={containerRef}>
      <div className={s.wrapper}>
        <h1 className={s.title} ref={titleRef}>
          GGMANOLO
        </h1>
        <h2 className={s.subtitle} ref={subTitleRef}>
          Developer
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 405.6 304.2"
          height={300}
          className={s.triangle}
          ref={triangleRef}
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
      <Gradient />
    </section>
  )
}

export default Hero
