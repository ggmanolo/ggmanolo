import clsx from "clsx"
import Galaxy from "@/components/galaxy"
import MeshGradient from "./mesh-gradient"

import s from "./gradient.module.scss"
import Stars from "../stars"

const Gradient = () => (
  <div className={s.wrapper}>
    <div className={clsx(s.overlay, s.up)} />
    <div className={clsx(s.overlay, s.down)} />
    <Galaxy />
    <MeshGradient />
    <div className={s.stars}>
      <Stars />
    </div>
  </div>
)

export default Gradient
