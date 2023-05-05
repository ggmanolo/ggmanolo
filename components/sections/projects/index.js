import { useEffect, useRef, useState } from "react"
import { useYearsSince } from "@/hooks/use-years-since"
import useEmblaCarousel from "embla-carousel-react"
import CtaLink from "@/components/cta"
import Project from "@/components/project"
import Section from "@/components/section"
import { PROJECTS_DATA } from "./Data"

import s from "./projects.module.scss"

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true
  })
  const years = useYearsSince("2014-12-01")
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current && emblaApi) {
      prevButtonRef.current.addEventListener("click", emblaApi.scrollPrev)
      nextButtonRef.current.addEventListener("click", emblaApi.scrollNext)

      const updateButtons = () => {
        setPrevButtonDisabled(emblaApi.scrollProgress() === 0)
        setNextButtonDisabled(emblaApi.scrollProgress() === 1)
      }

      emblaApi.on("select", updateButtons)

      return () => {
        emblaApi.off("select", updateButtons)
      }
    }
  }, [emblaApi])

  return (
    <>
      <Section id="projects" className={s["projects-section"]}>
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
      </Section>
      <div className={s.projects} ref={emblaRef}>
        <Section className={s.projects__container}>
          {PROJECTS_DATA.map((project) => (
            <Project
              key={project.id}
              data={project}
              className={s.projects__slide}
            />
          ))}
        </Section>
      </div>
      <Section>
        <div className={s.controls}>
          <button
            ref={prevButtonRef}
            disabled={prevButtonDisabled}
            name="Previous Project"
            aria-label="Previous Project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 483.7 483.7"
            >
              <path
                d="M472.6 59.9c-155.1 57.7-310.1 115.3-465.2 173-4.5.1-7.2 4.2-7.4 8.5v1c.1 4.3 2.9 8.4 7.4 8.5 155.1 57.7 310.1 115.3 465.2 173 7.1 2.7 14-6.7 9.9-12.9-38.1-56.4-76.2-112.8-114.3-169.1.3-.5.6-1 1-1.6 4.4-6.5 8.7-12.9 13.1-19.4 13.8-20.5 27.7-41 41.5-61.4 19.5-28.9 39.1-57.9 58.6-86.8 4.2-6.1-2.7-15.5-9.8-12.8zM350.1 237.5c-1.6 2.4-1.6 6.4 0 8.8 34.1 50.5 68.2 101 102.4 151.5-139.8-52-279.5-104-419.2-155.9C173 189.9 312.8 138 452.5 86c-34.2 50.5-68.3 100.9-102.4 151.5z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            ref={nextButtonRef}
            disabled={nextButtonDisabled}
            name="Next Project"
            aria-label="Next Project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 483.7 483.7"
            >
              <path
                d="M11.1 59.9c-7.1-2.7-14 6.7-9.8 12.8 19.5 28.9 39.1 57.9 58.6 86.8 13.8 20.4 27.7 40.9 41.5 61.4 4.4 6.5 8.7 12.9 13.1 19.4.4.6.7 1.1 1 1.6C77.4 298.2 39.3 354.6 1.2 411c-4.1 6.2 2.8 15.6 9.9 12.9 155.1-57.7 310.1-115.3 465.2-173 4.5-.1 7.3-4.2 7.4-8.5v-1c-.2-4.3-2.9-8.4-7.4-8.5-155.1-57.7-310.1-115.3-465.2-173zm122.5 177.6C99.5 186.9 65.4 136.5 31.2 86c139.7 52 279.5 103.9 419.2 155.9C310.7 293.8 171 345.8 31.2 397.8c34.2-50.5 68.3-101 102.4-151.5 1.6-2.4 1.6-6.4 0-8.8z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </Section>
    </>
  )
}

export default Projects
