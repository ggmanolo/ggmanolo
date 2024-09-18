import { useState } from "react"
import clsx from "clsx"
import CtaLink from "../cta"

import s from "./emailCta.module.scss"
import s_cta from "../cta/cta.module.scss"

const EmailCta = () => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      setCopySuccess(false)
    }
  }

  return (
    <div className={s.cta}>
      <CtaLink
        href="mailto:hellothere@ggmanolo.com"
        name="hellothere@ggmanolo.com"
      >
        hellothere@ggmanolo.com
      </CtaLink>
      <button
        name="email"
        className={clsx(s_cta.link, s.button, copySuccess && s.success)}
        onClick={() => copyToClipboard("hellothere@ggmanolo.com")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 466.5 466.5"
          className={clsx(s.copy, copySuccess && s.show, s.check)}
          fill="currentColor"
        >
          <path d="M345.5 46.5C336 19.6 310.2 0 280 0h-93.5c-30.2 0-56 19.6-65.5 46.5h-4.5c-38.6 0-70 31.4-70 70v280c0 38.6 31.4 70 70 70H350c38.6 0 70-31.4 70-70v-280c0-38.6-31.4-70-70-70h-4.5zm-159 0H280c12.9 0 23.5 10.6 23.5 23.5s-11.2 23-24.1 23h-93C173.6 93 163 82.3 163 69.4s10.6-22.9 23.5-22.9zm186.5 70v280c0 12.9-10.6 23.5-23.5 23.5h-233c-12.9 0-23.5-10.6-23.5-23.5v-280c0-12.9 10.6-23.5 23.5-23.5h4.5c9.5 26.9 35.3 46.5 65.5 46.5H280c30.2 0 56-19.6 65.5-46.5h4.5c12.3 0 23 10.6 23 23.5z" />
          <path d="m209.4 293.4-53.2-53.8-33 33 86.2 86.8 133.3-133.3-33-33-100.3 100.3z" />
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
            strokeWidth={1.5}
            d="M12.603 6.734H7.802c-.59 0-1.067.478-1.067 1.067v4.802c0 .59.477 1.067 1.066 1.067h4.802c.59 0 1.067-.478 1.067-1.067V7.802c0-.59-.478-1.067-1.067-1.067Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.6 9.935h-.533A1.067 1.067 0 0 1 3 8.868V4.067A1.067 1.067 0 0 1 4.067 3h4.801a1.067 1.067 0 0 1 1.067 1.067v.534"
          />
        </svg>
      </button>
    </div>
  )
}

export default EmailCta
