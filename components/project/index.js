import PropTypes from "prop-types"
import CtaLink from "../cta"

import s from "./project.module.scss"
import Image from "next/image"

const Project = ({ data }) => {
  return (
    <div className={s.card}>
      <div className={s.logo}>{data.logo}</div>
      <div className={s.img}>
        <Image alt={data.title} src={data.img} fill />
      </div>
      <div className={s.date}>{data.date}</div>
      <h4 className={s.title}>{data.title}</h4>
      <div className={s.description}>{data.description}</div>
      <CtaLink href={data.url} className={s.cta} target="_blank">
        View Project
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.315}
            d="m11.3 4.7-6.6 6.601m1.968-6.634 4.634.033.033 4.633"
          />
        </svg>
      </CtaLink>
    </div>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.node,
    img: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default Project
