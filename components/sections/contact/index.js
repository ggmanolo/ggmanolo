import Section from "@/components/section"
import s from "./contact.module.scss"
import Link from "next/link"

const Contact = () => {
  return (
    <Section id="contact" className={s["contact-section"]}>
      <span>03.</span>
      <h2 className={s.title}>Contact me.</h2>
      <article className={s.description}>
        <p>Let's work together to build something amazing!</p>
        <p>
          <Link href="mailto:man.mdp@gmail.com" className={s.email}>
            man.mdp@gmail.com
          </Link>
        </p>
      </article>
    </Section>
  )
}

export default Contact
