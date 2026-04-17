"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useIsMobile } from "@/hooks/use-media-query"
import Gradient from "@/components/gradient"
import s from "./hero.module.scss"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const triangleRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subTitleRef = useRef<HTMLHeadingElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    tl.current = gsap.timeline()
    const heroSection = containerRef.current

    // neon color states — mimic the CodePen technique: swap color+shadow, never touch opacity
    const unlitColor = "#3d0a30"
    const litColor = "#d100b1"
    // unlit tube: very faint outline-like shadow, simulates the glass tube shape
    const unlitShadow =
      "0 0 1px rgba(180, 20, 140, 0.25), 0 0 3px rgba(180, 20, 140, 0.12)"
    // flash bursts (flashes 1 & 2) — instant, full power
    const flashShadow =
      "0 0 2px #ff00d9, 0 -1px 5px rgba(255,255,255,0.95), 0 1px 3px rgba(0,0,0,0.5), 0 0 30px #d100b1, 0 0 70px rgba(209,0,177,0.95)"
    // seed shadow for the "catches" transition — minimal, glow starts from here
    const ignitionShadow =
      "0 0 1px rgba(209,0,177,0.4), 0 -1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.5), 0 0 4px rgba(209,0,177,0.3), 0 0 8px rgba(209,0,177,0.2)"
    const normalShadow =
      "0 0 1px #d100b1, 0 -1px 3px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.5), 0 0 15px #d100b1, 0 0 45px rgba(209,0,177,0.8)"

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tl.current
              ?.fromTo(
                triangleRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, delay: 0.5 },
              )
              .to(triangleRef.current, {
                strokeDashoffset: 0,
                duration: 0.85,
                ease: "slowmo.inout",
              })
              .fromTo(
                titleRef.current,
                { autoAlpha: 0, scale: 1.2, y: -10 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.75,
                  y: 0,
                  ease: "slowmo.inout",
                },
                ">0.3",
              )
              // neon tube warm-up — unlit state: tube is visible but not ionized
              .set(subTitleRef.current, { autoAlpha: 1, color: unlitColor, textShadow: unlitShadow, rotate: "-8deg" }, ">0.5")
              // flash 1 — longer burst, fails (120ms ON)
              .set(subTitleRef.current, { color: litColor, textShadow: flashShadow })
              .to(subTitleRef.current, { duration: 0.12, ease: "none" })
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              // dark pause (300ms)
              .to(subTitleRef.current, { duration: 0.3, ease: "none" })
              // flash 2 — shorter burst, fails (70ms ON)
              .set(subTitleRef.current, { color: litColor, textShadow: flashShadow })
              .to(subTitleRef.current, { duration: 0.07, ease: "none" })
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              // dark pause (160ms)
              .to(subTitleRef.current, { duration: 0.16, ease: "none" })
              // flash 3a — stutter (50ms ON)
              .set(subTitleRef.current, { color: litColor, textShadow: flashShadow })
              .to(subTitleRef.current, { duration: 0.05, ease: "none" })
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              // micro pause (50ms) then catches — glow grows from seed to normal
              .to(subTitleRef.current, { duration: 0.05, ease: "none" })
              .set(subTitleRef.current, { color: litColor, textShadow: ignitionShadow })
              .to(subTitleRef.current, {
                textShadow: normalShadow,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                  // hand off text-shadow control to CSS for the infinite pulse loop
                  gsap.set(subTitleRef.current, { clearProps: "textShadow,color" })
                  subTitleRef.current?.classList.add(s.subtitlePulsing)
                },
              })

            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.5 },
    )

    if (heroSection) {
      observer.observe(heroSection)
    }

    return () => {
      observer.disconnect()
      tl.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      let ticking = false

      const handleParallax = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollPosition = window.scrollY
            gsap.set(wrapperRef.current, { y: scrollPosition * 0.25 })
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener("scroll", handleParallax, { passive: true })

      return () => {
        window.removeEventListener("scroll", handleParallax)
      }
    }
  }, [isMobile])

  return (
    <section id="hero" className={s.hero} ref={containerRef}>
      <Gradient />
      <div className={s.wrapper} ref={wrapperRef}>
        <h1 className={s.title} ref={titleRef}>
          GGMANOLO
        </h1>
        <h2 className={s.subtitle} ref={subTitleRef}>
          Creative Engineer
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
    </section>
  )
}

export default Hero
