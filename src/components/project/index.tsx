import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"
import clsx from "clsx"
import s from "./project.module.scss"

export type ProjectDataType = {
  id: number
  img: string
  placeholder: string
  date: string
  title: string
  position?: string
  description: string
  tech: string[]
}

type ProjectProps = {
  className?: string
  data: ProjectDataType
}

const isTouchDevice = () => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  )
}

const Project = ({ data, className }: ProjectProps) => {
  const [isTouch, setIsTouch] = useState(false)
  // wrapperRef: flat event target — never transforms, so hit-area is always accurate.
  // tiltRef: the visual card that receives rotateX/Y. Keeping these separate is
  // the same pattern react-next-tilt uses (container + tilt element) to avoid
  // jitter/flicker at edges caused by 3D hit-area divergence.
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const spotGlareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return
    // Add will-change dynamically on mouseEnter (same as react-next-tilt's updateWillChange).
    // This promotes the element to its own GPU compositor layer right before animation starts,
    // making transforms faster. Removed on mouseLeave to free GPU memory.
    if (tiltRef.current) tiltRef.current.style.willChange = "transform"
    if (spotGlareRef.current) spotGlareRef.current.style.willChange = "transform, opacity"
    if (glareRef.current) glareRef.current.style.opacity = "0.1"
  }, [isTouch])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !wrapperRef.current || !tiltRef.current) return
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      // getBoundingClientRect on wrapperRef is always reliable because
      // it never transforms — no 3D projection skew.
      const { left, top, width, height } =
        wrapperRef.current.getBoundingClientRect()
      const offsetX = Math.max(0, Math.min((e.clientX - left) / width, 1))
      const offsetY = Math.max(0, Math.min((e.clientY - top) / height, 1))
      const x = offsetX - 0.5
      const y = offsetY - 0.5

      rafRef.current = requestAnimationFrame(() => {
        if (tiltRef.current) {
          // No perspective() here — it lives on .wrapper as a CSS property.
          // No scale — react-next-tilt default is scale=1.
          tiltRef.current.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 24}deg)`
          tiltRef.current.style.boxShadow = `${x * -24}px ${y * -24}px 48px rgba(0,0,0,0.45)`
        }
        if (glareRef.current) {
          const translateX = ((offsetX + offsetY) * (-3 / 2) + 0.5) * 100
          glareRef.current.style.transform = `translateX(${translateX}%)`
        }
        if (spotGlareRef.current) {
          // Spot glare (react-next-tilt spotGlarePosition='top'):
          // opacity peaks when mouse is at top (offsetY=0), fades to 0 at center (offsetY=0.5).
          // Horizontal position follows mouse X via translateX.
          const spotOpacity = Math.max(0, 1 - offsetY * 2) * 0.5
          const spotTranslateX = offsetX * 50
          spotGlareRef.current.style.opacity = spotOpacity.toFixed(3)
          spotGlareRef.current.style.transform = `translateX(${spotTranslateX}%)`
        }
      })
    },
    [isTouch]
  )

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const el = tiltRef.current
    if (el) {
      el.style.willChange = ""
      // Reset to explicit identity — same as react-next-tilt's reset().
      // Empty string loses the transition anchor and makes the leave feel abrupt.
      el.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      el.style.boxShadow = ""
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0"
      glareRef.current.style.transform = "translateX(-100%)"
    }
    if (spotGlareRef.current) {
      spotGlareRef.current.style.opacity = "0"
      spotGlareRef.current.style.willChange = ""
    }
  }, [isTouch])

  return (
    <div
      ref={wrapperRef}
      className={clsx(s.wrapper, !isTouch && s.tiltEnabled)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={tiltRef} className={clsx(s.card, className)}>
        <div ref={glareRef} className={s.glare} aria-hidden="true" />
        <div ref={spotGlareRef} className={s["spot-glare"]} aria-hidden="true" />
        <div className={s["title-wrapper"]}>
          <span className={s.title}>{data.title}</span>
          <span className={s.date}>{data.date}</span>
        </div>
        <div className={s.img}>
          <Image
            alt={data.title}
            src={data.img}
            fill
            sizes="(max-width: 767px) 100vw, 406px"
            placeholder="blur"
            blurDataURL={data.placeholder}
          />
        </div>
        {data.position && <p className={s.position}>{data.position}</p>}
        <p className={s.description}>{data.description}</p>
        <p className={s.tech}>{data.tech.join(" · ")}</p>
      </div>
    </div>
  )
}

export default Project
