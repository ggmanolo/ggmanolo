import { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Nav from "@/components/nav"

import s from "./header.module.scss"
import s_cta from "../cta/cta.module.scss"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      setCopySuccess(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      setScrolled(scrolled > 0)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={clsx(s.header, scrolled && s.scrolled)}>
      <div className={s.wrapper}>
        <div className={s.ggmanolo}>
          <Image
            alt="profile"
            src="/img/avatar.png"
            height={36}
            width={36}
            quality={100}
          />
        </div>
        <Nav />
        <button
          name="email"
          className={clsx(s_cta.link, s.button)}
          onClick={() => copyToClipboard("man.mdp@gmail.com")}
        >
          man.mdp@gmail.com
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 560 560"
            className={clsx(s.copy, copySuccess && s.show, s.check)}
          >
            <path
              d="M452.3 560H107.7c-28.6 0-55.9-11.4-76.1-31.6C11.4 508.2 0 480.9 0 452.3V107.7c0-28.6 11.4-55.9 31.6-76.1C51.8 11.4 79.1 0 107.7 0h344.6c28.6 0 55.9 11.4 76.1 31.6 20.2 20.2 31.5 47.6 31.6 76.1v344.6c0 28.6-11.4 55.9-31.6 76.1-20.2 20.2-47.5 31.6-76.1 31.6zM107.7 43.1C90.6 43.1 74.1 49.9 62 62c-12.1 12.1-18.9 28.6-18.9 45.7v344.6c0 17.1 6.8 33.6 18.9 45.7 12.1 12.1 28.6 18.9 45.7 18.9h344.6c17.1 0 33.6-6.8 45.7-18.9 12.1-12.1 18.9-28.6 18.9-45.7V107.7c0-17.1-6.8-33.6-18.9-45.7-12.1-12.1-28.6-18.9-45.7-18.9H107.7z"
              fill="currentColor"
            />
            <path
              d="M216.7 409.2c-5.6 0-11.1-2.2-15.1-6.2l-87.4-86.2c-5-5.5-6.8-13.1-4.8-20.3 2-7.1 7.5-12.8 14.6-14.9 7.1-2.1 14.8-.4 20.4 4.5l72.2 71.1 199-200.1c4-4.2 9.5-6.5 15.3-6.6 5.8-.1 11.3 2.2 15.4 6.3s6.4 9.6 6.4 15.4c0 5.8-2.4 11.3-6.5 15.3L232 403c-4.1 4-9.6 6.3-15.3 6.2z"
              fill="currentColor"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            className={clsx(s.copy, !copySuccess && s.show)}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.8}
              d="M12.603 6.734H7.802c-.59 0-1.067.478-1.067 1.067v4.802c0 .59.477 1.067 1.066 1.067h4.802c.59 0 1.067-.478 1.067-1.067V7.802c0-.59-.478-1.067-1.067-1.067Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.8}
              d="M4.6 9.935h-.533A1.067 1.067 0 0 1 3 8.868V4.067A1.067 1.067 0 0 1 4.067 3h4.801a1.067 1.067 0 0 1 1.067 1.067v.534"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
