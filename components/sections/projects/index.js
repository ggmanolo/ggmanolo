import { useYearsSince } from "@/hooks/use-years-since"
import useEmblaCarousel from "embla-carousel-react"
import CtaLink from "@/components/cta"
import Project from "@/components/project"
import Wrapper from "@/components/wrapper"
import { PROJECTS_DATA } from "./Data"

import s from "./projects.module.scss"

const Projects = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    breakpoints: {
      "(max-width: 767px)": { dragFree: false }
    }
  })
  const years = useYearsSince("2014-12-01")

  return (
    <section id="projects">
      <Wrapper className={s["projects-section"]}>
        <h3 className={s.title}>
          With <span>+{years} years</span> of experience
          <br />
          I'm looking for my next gig.
        </h3>
        <article className={s.description}>
          <p>
            I'm a frontend developer with a passion for visual interactions and
            UI design. I am skilled in HTML, CSS, JavaScript, and various
            frontend frameworks such as React and Next.js.{" "}
            <CtaLink href="#about" name="Learn more">
              Learn more.
            </CtaLink>
          </p>
        </article>
      </Wrapper>
      <div className={s.projects} ref={emblaRef}>
        <Wrapper className={s.projects__container}>
          {PROJECTS_DATA.map((project) => (
            <Project
              key={project.id}
              data={project}
              className={s.projects__slide}
            />
          ))}
        </Wrapper>
      </div>
    </section>
  )
}

export default Projects
