import Wrapper from "@/components/wrapper"

import s from "./not-found.module.scss"
import CtaLink from "@/components/cta"
import Gradient from "@/components/gradient"

const NotFound = () => {
  return (
    <section id="not-found" className={s.section}>
      <Gradient />
      <Wrapper className={s.wrapper}>
        <div className={s.title}>
          <span>4</span>
          <svg viewBox="0 0 160 160" className={s.planet}>
            <circle cx="80" cy="80" r="50" fill="currentColor" />
            <g transform="matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
              <path
                d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z"
                fill="var(--pink)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 0 0"
                  to="0 0 0"
                  dur="1.75s"
                  repeatCount="indefinite"
                />
              </path>
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
          Go Back
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.315}
              d="M3.4 8h9.3m-6.1 3.3L3.4 8l3.3-3.3"
            />
          </svg>
        </CtaLink>
      </Wrapper>
    </section>
  )
}

export default NotFound
