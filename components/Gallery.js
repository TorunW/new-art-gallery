import galleryStyles from '../styles/Gallery.module.css';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

const Gallery = ({ maingallery }) => {
  const [modal, setModal] = useState(false);
  const [tempimgSrc, setTempimgSrc] = useState('');

  function getImg(picture) {
    setTempimgSrc(picture);
    setModal(true);
  }
  return (
    <>
      <div className={modal ? galleryStyles.modalOpen : galleryStyles.modal}>
        <img src={tempimgSrc} />
        <CloseIcon onClick={() => setModal(false)} />
      </div>

      <div
        className={modal ? galleryStyles.galleryBlur : galleryStyles.gallery}
      >
        {maingallery.map((image, index) => {
          return (
            <div
              className={galleryStyles.pics}
              key={index}
              onClick={() => getImg(image.picture)}
            >
              <img src={image.picture} style={{ width: '100%' }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const db = await importDb();
  const maingallery = await db.all('select * from maingallery');
  return { props: { maingallery } };
};

export default Gallery;
