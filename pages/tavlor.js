import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

export default function Tavlor({ subgallery }) {
  const [modal, setModal] = useState(false);
  const [tempimgSrc, setTempimgSrc] = useState('');

  function getImg(picture) {
    setTempimgSrc(picture);
    setModal(true);
  }

  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'tavlor') {
      return (
        <div key={index} onClick={() => getImg(image.picture)}>
          <figure className={subgalleryStyles.effect}>
            <img src={image.picture} />
            <figcaption>
              <h2>{image.title}</h2>
              <div className={subgalleryStyles.description}>
                <p>
                  {image.price ? 'Pris: ' : ''}
                  {image.price}
                  {image.price ? ' kr' : ''}
                </p>
                <p>
                  {image.size ? 'Storlek: ' : ''}
                  {image.size}
                  {image.size ? ' cm' : ''}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      );
    }
  });

  return (
    <tavlor>
      <div
        className={modal ? subgalleryStyles.modalOpen : subgalleryStyles.modal}
      >
        <img src={tempimgSrc} />
        <CloseIcon onClick={() => setModal(false)} />
      </div>
      <div
        className={
          modal ? subgalleryStyles.galleryBlur : subgalleryStyles.gallery
        }
      >
        <div className={subgalleryStyles.grid}>{galleryImageDisplay}</div>
      </div>
    </tavlor>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
