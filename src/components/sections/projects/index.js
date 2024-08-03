"use client"
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
    <section id="projects" className={s.section}>
      <Wrapper className={s["projects-section"]}>
        <p className={s.title}>
          With <span>+{years} years</span> of experience
          <br />
          I'm looking for my next gig.
        </p>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
        className={s.svg}
      >
        <g opacity={0.15}>
          <circle cx={300} cy={300} r={200} fill="var(--pink)" />
        </g>
      </svg>
    </section>
  )
}

export default Projects
