import { useRef, useEffect } from "react"
import * as THREE from "three"

import s from "./galaxy.module.scss"

const Galaxy = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      100,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      transparent: true, // Set material to transparent
      opacity: 1, // Set material opacity
      size: 1
    })

    const starCount = 2000
    const positions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 1000
      positions[i3 + 1] = (Math.random() - 0.5) * 1000
      positions[i3 + 2] = Math.random() * 200 - 400
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )

    const starPoints = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starPoints)

    const animate = () => {
      requestAnimationFrame(animate)

      starPoints.rotation.x += 0.0001
      starPoints.rotation.y += 0.0001

      renderer.render(scene, camera)
    }

    animate()
  }, [])

  return <div ref={containerRef} className={s.galaxy} />
}

export default Galaxy
