import s from "./cv.module.scss"

const DownloadCV = () => {
  const cvUrl =
    "https://docs.google.com/document/d/1WrMCdQJS4F9K_cGo0ywcTvJpiNwFspbOLbD6tek1tUU/export?format=pdf"
  const cvFilename = "my-cv.pdf"

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
        link.parentNode.removeChild(link)
      })
  }

  return (
    <button onClick={handleDownloadClick} className={s.button}>
      <span>Download CV</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 536.5 555"
      >
        <path
          d="M257.3 550.4c3 3 7 4.5 10.9 4.5 3.9 0 7.9-1.5 10.9-4.5L532 297.6c4.4-4.4 5.7-11.1 3.4-16.8-2.4-5.8-8-9.6-14.3-9.6H391.5V15.5C391.5 7 384.6 0 376 0c-8.5 0-15.5 6.9-15.5 15.5v271.2c0 8.5 6.9 15.5 15.5 15.5h107.7L268.2 517.6 52.8 302.2h107.7c8.5 0 15.5-6.9 15.5-15.5V30.9h128c8.5 0 15.5-6.9 15.5-15.5 0-8.5-6.9-15.5-15.5-15.5H160.5c-8.6.1-15.5 7-15.5 15.6v255.8H15.5c-6.3 0-11.9 3.8-14.3 9.6-2.4 5.8-1.1 12.4 3.4 16.8l252.7 252.7z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export default DownloadCV
