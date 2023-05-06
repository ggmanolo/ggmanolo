import clsx from "clsx"
import MeshGradient from "./mesh-gradient"

import s from "./webgl.module.scss"

const MeshBackground = () => (
  <div className={s.wrapper}>
    <div className={clsx(s.overlay, s.up)} />
    <div className={clsx(s.overlay, s.down)} />
    <MeshGradient />
  </div>
)

export default MeshBackground
