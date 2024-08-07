"use client"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { isMobile } from "react-device-detect"

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
const MIN_FRAME_INTERVAL = 1000 / 90 // Minimum frame interval (90 FPS)
const DESKTOP_STAR_COUNT = 900
const MOBILE_STAR_COUNT = 400
const BACKGROUND_COLOR = "black"
const STAR_COLOR = [255, 255, 255]

const debounce = (
  func: { (targetSpeedFactor: number): void },
  delay: number | undefined
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<StarType[]>([])
  const animationFrameId = useRef<number | null>(null)
  const currentStarsSpeedFactor = useRef(NORMALSPEED)
  const lastFrameTimeRef = useRef<number>(0)
  const debouncedChangeStarsSpeedRef = useRef<any>(null)
  const starSize = useMemo(() => (isMobile ? 2 : 1.1), [isMobile])
  let starsMoved = false

  // Initialize the stars array
  const initializeStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const newStars = Array.from(
      { length: isMobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000
      })
    )

    starsRef.current = newStars
  }, [isMobile])

  // Function to change stars speed
  const changeStarsSpeed = useCallback((targetSpeedFactor: number) => {
    const acceleration = 0.01 // Adjust acceleration for smoother transition
    let currentSpeedFactor = currentStarsSpeedFactor.current

    const adjustSpeed = () => {
      if (currentSpeedFactor < targetSpeedFactor) {
        // Speed up
        currentSpeedFactor += acceleration
        if (currentSpeedFactor > targetSpeedFactor)
          currentSpeedFactor = targetSpeedFactor // Ensure we don't overshoot
      } else if (currentSpeedFactor > targetSpeedFactor) {
        // Slow down
        currentSpeedFactor -= acceleration
        if (currentSpeedFactor < targetSpeedFactor)
          currentSpeedFactor = targetSpeedFactor // Ensure we don't overshoot
      }

      currentStarsSpeedFactor.current = currentSpeedFactor

      if (currentSpeedFactor !== targetSpeedFactor) {
        animationFrameId.current = requestAnimationFrame(adjustSpeed)
      }
    }

    // Start adjusting the speed
    adjustSpeed()
  }, [])

  // Create a MutationObserver to observe 'hyper-speed' class changes on the canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let timeoutId: ReturnType<typeof setTimeout>

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === STARFIELD_HYPER_DATA_ATTR
        ) {
          const hyperSpeedAttr = (mutation.target as HTMLElement).getAttribute(
            STARFIELD_HYPER_DATA_ATTR
          )

          // Clear previous timeout and set a new one
          clearTimeout(timeoutId)

          if (hyperSpeedAttr === "true") {
            changeStarsSpeed(HYPERSPEED)
          } else {
            // @ts-ignore
            debouncedChangeStarsSpeedRef.current(NORMALSPEED)
          }
        }
      })
    })

    // @ts-ignore
    debouncedChangeStarsSpeedRef.current = debounce(changeStarsSpeed, 500)

    observer.observe(canvas, {
      attributes: true,
      attributeFilter: [STARFIELD_HYPER_DATA_ATTR]
    })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId.current!)
    }
  }, [changeStarsSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Move the stars only when needed
    const moveStars = (distance: number) => {
      if (distance > 0) {
        for (let i = 0; i < starsRef.current.length; i++) {
          const star = starsRef.current[i]
          star.z -= distance
          while (star.z <= 1) {
            star.z += 1000
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        starsMoved = true
      }
    }

    const renderStars = () => {
      if (starsMoved) {
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Render stars logic here
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const viewportMargin = 0

        // Calculate viewport boundaries
        const viewportLeft = -viewportMargin
        const viewportRight = canvas.width + viewportMargin
        const viewportTop = -viewportMargin
        const viewportBottom = canvas.height + viewportMargin

        for (let i = 0; i < starsRef.current.length; i++) {
          const star = starsRef.current[i]
          const x = cx + (star.x - canvas.width / 2) / (star.z * 0.001)
          const y = cy + (star.y - canvas.height / 2) / (star.z * 0.001)

          // Check if star is within viewport boundaries
          if (
            x >= viewportLeft &&
            x <= viewportRight &&
            y >= viewportTop &&
            y <= viewportBottom
          ) {
            const d = star.z / 1000
            const b = 1 - d * d
            const lineWidth = 0.9

            // Calculate offset based on movement direction
            const offsetX = star.prevX ? x - star.prevX : 0
            const offsetY = star.prevY ? y - star.prevY : 0
            const offsetXNorm =
              offsetX / Math.sqrt(offsetX * offsetX + offsetY * offsetY)
            const offsetYNorm =
              offsetY / Math.sqrt(offsetX * offsetX + offsetY * offsetY)

            // Draw blurred trail lines
            const blurFactor = 3.5
            ctx.strokeStyle = `rgba(${STAR_COLOR[0]}, ${STAR_COLOR[1]}, ${
              STAR_COLOR[2]
            }, ${0.01 * b * blurFactor})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(star.prevX || x, star.prevY || y)
            ctx.lineTo(x - offsetXNorm * 20, y - offsetYNorm * 20)
            ctx.stroke()

            // Draw star
            ctx.fillStyle = `rgba(${STAR_COLOR[0]}, ${STAR_COLOR[1]}, ${STAR_COLOR[2]}, ${b})`
            ctx.beginPath()
            ctx.arc(x, y, starSize, 0, Math.PI * 2)
            ctx.fill()

            star.prevX = x
            star.prevY = y
          }
        }
      }
    }

    // Animate the starfield
    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTimeRef.current

      // Throttle frame rate
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
  }, [isMobile, initializeStars])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Handle resizing of the canvas
    const resizeHandler = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth * (isMobile ? 2 : 1)
      canvas.height = innerHeight * (isMobile ? 2 : 1)

      initializeStars()
    }

    resizeHandler()

    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [isMobile, initializeStars])

  // Change stars speed when the user switches tabs
  useEffect(() => {
    if (isMobile) return

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        if (currentStarsSpeedFactor.current === HYPERSPEED) {
          changeStarsSpeed(NORMALSPEED)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isMobile, changeStarsSpeed])

  return (
    <canvas className={s.canvas} id={STARFIELD_CANVAS_ID} ref={canvasRef} />
  )
}

// export const useSetHyperSpeedOnMouse = () => {
//   const { setHyperSpeed } = useStarfieldStars()
//   const ref = useRef<HTMLButtonElement | null>(null)

//   useEffect(() => {
//     const element = ref.current
//     if (!element) return

//     const mouseListener = (e: MouseEvent) => {
//       const target = e.target as HTMLElement

//       if (target === element) {
//         setHyperSpeed(true)
//       }
//     }

//     const mouseLeave = (e: MouseEvent) => {
//       const target = e.target as HTMLElement

//       if (target === element) {
//         setHyperSpeed(false)
//       }
//     }

//     element.addEventListener("mouseenter", mouseListener)
//     element.addEventListener("mouseleave", mouseLeave)

//     Mixpanel.track({
//       name: "hyperspace-triggered",
//       page: "landing"
//     })

//     return () => {
//       element.removeEventListener("mouseenter", mouseListener)
//       element.removeEventListener("mouseleave", mouseLeave)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [setHyperSpeed])

//   return [ref] as const
// }
