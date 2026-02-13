"use client"
import { useIsMobile } from "@/hooks/use-media-query"
import Galaxy from "./galaxy"
import Meteors from "./meteors"
import Stars from "./stars"
import s from "./starfield.module.scss"

const Starfield = () => {
  const isMobile = useIsMobile()

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
