import Wrapper from "@/components/wrapper"
import DownloadCV from "@/components/cv"
import EmailCta from "@/components/emailCta"
import { calculateYearsSince } from "@/utils/calculate-years-since"

import s from "./about.module.scss"

const About = () => {
  const years = calculateYearsSince("2014-12-01")

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
            I'm a Senior Frontend Engineer with <strong>+{years} years</strong>{" "}
            of experience building production-ready web applications.
          </p>
          <p>
            My strength lies in translating design into scalable, performant
            interfaces while maintaining a strong sense of visual quality and
            product coherence. I enjoy working at the intersection of
            engineering and design, ensuring that what users see and feel is as
            intentional as the code behind it.
          </p>
          <p>
            I've led frontend initiatives from scratch, defined architecture for
            marketing and product surfaces, and collaborated closely with design
            teams in fully remote environments.
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
