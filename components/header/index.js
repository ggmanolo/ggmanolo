import { useEffect, useState } from "react"
import CtaLink from "../cta"
import clsx from "clsx"

import s from "./header.module.scss"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset + 80
      const viewportHeight = window.innerHeight
      setScrolled(scrolled > viewportHeight)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={clsx(s.header, scrolled && s.fixed)}>
      <nav className={s.wrapper}>
        <CtaLink href="#hero" name="Hi">
          Hello
        </CtaLink>
        <CtaLink href="#who" name="Who">
          Who
        </CtaLink>
        <CtaLink href="#what" name="What">
          What
        </CtaLink>
        <CtaLink href="#contact" name="Contact">
          Contact
        </CtaLink>
      </nav>
    </header>
  )
}

export default Header