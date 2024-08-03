"use client"
import clsx from "clsx"
import Link from "next/link"
import { forwardRef, useCallback } from "react"
import PropTypes from "prop-types"

import s from "./cta.module.scss"

const CtaLink = forwardRef((props, ref) => {
  const { className, href, name, children, isActive = false, ...rest } = props
  const hash = href.startsWith("#") ? href.slice(1) : null
  const isButton = props.variant === "button"

  const handleClick = useCallback(
    (e) => {
      if (hash) {
        e.preventDefault()
        const destination = document.querySelector(href)
        if (destination) {
          destination.scrollIntoView({
            behavior: "smooth"
          })
        }
      }
    },
    [hash, href]
  )

  return (
    <Link
      aria-label={name}
      data-content={name}
      className={clsx(
        className,
        s.link,
        isActive && !isButton && s.active,
        isButton && s.button
      )}
      href={href}
      ref={ref}
      onClick={isActive ? null : handleClick}
      {...rest}
    >
      {children}
    </Link>
  )
})

CtaLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  variant: PropTypes.string
}

CtaLink.displayName = "CtaLink"

export default CtaLink
