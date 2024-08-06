import CtaLink from "../cta"
import Image from "next/image"
import { Tilt } from "react-next-tilt"
import { ReactNode, useEffect, useState } from "react"
import clsx from "clsx"

import s from "./project.module.scss"

type ProjectProps = {
  className?: string
  data: {
    logo: ReactNode
    img: string
    placeholder: string
    date: string
    title: string
    description: string
    url: string
  }
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
      tiltMaxAngleX={10}
      tiltMaxAngleY={15}
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
        <p className={s.description}>{data.description}</p>
        <CtaLink
          href={data.url}
          className={s.cta}
          target="_blank"
          name="View Project"
          variant="button"
        >
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.315}
              d="m11.3 4.7-6.6 6.601m1.968-6.634 4.634.033.033 4.633"
            />
          </svg>
        </CtaLink>
      </div>
    </Tilt>
  )
}

export default Project
