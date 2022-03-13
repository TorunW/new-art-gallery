import '../styles/globals.css';
import Layout from '../components/Layout';
import SimpleReactLightbox from 'simple-react-lightbox';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </Layout>
  );
}

export default MyApp;
