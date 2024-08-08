"use client"
import clsx from "clsx"
import { useEffect, useRef } from "react"
import { isMobile } from "react-device-detect"
import { useStore } from "@/store"

import s from "./starfield.module.scss"

const AMOOUNT_OF_METEORS = 4

const predefinedColors = ["#671D6B", "#8c45d3", "#d100b1"]

export const Meteors = () => {
  const { hyperspeed } = useStore()
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (isMobile || isMobile === undefined) return

    let colorIndex = 0
    const items = itemsRef.current
    const eventListeners: { item: HTMLDivElement; listener: () => void }[] = []

    const updateColors = (item: HTMLDivElement) => {
      const newColor = predefinedColors[colorIndex]
      colorIndex = (colorIndex + 1) % predefinedColors.length

      item.style.setProperty("--meteor-default-color", newColor)

      item.style.animation = "none"
      // eslint-disable-next-line no-void
      void item.offsetWidth // Trigger reflow
      item.style.animation = ""
    }

    for (let i = 0; i < items.length; i++) {
      const item: HTMLDivElement = items[i]
      const listener = () => updateColors(item)
      item.addEventListener("animationiteration", listener)
      eventListeners.push({ item, listener })
      updateColors(item)
    }

    // Cleanup function
    return () => {
      for (const { item, listener } of eventListeners) {
        item.removeEventListener("animationiteration", listener)
      }
    }
  }, [isMobile])

  return (
    <div
      className={clsx(s.meteorShower, {
        [s.hide]: hyperspeed
      })}
    >
      {new Array(AMOOUNT_OF_METEORS).fill(undefined).map((_, idx) => {
        return (
          <div
            className={clsx(s.meteor, s[`meteor${idx + 1}`])}
            key={idx}
            // @ts-ignore
            ref={(el: HTMLDivElement) => (itemsRef.current[idx] = el)}
          >
            <div className={s.body}>
              <div className={s.head} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
