"use client"
import clsx from "clsx"
import Link from "next/link"
import {
  forwardRef,
  ReactNode,
  useCallback,
  MouseEventHandler,
  useEffect,
  MouseEvent
} from "react"
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

const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(
  function CtaLink(props, ref) {
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

    const handleMouseMove = useCallback((e: MouseEvent<Document>) => {
      document.documentElement.style.setProperty("--x", e.clientX.toFixed(2))
      document.documentElement.style.setProperty("--y", e.clientY.toFixed(2))
    }, [])

    useEffect(() => {
      if (isButton) {
        document.addEventListener("pointermove", handleMouseMove as any)
        return () => {
          document.removeEventListener("pointermove", handleMouseMove as any)
        }
      }
    }, [isButton, handleMouseMove])

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
  }
)

CtaLink.displayName = "CtaLink"

export default CtaLink
