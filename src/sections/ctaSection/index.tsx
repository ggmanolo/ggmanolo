import Wrapper from "@/components/wrapper"
import CtaLink from "@/components/cta"
import s from "./ctaSection.module.scss"

const CtaSection = () => {
  return (
    <section id="cta" className={s.section}>
      <Wrapper className={s["cta-section"]}>
        <p className={s.text}>
          Open to remote opportunities where <span>frontend quality</span> and{" "}
          <span>product experience</span> truly matter.
        </p>
        <CtaLink
          href="mailto:hellothere@ggmanolo.com"
          name="Get in touch"
          variant="button"
        >
          Get in touch
        </CtaLink>
      </Wrapper>
    </section>
  )
}

export default CtaSection
