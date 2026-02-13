"use client"
import clsx from "clsx"
import s from "./cv.module.scss"

type DownloadCVProps = {
  className?: string
}

const DownloadCV = ({ className }: DownloadCVProps) => {
  const cvUrl =
    "https://docs.google.com/document/d/1WrMCdQJS4F9K_cGo0ywcTvJpiNwFspbOLbD6tek1tUU/export?format=pdf"
  const cvFilename = "Manuel_Garcia_Genta.pdf"

  const handleDownloadClick = () => {
    fetch(cvUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", cvFilename)
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)
      })
  }

  return (
    <button onClick={handleDownloadClick} className={clsx(s.button, className)}>
      <span>Download Resume</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.333}
          d="M14 10v2.667A1.334 1.334 0 0 1 12.667 14H3.333A1.334 1.334 0 0 1 2 12.667V10m2.667-3.333L8 10l3.333-3.333M8 10V2"
        />
      </svg>
    </button>
  )
}

export default DownloadCV
