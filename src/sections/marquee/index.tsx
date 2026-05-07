import BasementSvg from "@/components/svg/basement"
import DittoSvg from "@/components/svg/ditto"
import EpicGamesSvg from "@/components/svg/epic-games"
import GlobantSvg from "@/components/svg/globant"
import InnovusLabsSvg from "@/components/svg/innovus-labs"
import MakingSenseSvg from "@/components/svg/making-sense"
import styles from "./marquee.module.scss"

const Marquee = () => {
  const logos = [
    {
      id: "innovus-labs",
      Svg: InnovusLabsSvg,
      name: "Innovus Labs",
      height: "28px",
      url: "https://innovus.ai/",
    },
    {
      id: "making-sense",
      Svg: MakingSenseSvg,
      name: "Making Sense",
      height: "32px",
      url: "https://makingsense.com/",
    },
    { id: "ditto", Svg: DittoSvg, name: "Ditto", height: "32px", url: "https://ditto.com/" },
    {
      id: "basement",
      Svg: BasementSvg,
      name: "Basement",
      height: "22px",
      url: "https://basement.studio/",
    },
    {
      id: "globant",
      Svg: GlobantSvg,
      name: "Globant",
      height: "30px",
      url: "https://globant.com/",
    },
    {
      id: "epic-games",
      Svg: EpicGamesSvg,
      name: "Epic Games",
      height: "40px",
      url: "https://epicgames.com/",
    },
  ]

  return (
    <section className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          {logos.map(({ id, Svg, name, height, url }) => (
            <a
              key={`${id}-1`}
              className={styles.marqueeItem}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              <Svg className={styles.logo} aria-hidden="true" style={{ height }} />
            </a>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {logos.map(({ id, Svg, name, height, url }) => (
            <a
              key={`${id}-2`}
              className={styles.marqueeItem}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <Svg className={styles.logo} aria-hidden="true" style={{ height }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Marquee
