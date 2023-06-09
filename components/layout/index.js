import PropTypes from "prop-types"
import Meta from "@/components/meta"
import Header from "../header"

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
