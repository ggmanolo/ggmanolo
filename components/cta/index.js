import clsx from "clsx"
import Link from "next/link"
import { forwardRef, useCallback } from "react"
import PropTypes from "prop-types"

import s from "./cta.module.scss"

const CtaLink = forwardRef((props, ref) => {
  const { className, href, name, children, ...rest } = props

  const handleClick = useCallback(
    (e) => {
      if (href.startsWith("#")) {
        e.preventDefault()
        const destination = document.querySelector(href)
        if (destination) {
          destination.scrollIntoView({
            behavior: "smooth"
          })
        }
      }
    },
    [href]
  )

  return (
    <Link
      aria-label={name}
      className={clsx(className, s.link)}
      href={href}
      ref={ref}
      onClick={handleClick}
      {...rest}
    >
      <span>{children}</span>
    </Link>
  )
})

CtaLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

CtaLink.displayName = "CtaLink"

export default CtaLink
