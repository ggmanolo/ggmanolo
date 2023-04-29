import Section from "@/components/section"
import s from "./what.module.scss"
import { useYearsSince } from "@/hooks/use-years-since"

const What = () => {
  const years = useYearsSince("2014-12-01")

  return (
    <Section id="what" className={s["what-section"]}>
      <span>02.</span>
      <h3 className={s.title}>What I do?</h3>
      <article className={s.description}>
        <p>
          I have over <span>{years}+ years</span> of experience working as a
          developer.
        </p>
      </article>
    </Section>
  )
}

export default What
