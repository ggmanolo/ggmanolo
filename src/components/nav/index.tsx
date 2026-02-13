import CtaLink from "@/components/cta"
import s from "./nav.module.scss"

const Nav = () => {
  return (
    <nav className={s.nav}>
      <CtaLink href="#hero" name="Home" className={s.link}>
        Home
      </CtaLink>
      <CtaLink href="#projects" name="Projects" className={s.link}>
        Projects
      </CtaLink>
      <CtaLink href="#about" name="About" className={s.link}>
        About
      </CtaLink>
    </nav>
  )
}

export default Nav
