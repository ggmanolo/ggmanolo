import { useRef, useEffect } from "react"

import s from "./space.module.scss"

const Space = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext("2d")

    let numStars = 1900
    let radius = "0." + Math.floor(Math.random() * 9 + 1)
    let focalLength = canvas.width * 2
    let warp = 0
    let centerX, centerY

    let stars = [],
      star
    let i

    initializeStars()

    function executeFrame() {
      if (animate) requestAnimationFrame(executeFrame)
      moveStars()
      drawStars()
    }

    function initializeStars() {
      centerX = canvas.width / 2
      centerY = canvas.height / 2

      stars = []
      for (i = 0; i < numStars; i++) {
        star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: "0." + Math.floor(Math.random() * 99 + 1)
        }
        stars.push(star)
      }
    }

    function moveStars() {
      for (i = 0; i < numStars; i++) {
        star = stars[i]
        star.z -= 3

        if (star.z <= 0) {
          star.z = canvas.width
        }
      }

      // Update focalLength based on scroll position
      focalLength = canvas.width * 2 + window.pageYOffset / 10
    }

    function drawStars() {
      let pixelX, pixelY, pixelRadius

      // Resize to the screen
      if (
        canvas.width !== window.innerWidth ||
        canvas.width !== window.innerWidth
      ) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initializeStars()
      }

      if (warp === 0) {
        c.fillStyle = "rgba(0,10,20,1)"
        c.fillRect(0, 0, canvas.width, canvas.height)
      }
      c.fillStyle = "rgba(209, 255, 255, " + radius + ")"
      for (i = 0; i < numStars; i++) {
        star = stars[i]

        pixelX = (star.x - centerX) * (focalLength / star.z) + centerX
        pixelY = (star.y - centerY) * (focalLength / star.z) + centerY
        pixelRadius = 1 * (focalLength / star.z)

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
        c.fillStyle = "rgba(209, 255, 255, " + star.o + ")"
      }
    }

    let animate = true
    executeFrame()

    // Add scroll event listener
    window.addEventListener("scroll", moveStars)

    return () => {
      animate = false
      // Remove scroll event listener
      window.removeEventListener("scroll", moveStars)
    }
  }, [])

  return <canvas id="space" ref={canvasRef} className={s.space} />
}

export default Space
