"use client"
import { useEffect } from "react"
import clsx from "clsx"
import s from "./mesh-gradient.module.scss"

type MeshGradientProps = {
  className?: string
}

const MeshGradient = ({ className }: MeshGradientProps) => {
  useEffect(() => {
    // @ts-expect-error - Dynamic import of vanilla JS gradient library
    import("./raw").then(({ gradient }) => gradient.initGradient("#gradient-canvas"))
  }, [])

  return (
    <canvas
      id="gradient-canvas"
      className={clsx(className, s.base, s.canvas)}
      data-js-darken-top
      data-transition-in
    />
  )
}

export default MeshGradient
