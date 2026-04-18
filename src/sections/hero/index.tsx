"use client"
import { useEffect, useRef } from "react"
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
    const unlitShadow = "0 0 1px rgba(180, 20, 140, 0.25), 0 0 3px rgba(180, 20, 140, 0.12)"
    // flash bursts (flashes 1 & 2) — instant, full power
    const flashShadow =
      "0 0 2px #ff00d9, 0 -1px 5px rgba(255,255,255,0.95), 0 1px 3px rgba(0,0,0,0.5), 0 0 30px #d100b1, 0 0 70px rgba(209,0,177,0.95)"
    // seed shadow for the "catches" transition — minimal, glow starts from here
    const ignitionShadow =
      "0 0 1px rgba(209,0,177,0.8), 0 -1px 2px rgba(255,255,255,0.55), 0 1px 3px rgba(0,0,0,0.5), 0 0 12px rgba(209,0,177,0.75), 0 0 26px rgba(209,0,177,0.55)"
    const normalShadow =
      "0 0 1px #d100b1, 0 -1px 3px rgba(255,255,255,0.85), 0 1px 3px rgba(0,0,0,0.5), 0 0 20px #d100b1, 0 0 52px rgba(209,0,177,0.85)"

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

            if (prefersReducedMotion) {
              gsap.set(triangleRef.current, { opacity: 1, fillOpacity: 1, strokeOpacity: 1, clearProps: "filter" })
              triangleRef.current?.classList.add(s.trianglePulsing)
              gsap.set(titleRef.current, { autoAlpha: 1 })
              gsap.set(subTitleRef.current, { autoAlpha: 1 })
              subTitleRef.current?.classList.add(s.subtitlePulsing)
              observer.disconnect()
              return
            }

            const dropY = -(window.innerHeight * 0.35)

            tl.current
              // triangle drops from above — invisible, falls hard
              ?.set(triangleRef.current, { opacity: 1, fillOpacity: 0, strokeOpacity: 0, filter: "none", y: dropY }, "+=0.4")
              .to(triangleRef.current, {
                y: 0,
                fillOpacity: 1,
                duration: 0.5,
                ease: "power4.in",
              })
              // impact — glow burst fires from the force
              .set(triangleRef.current, {
                strokeOpacity: 1,
                filter: "drop-shadow(0 0 20px #36e2f8) drop-shadow(0 0 60px rgba(54,226,248,0.95))",
              })
              .to(triangleRef.current, {
                filter: "drop-shadow(0 0 4px #36e2f8) drop-shadow(0 0 14px rgba(54,226,248,0.4))",
                duration: 0.6,
                ease: "expo.out",
                onComplete: () => {
                  gsap.set(triangleRef.current, { clearProps: "filter" })
                  triangleRef.current?.classList.add(s.trianglePulsing)
                },
              })
              // stamp — GGMANOLO snaps in with chromatic aberration that converges
              // breathing room: 400ms gap lets the triangle glow settle before the title hits
              .set(titleRef.current, {
                autoAlpha: 1, scale: 0.96, y: 0,
                filter: "drop-shadow(6px 0 0 rgba(255,0,80,0.9)) drop-shadow(-6px 0 0 rgba(0,220,255,0.9))",
                textShadow: "0 0 30px rgba(255,255,255,0.85)",
              }, ">0.4")
              .to(titleRef.current, {
                scale: 1,
                filter: "drop-shadow(0px 0 0 rgba(255,0,80,0)) drop-shadow(0px 0 0 rgba(0,220,255,0))",
                textShadow: "0 0 0px rgba(255,255,255,0)",
                duration: 0.45,
                ease: "power2.out",
              })
              // neon tube — enters already lit, then flickers unstably before settling
              // breathing room: 600ms gap after title stamp
              .set(
                subTitleRef.current,
                { autoAlpha: 1, color: litColor, textShadow: normalShadow, rotate: "-8deg" },
                ">0.6",
              )
              // on for a moment (250ms) — eye registers it's lit
              .to(subTitleRef.current, { duration: 0.25, ease: "none" })
              // flicker 1 — LENTO: drops dark (320ms OFF) — unstable, losing charge
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              .to(subTitleRef.current, { duration: 0.32, ease: "none" })
              // back on — burst (130ms ON)
              .set(subTitleRef.current, { color: litColor, textShadow: flashShadow })
              .to(subTitleRef.current, { duration: 0.13, ease: "none" })
              // flicker 2 — RAPIDO: quick dark (90ms OFF)
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              .to(subTitleRef.current, { duration: 0.09, ease: "none" })
              // flicker 3 — RAPIDO: micro burst (60ms ON)
              .set(subTitleRef.current, { color: litColor, textShadow: flashShadow })
              .to(subTitleRef.current, { duration: 0.06, ease: "none" })
              // micro dark (50ms) then catches — glow grows from seed to stable
              .set(subTitleRef.current, { color: unlitColor, textShadow: unlitShadow })
              .to(subTitleRef.current, { duration: 0.05, ease: "none" })
              .set(subTitleRef.current, { color: litColor, textShadow: ignitionShadow })
              .to(subTitleRef.current, {
                textShadow: normalShadow,
                duration: 0.8,
                ease: "sine.inOut",
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
      { threshold: 0.25 },
    )

    if (heroSection) {
      observer.observe(heroSection)
    }

    return () => {
      observer.disconnect()
      tl.current?.kill()
      triangleRef.current?.classList.remove(s.trianglePulsing)
      subTitleRef.current?.classList.remove(s.subtitlePulsing)
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
