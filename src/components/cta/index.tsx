"use client"
import clsx from "clsx"
import Link from "next/link"
import { ReactNode, Ref, useCallback, MouseEventHandler, useEffect } from "react"
import { useHasHover } from "@/hooks/use-media-query"
import { useHyperspeedTrigger } from "@/store"
import s from "./cta.module.scss"

type CtaLinkProps = {
  className?: string
  href: string
  name: string
  children: ReactNode
  isActive?: boolean
  variant?: "link" | "button"
  target?: "_blank" | "_self" | "_parent" | "_top"
  ref?: Ref<HTMLAnchorElement>
}

function CtaLink(props: CtaLinkProps) {
  const {
    className,
    href,
    name,
    children,
    isActive = false,
    variant = "link",
    target,
    ref,
    ...rest
  } = props
  const isInternalLink = href.startsWith("#") || href.startsWith("/")
  const isButton = variant === "button"
  const hasHover = useHasHover()
  const { activate, deactivate } = useHyperspeedTrigger()

  const handleMouseMove = useCallback((e: PointerEvent) => {
    document.documentElement.style.setProperty("--x", e.clientX.toFixed(2))
    document.documentElement.style.setProperty("--y", e.clientY.toFixed(2))
  }, [])

  useEffect(() => {
    if (isButton) {
      document.addEventListener("pointermove", handleMouseMove)
      return () => {
        document.removeEventListener("pointermove", handleMouseMove)
      }
    }
  }, [isButton, handleMouseMove])

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      // Deactivate hyperspeed when clicking to prevent it staying active after navigation
      if (isButton && hasHover) {
        deactivate()
      }

      if (href.startsWith("#")) {
        e.preventDefault()
        const destination = document.querySelector(href)
        if (destination) {
          destination.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    },
    [href, isButton, hasHover, deactivate],
  )

  const handleMouseEnter = useCallback(() => {
    if (isButton && hasHover) {
      activate()
    }
  }, [isButton, hasHover, activate])

  const handleMouseLeave = useCallback(() => {
    if (isButton && hasHover) {
      deactivate()
    }
  }, [isButton, hasHover, deactivate])

  return (
    <Link
      aria-label={name}
      data-content={name}
      className={clsx(className, s.link, isActive && !isButton && s.active, isButton && s.button)}
      href={href}
      ref={ref}
      target={target}
      onClick={isInternalLink ? handleClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default CtaLink
