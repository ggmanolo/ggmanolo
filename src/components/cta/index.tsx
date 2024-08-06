"use client"
import clsx from "clsx"
import Link from "next/link"
import { forwardRef, ReactNode, useCallback, MouseEventHandler } from "react"

import s from "./cta.module.scss"

type CtaLinkProps = {
  className?: string
  href: string
  name: string
  children: ReactNode
  isActive?: boolean
  variant?: "link" | "button"
  target?: "_blank" | "_self" | "_parent" | "_top"
}

const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>((props, ref) => {
  const {
    className,
    href,
    name,
    children,
    isActive = false,
    variant = "link",
    target,
    ...rest
  } = props
  const isInternalLink = href.startsWith("#") || href.startsWith("/")
  const isButton = variant === "button"

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
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
      data-content={name}
      className={clsx(
        className,
        s.link,
        isActive && !isButton && s.active,
        isButton && s.button
      )}
      href={href}
      ref={ref}
      target={target}
      onClick={isInternalLink ? handleClick : undefined}
      {...rest}
    >
      {children}
    </Link>
  )
})

export default CtaLink
