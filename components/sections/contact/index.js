import Section from "@/components/section"
import s from "./contact.module.scss"
import Link from "next/link"
import DownloadCV from "@/components/cv"

const Contact = () => {
  return (
    <Section id="contact" className={s["contact-section"]}>
      <span>03.</span>
      <h3 className={s.title}>Contact me.</h3>
      <article className={s.description}>
        <p>Let's work together to build something amazing!</p>
        <p>
          <Link href="mailto:man.mdp@gmail.com" className={s.email}>
            man.mdp@gmail.com
          </Link>
        </p>
        <DownloadCV />
      </article>
    </Section>
  )
}

export default Contact
