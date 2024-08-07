import { ReactNode } from "react"
import Header from "../header"
import Starfield from "../starfield"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Starfield />
      <Header />
      {children}
    </>
  )
}

export default Layout
