import { Background } from "./background"
import { Meteors } from "./meteors"

import s from "./starfield.module.scss"

const Starfield = () => {
  return (
    <div className={s.starfield}>
      <div className={s.wrapper}>
        <Background />

        <Meteors />
      </div>
    </div>
  )
}

export default Starfield
