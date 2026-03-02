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
      height: "28px"
    },
    {
      id: "making-sense",
      Svg: MakingSenseSvg,
      name: "Making Sense",
      height: "32px"
    },
    { id: "ditto", Svg: DittoSvg, name: "Ditto", height: "32px" },
    { id: "basement", Svg: BasementSvg, name: "Basement", height: "22px" },
    { id: "globant", Svg: GlobantSvg, name: "Globant", height: "30px" },
    { id: "epic-games", Svg: EpicGamesSvg, name: "Epic Games", height: "40px" }
  ]

  return (
    <section className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          {logos.map(({ id, Svg, name, height }) => (
            <div key={`${id}-1`} className={styles.marqueeItem}>
              <Svg
                className={styles.logo}
                aria-label={name}
                style={{ height }}
              />
            </div>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {logos.map(({ id, Svg, name, height }) => (
            <div key={`${id}-2`} className={styles.marqueeItem}>
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
