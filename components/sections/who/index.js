import Section from "@/components/section"
import s from "./who.module.scss"
import Image from "next/image"

const Who = () => {
  return (
    <Section id="who" className={s["who-section"]}>
      <span>01.</span>
      <h2 className={s.title}>Who am I?</h2>
      <div>
        <article className={s.description}>
          <p>Hi, my name is Manuel Garcia Genta a.k.a. GGManolo.</p>
          <p>
            I'm Frontend Developer with a passion for visual interactions and UI
            design. Skilled in HTML, CSS, JavaScript, and various front-end
            frameworks like React and Next.js. Experienced in building
            responsive and mobile-friendly web applications that deliver
            exceptional user experiences. I am dedicated to creating
            pixel-perfect designs that are accessible, responsive, and
            cross-browser compatible. As a UI/UX specialist, I thrive on finding
            creative solutions to complex design challenges and ensuring that
            every user interaction is intuitive and seamless.
          </p>
          <div className={s.bubble} />
        </article>
        <Image
          className={s.avatar}
          src="/avatar.png"
          alt="avatar"
          height={200}
          width={200}
          quality={100}
        />
      </div>
    </Section>
  )
}

export default Who
