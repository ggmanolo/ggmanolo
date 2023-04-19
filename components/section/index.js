import PropTypes from 'prop-types';
import clsx from 'clsx'

import s from './section.module.scss'

const Section = ({children, id, className}) => {
  return (
    <section id={id} className={clsx(className, s.section)}>
      <div className={s.wrapper}>
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  className: PropTypes.string
};

export default Section
