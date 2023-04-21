import PropTypes from 'prop-types';
import Meta from '@/components/meta'
import Header from '../header';

const Layout = ({children}) => {
  return (
    <>
      <Meta />
      <main>
        <Header />
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
