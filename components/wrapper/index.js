import PropTypes from "prop-types"
import clsx from "clsx"

import s from "./wrapper.module.scss"

const Wrapper = ({ children, id, className }) => {
  return (
    <div id={id} className={clsx(className, s.section)}>
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  className: PropTypes.string
}

export default Wrapper
