import Section from "@/components/section"
import { useYearsSince } from "@/hooks/use-years-since"
import CtaLink from "@/components/cta"

import s from "./projects.module.scss"

const Projects = () => {
  const years = useYearsSince("2014-12-01")

  return (
    <Section id="projects" className={s["projects-section"]}>
      <h3 className={s.title}>
        With <span>+{years} years</span> of experience
        <br />
        I'm looking for my next gig.
      </h3>
      <article className={s.description}>
        <p>
          I'm a frontend developer with a passion for visual interactions and UI
          design. I am skilled in HTML, CSS, JavaScript, and various frontend
          frameworks such as React and Next.js.{" "}
          <CtaLink href="#about" name="Learn more">
            Learn more.
          </CtaLink>
        </p>
      </article>
    </Section>
  )
}

export default Projects
