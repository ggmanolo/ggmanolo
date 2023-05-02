import { useState, useEffect } from "react"
import CtaLink from "@/components/cta"

import s from "./nav.module.scss"

const Nav = () => {
  const [activeLink, setActiveLink] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY + 88 // adjust for fixed navbar
      const sections = document.querySelectorAll("section")

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (fromTop >= sectionTop && fromTop < sectionBottom) {
          setActiveLink(section.id)
        }
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className={s.nav}>
      <CtaLink
        href="#hero"
        name="Home"
        className={s.link}
        isActive={activeLink === "hero"}
      >
        Home
      </CtaLink>
      <CtaLink
        href="#projects"
        name="Projects"
        className={s.link}
        isActive={activeLink === "projects"}
      >
        Projects
      </CtaLink>
      <CtaLink
        href="#about"
        name="About"
        className={s.link}
        isActive={activeLink === "about"}
      >
        About
      </CtaLink>
    </nav>
  )
}

export default Nav
