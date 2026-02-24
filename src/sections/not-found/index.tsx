import Wrapper from "@/components/wrapper"
import CtaLink from "@/components/cta"
import s from "./not-found.module.scss"

const NotFound = () => {
  return (
    <section id="not-found" className={s.section}>
      <Wrapper className={s.wrapper}>
        <div className={s.title}>
          <span>4</span>
          <svg viewBox="0 0 160 160" className={s.planet}>
            <circle cx="80" cy="80" r="50" fill="currentColor" />
            <g transform="matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
              <path
                d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z"
                fill="var(--pink)"
                className={s.comet}
              />
            </g>
            <path
              d="M 50,0 A 50,50 0 0,0 -50,0Z"
              transform="matrix(0.866, -0.5, 0.5, 0.866, 80, 80)"
              fill="currentColor"
            />
          </svg>
          <span>4</span>
        </div>
        <p className={s.subtitle}>
          It looks like you are <strong>lost in space</strong>
        </p>
        <CtaLink href="/" variant="button" name="Go Back" className={s.button}>
          Go home
        </CtaLink>
      </Wrapper>
    </section>
  )
}

export default NotFound
