import Wrapper from "@/components/wrapper"
import DownloadCV from "@/components/cv"
import EmailCta from "@/components/emailCta"

import s from "./about.module.scss"

const About = () => {
  return (
    <section id="about">
      <Wrapper className={s["about-section"]}>
        <div>
          <p className={s.title}>
            Hi, I'm Manuel Garcia Genta
            <br />
            A.K.A. <span>GGManolo</span>
          </p>
          <DownloadCV className={s.desktop} />
        </div>
        <article className={s.description}>
          <p>
            I'm a frontend developer with a passion for visual interactions and
            UI design. I am skilled in HTML, CSS, JavaScript, and various
            frontend frameworks such as React and Next.js. I have experience
            building responsive and mobile-friendly websites and web apps from
            scratch, delivering exceptional user experiences.
          </p>
          <p>
            I am dedicated to creating pixel-perfect designs that are
            accessible, responsive, and cross-browser compatible. As a UI/UX
            specialist, I thrive on finding creative solutions to complex design
            challenges and ensuring that every user interaction is intuitive and
            seamless.
          </p>
        </article>
        <div className={s.actions}>
          <EmailCta className={s.mobile} />
          <DownloadCV className={s.mobile} />
        </div>
      </Wrapper>
    </section>
  )
}

export default About
