import { ReactNode } from "react"
import clsx from "clsx"
import s from "./wrapper.module.scss"

type WrapperProps = {
  children: ReactNode
  id?: string
  className?: string
}

const Wrapper = ({ children, id, className }: WrapperProps) => {
  return (
    <div id={id} className={clsx(className, s.section)}>
      {children}
    </div>
  )
}

export default Wrapper
