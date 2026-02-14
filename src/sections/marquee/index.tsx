import BasementSvg from "@/components/svg/basement"
import DittoSvg from "@/components/svg/ditto"
import EpicGamesSvg from "@/components/svg/epic-games"
import GlobantSvg from "@/components/svg/globant"
import InnovusLabsSvg from "@/components/svg/innovus-labs"
import MakingSenseSvg from "@/components/svg/making-sense"
import styles from "./marquee.module.scss"

const Marquee = () => {
  const logos = [
    { Svg: BasementSvg, name: "Basement", height: "22px" },
    { Svg: GlobantSvg, name: "Globant", height: "30px" },
    { Svg: EpicGamesSvg, name: "Epic Games", height: "40px" },
    { Svg: InnovusLabsSvg, name: "Innovus Labs", height: "28px" },
    { Svg: MakingSenseSvg, name: "Making Sense", height: "32px" },
    { Svg: DittoSvg, name: "Ditto", height: "32px" }
  ]

  return (
    <section className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          {logos.map(({ Svg, name, height }) => (
            <div key={`${name}-1`} className={styles.marqueeItem}>
              <Svg
                className={styles.logo}
                aria-label={name}
                style={{ height }}
              />
            </div>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {logos.map(({ Svg, name, height }) => (
            <div key={`${name}-2`} className={styles.marqueeItem}>
              <Svg
                className={styles.logo}
                aria-label={name}
                style={{ height }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Marquee
