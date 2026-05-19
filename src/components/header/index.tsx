"use client"
import { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Nav from "@/components/nav"
import s from "./header.module.scss"
import EmailCta from "../emailCta"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Check initial scroll position on mount
    setScrolled(window.pageYOffset > 150)

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          setScrolled(scrolled > 150)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={clsx(s.header, scrolled && s.scrolled)}>
      <div className={s.wrapper}>
        <Link
          href="https://github.com/ggmanolo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={s.ggmanolo}
        >
          <Image
            alt="profile"
            src="/img/avatar.png"
            height={36}
            width={36}
            quality={100}
            priority
          />
        </Link>
        <Nav />
        <EmailCta />
      </div>
    </header>
  )
}

export default Header
