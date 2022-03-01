import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import CloseIcon from '@material-ui/icons/Close';
import galleryStyles from '../styles/Gallery.module.css';
import { useState } from 'react';

export default function Betongmosaik({ subgallery }) {
  const [modal, setModal] = useState(false);
  const [tempimgSrc, setTempimgSrc] = useState('');

  function getImg(picture) {
    setTempimgSrc(picture);
    setModal(true);
  }

  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'skulpturer') {
      return (
        <div key={index}>
          <figure className={subgalleryStyles.effect}>
            <img src={image.picture} />
            <figcaption>
              <h2>{image.title}</h2>
              <div className={subgalleryStyles.description}>
                <p>{image.price}</p>
                <p>{image.size}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      );
    }
  });

  return (
    <betongmosaik>
      <div
        className={modal ? subgalleryStyles.modalOpen : subgalleryStyles.modal}
      >
        <img src={tempimgSrc} />
        <CloseIcon onClick={() => setModal(false)} />
      </div>

      <div className={subgalleryStyles.grid}>
        <div
          className={
            modal ? subgalleryStyles.galleryBlur : subgalleryStyles.gallery
          }
        >
          {galleryImageDisplay}
        </div>
      </div>
    </betongmosaik>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
