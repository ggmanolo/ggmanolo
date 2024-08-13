"use client"
import { useCallback, useEffect, useMemo, useRef } from "react"
import debounce from "lodash/debounce"
import { useStore } from "@/store"

import s from "./starfield.module.scss"

type StarType = {
  x: number
  y: number
  z: number
  prevX?: number
  prevY?: number
}

export const STARFIELD_HYPER_DATA_ATTR = "data-hyper-speed"
export const STARFIELD_CANVAS_ID = "starfield"
const HYPERSPEED = 0.6
const NORMALSPEED = 0.035
const MIN_FRAME_INTERVAL = 1000 / 90
const DESKTOP_STAR_COUNT = 900
const BACKGROUND_COLOR = "black"
const STAR_COLOR = [255, 255, 255]

const Galaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<StarType[]>([])
  const animationFrameId = useRef<number | null>(null)
  const currentStarsSpeedFactor = useRef(NORMALSPEED)
  const lastFrameTimeRef = useRef<number>(0)
  const starSize = 1.1
  const { setHyperspeed } = useStore()

  const initializeStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    starsRef.current = Array.from({ length: DESKTOP_STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000
    }))
  }, [])

  const changeStarsSpeed = useCallback((targetSpeedFactor: number) => {
    const acceleration = 0.01
    let currentSpeedFactor = currentStarsSpeedFactor.current

    const adjustSpeed = () => {
      if (currentSpeedFactor < targetSpeedFactor) {
        currentSpeedFactor = Math.min(
          currentSpeedFactor + acceleration,
          targetSpeedFactor
        )
      } else if (currentSpeedFactor > targetSpeedFactor) {
        currentSpeedFactor = Math.max(
          currentSpeedFactor - acceleration,
          targetSpeedFactor
        )
      }

      currentStarsSpeedFactor.current = currentSpeedFactor

      if (currentSpeedFactor !== targetSpeedFactor) {
        animationFrameId.current = requestAnimationFrame(adjustSpeed)
      }
    }

    adjustSpeed()
  }, [])

  const debouncedChangeStarsSpeed = useMemo(
    () => debounce(changeStarsSpeed, 100),
    [changeStarsSpeed]
  )

  const debouncedSetHyperspeed = useMemo(
    () => debounce(setHyperspeed, 100),
    [setHyperspeed]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === STARFIELD_HYPER_DATA_ATTR
        ) {
          const hyperSpeedAttr = (mutation.target as HTMLElement).getAttribute(
            STARFIELD_HYPER_DATA_ATTR
          )

          if (hyperSpeedAttr === "true") {
            setHyperspeed(true)
            changeStarsSpeed(HYPERSPEED)
          } else {
            debouncedSetHyperspeed(false)
            debouncedChangeStarsSpeed(NORMALSPEED)
          }
        }
      })
    })

    observer.observe(canvas, {
      attributes: true,
      attributeFilter: [STARFIELD_HYPER_DATA_ATTR]
    })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId.current!)
    }
  }, [changeStarsSpeed, debouncedChangeStarsSpeed, setHyperspeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const moveStars = (distance: number) => {
      if (distance > 0) {
        starsRef.current.forEach((star) => {
          star.z -= distance
          while (star.z <= 1) {
            star.z += 1000
          }
        })
      }
    }

    const renderStars = () => {
      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      starsRef.current.forEach((star) => {
        const x = cx + (star.x - canvas.width / 2) / (star.z * 0.001)
        const y = cy + (star.y - canvas.height / 2) / (star.z * 0.001)

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const d = star.z / 1000
          const b = 1 - d * d
          const lineWidth = 0.9

          const offsetX = star.prevX ? x - star.prevX : 0
          const offsetY = star.prevY ? y - star.prevY : 0
          const offsetLength = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
          const offsetXNorm = offsetLength > 0 ? offsetX / offsetLength : 0
          const offsetYNorm = offsetLength > 0 ? offsetY / offsetLength : 0

          const blurFactor = 3.5
          ctx.strokeStyle = `rgba(${STAR_COLOR[0]}, ${STAR_COLOR[1]}, ${
            STAR_COLOR[2]
          }, ${0.01 * b * blurFactor})`
          ctx.lineWidth = lineWidth
          ctx.beginPath()
          ctx.moveTo(star.prevX || x, star.prevY || y)
          ctx.lineTo(x - offsetXNorm * 20, y - offsetYNorm * 20)
          ctx.stroke()

          ctx.fillStyle = `rgba(${STAR_COLOR[0]}, ${STAR_COLOR[1]}, ${STAR_COLOR[2]}, ${b})`
          ctx.beginPath()
          ctx.arc(x, y, starSize, 0, Math.PI * 2)
          ctx.fill()

          star.prevX = x
          star.prevY = y
        }
      })
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTimeRef.current

      if (elapsed >= MIN_FRAME_INTERVAL) {
        lastFrameTimeRef.current = timestamp
        const distance = elapsed * currentStarsSpeedFactor.current
        moveStars(distance)
        renderStars()
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    lastFrameTimeRef.current = performance.now()
    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId.current!)
    }
  }, [initializeStars])

  const resizeHandler = useCallback(() => {
    const { innerWidth, innerHeight } = window
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = innerWidth
    canvas.height = innerHeight

    initializeStars()
  }, [initializeStars])

  useEffect(() => {
    resizeHandler()

    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [resizeHandler])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        if (currentStarsSpeedFactor.current === HYPERSPEED) {
          setHyperspeed(false)
          changeStarsSpeed(NORMALSPEED)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [changeStarsSpeed, setHyperspeed])

  useEffect(() => {
    let requestId: number | null = null

    const handleScroll = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.setAttribute(STARFIELD_HYPER_DATA_ATTR, "true")

      if (requestId !== null) {
        cancelAnimationFrame(requestId)
      }

      requestId = requestAnimationFrame(() => {
        canvas.setAttribute(STARFIELD_HYPER_DATA_ATTR, "false")
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (requestId !== null) {
        cancelAnimationFrame(requestId)
      }
    }
  }, [])

  return (
    <canvas className={s.canvas} id={STARFIELD_CANVAS_ID} ref={canvasRef} />
  )
}

export default Galaxy
