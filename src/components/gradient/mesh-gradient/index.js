"use client"
import { useEffect } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

import s from "./mesh-gradient.module.scss"

const MeshGradient = ({ className }) => {
  useEffect(() => {
    // @ts-ignore
    import("./raw").then(({ gradient }) =>
      gradient.initGradient("#gradient-canvas")
    )
  }, [])

  return (
    <canvas
      id="gradient-canvas"
      className={clsx(className, s.base, s.canvas)}
      style={null}
      data-js-darken-top
      data-transition-in
    />
  )
}

MeshGradient.propTypes = {
  className: PropTypes.string
}

export default MeshGradient
