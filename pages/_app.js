import PropTypes from 'prop-types';
import '@/styles/globals.scss'
import '../public/fonts/wildworld.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};