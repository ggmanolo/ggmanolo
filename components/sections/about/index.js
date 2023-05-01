import Section from "@/components/section"
import s from "./about.module.scss"
import DownloadCV from "@/components/cv"

const About = () => {
  return (
    <Section id="about" className={s["about-section"]}>
      <div>
        <h3 className={s.title}>
          Hi, I'm Manuel Garcia Genta
          <br />
          A.K.A. <span>GGManolo</span>
        </h3>
        <DownloadCV />
      </div>
      <article className={s.description}>
        <p>
          I'm a frontend developer with a passion for visual interactions and UI
          design. I am skilled in HTML, CSS, JavaScript, and various frontend
          frameworks such as React and Next.js. I have experience building
          responsive and mobile-friendly web applications that deliver
          exceptional user experiences.
        </p>
        <p>
          I am dedicated to creating pixel-perfect designs that are accessible,
          responsive, and cross-browser compatible. As a UI/UX specialist, I
          thrive on finding creative solutions to complex design challenges and
          ensuring that every user interaction is intuitive and seamless.
        </p>
      </article>
    </Section>
  )
}

export default About
