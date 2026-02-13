"use client"
import { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Nav from "@/components/nav"
import s from "./header.module.scss"
import EmailCta from "../emailCta"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      setScrolled(scrolled > 150)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={clsx(s.header, scrolled && s.scrolled)}>
      <div className={s.wrapper}>
        <div className={s.ggmanolo}>
          <Image
            alt="profile"
            src="/img/avatar.png"
            height={36}
            width={36}
            quality={100}
            priority
          />
        </div>
        <Nav />
        <EmailCta />
      </div>
    </header>
  )
}

export default Header
