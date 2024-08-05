"use client"
import React, { useRef, useEffect, useCallback } from "react"
import _ from "lodash"

import s from "./galaxy.module.scss"

const BASE_SIZE = 0.75
const VELOCITY_INC = 1.007
const SIZE_INC = 1.007
const RAD = Math.PI / 180

const randomInRange = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min

class Star {
  constructor() {
    this.reset()
  }

  STATE = {
    alpha: Math.random(),
    angle: randomInRange(0, 360) * RAD
  }

  reset = () => {
    if (typeof window !== "undefined") {
      const angle = randomInRange(0, 360) * RAD
      const vX = Math.cos(angle)
      const vY = Math.sin(angle)
      const travelled =
        Math.random() > 0.5
          ? Math.random() * Math.max(window.innerWidth, window.innerHeight) +
            Math.random() * (window.innerWidth * 0.24)
          : Math.random() * (window.innerWidth * 0.25)
      this.STATE = {
        ...this.STATE,
        iX: undefined,
        iY: undefined,
        active: travelled > 0,
        x: Math.floor(vX * travelled) + window.innerWidth / 2,
        vX,
        y: Math.floor(vY * travelled) + window.innerHeight / 2,
        vY,
        size: BASE_SIZE
      }
    }
  }
}

const generateStarPool = (size) => new Array(size).fill().map(() => new Star())

const Galaxy = () => {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    stars: [],
    bgAlpha: 0,
    sizeInc: SIZE_INC,
    velocity: VELOCITY_INC
  })

  const render = useCallback(() => {
    if (canvasRef.current && stateRef.current.stars.length) {
      const { bgAlpha, velocity, sizeInc, stars } = stateRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (bgAlpha > 0) {
        context.fillStyle = `rgba(31, 58, 157, ${bgAlpha})`
        context.fillRect(0, 0, window.innerWidth, window.innerHeight)
      }

      for (const star of stars.filter((s) => s.STATE.active)) {
        const { active, x, y, iX, iY, size, vX, vY } = star.STATE

        if (
          ((iX || x) < 0 ||
            (iX || x) > window.innerWidth ||
            (iY || y) < 0 ||
            (iY || y) > window.innerHeight) &&
          active
        ) {
          star.reset(true)
        } else if (active) {
          const newX = x + vX
          const newY = y + vY
          star.STATE = {
            ...star.STATE,
            x: newX,
            vX: star.STATE.vX * velocity,
            y: newY,
            vY: star.STATE.vY * velocity,
            size: size * sizeInc
          }

          let color = `rgba(255, 255, 255, ${star.STATE.alpha})`
          context.strokeStyle = color
          context.lineWidth = size
          context.beginPath()
          context.moveTo(star.STATE.iX || x, star.STATE.iY || y)
          context.lineTo(star.STATE.x, star.STATE.y)
          context.stroke()
        }
      }
      requestAnimationFrame(render)
    }
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      stateRef.current.stars = generateStarPool(320)
      const canvas = canvasRef.current
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
      render()
    }
  }, [render])

  useEffect(() => {
    if (typeof window !== "undefined") {
      stateRef.current.stars = generateStarPool(320)
      const canvas = canvasRef.current
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth

      render()

      const debouncedReset = _.debounce(reset, 250)
      window.addEventListener("resize", debouncedReset)

      return () => {
        window.removeEventListener("resize", debouncedReset)
      }
    }
  }, [render, reset])

  return <canvas ref={canvasRef} className={s.galaxy} />
}

export default Galaxy
