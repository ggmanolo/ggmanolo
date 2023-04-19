import Section from '@/components/section'
import s from './who.module.scss'

const Who = () => {
  return (
    <Section id="who" className={s['who-section']}>
      <h2 className={s.title}>Who am I?</h2>
      <article className={s.description}>
        <p>
          Hi, my name is Manuel Garcia Genta a.k.a. GGManolo.
        </p>
        <p>
          I'm a frontend/web/ux developer from Argentina.
        </p>
      </article>
    </Section>
  )
}

export default Who
