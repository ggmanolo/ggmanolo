"use client"
import { useRef, useEffect } from "react"
import * as THREE from "three"

import s from "./galaxy.module.scss"

const Galaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      100,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      2000
    )
    camera.position.z = 20

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000, 0)

    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      size: 1
    })

    const starCount = 1500
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

      starPoints.rotation.z += 0.000165

      renderer.render(scene, camera)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className={s.galaxy} />
}

export default Galaxy
