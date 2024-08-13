"use client"
import { isMobile } from "react-device-detect"
import Galaxy from "./galaxy"
import Meteors from "./meteors"
import Stars from "./stars"

import s from "./starfield.module.scss"

const Starfield = () => {
  return (
    <div className={s.starfield}>
      <div className={s.wrapper}>
        {isMobile ? <Stars /> : <Galaxy />}
        <Meteors />
      </div>
    </div>
  )
}

export default Starfield
