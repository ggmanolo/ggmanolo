"use client"
import clsx from "clsx"
import { useEffect, useRef, useMemo } from "react"
import { useIsMobile } from "@/hooks/use-media-query"
import { useStore } from "@/store"
import s from "./starfield.module.scss"

const AMOUNT_OF_METEORS = 5

const predefinedColors = ["#671D6B", "#8c45d3", "#d100b1"]

const Meteors = () => {
  const { hyperspeed } = useStore()
  const itemsRef = useRef<HTMLDivElement[]>([])
  const isMobile = useIsMobile()

  // Memoize the meteor elements to prevent unnecessary re-renders
  const meteorElements = useMemo(
    () =>
      new Array(AMOUNT_OF_METEORS).fill(undefined).map((_, idx) => (
        <div
          className={clsx(s.meteor, s[`meteor${idx + 1}`])}
          key={idx}
          ref={(el: HTMLDivElement | null) => {
            if (el) itemsRef.current[idx] = el
          }}
        >
          <div className={s.body}>
            <div className={s.head} />
          </div>
        </div>
      )),
    []
  )

  useEffect(() => {
    if (isMobile || isMobile === undefined) return

    let colorIndex = 0
    const items = itemsRef.current.filter(Boolean) // Filter out null elements
    const eventListeners: { item: HTMLDivElement; listener: () => void }[] = []

    const updateColors = (item: HTMLDivElement) => {
      const newColor = predefinedColors[colorIndex]
      colorIndex = (colorIndex + 1) % predefinedColors.length

      item.style.setProperty("--meteor-default-color", newColor)

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        item.style.animation = "none"
        // Trigger reflow
        void item.offsetWidth
        item.style.animation = ""
      })
    }

    for (const item of items) {
      if (item) {
        const listener = () => updateColors(item)
        item.addEventListener("animationiteration", listener, { passive: true })
        eventListeners.push({ item, listener })
        updateColors(item)
      }
    }

    // Cleanup function
    return () => {
      for (const { item, listener } of eventListeners) {
        item.removeEventListener("animationiteration", listener)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={clsx(s.meteorShower, {
        [s.hide]: hyperspeed
      })}
    >
      {meteorElements}
    </div>
  )
}

export default Meteors
