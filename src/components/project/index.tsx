import Image from "next/image"
import { Tilt } from "react-next-tilt"
import { ReactNode, useEffect, useState } from "react"
import clsx from "clsx"

import s from "./project.module.scss"

export type ProjectDataType = {
  id: number
  logo: ReactNode
  img: string
  placeholder: string
  date: string
  title: string
  position?: string
  description: string
}

type ProjectProps = {
  className?: string
  data: ProjectDataType
}

const isTouchDevice = () => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  )
}

const Project = ({ data, className }: ProjectProps) => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  return (
    <Tilt
      className={s.wrapper}
      borderRadius="16px"
      shadowEnable
      tiltMaxAngleX={8}
      tiltMaxAngleY={12}
      disabled={isTouch}
      disabledFilter="none"
    >
      <div className={clsx(s.card, className)}>
        <div className={s.logo}>{data.logo}</div>
        <div className={s.img}>
          <Image
            alt={data.title}
            src={data.img}
            fill
            sizes="(max-width: 767px) 100vw, 406px"
            placeholder="blur"
            blurDataURL={data.placeholder}
          />
        </div>
        <div className={s.date}>{data.date}</div>
        <div className={s.title}>{data.title}</div>
        {data.position && <p className={s.position}>[ {data.position} ]</p>}
        <p className={s.description}>{data.description}</p>
      </div>
    </Tilt>
  )
}

export default Project
