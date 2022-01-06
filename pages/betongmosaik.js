// import { server } from '../config/server';
import { importDb } from '../config/db';
// import { useState } from 'react';
import SecondGalleryStyles from '../styles/SecondGallery.module.css';

export default function Betongmosaik({ subgallery }) {
  let galleryImageDisplay = subgallery.map((image, index) => [
    <div key={index} image={image}>
      {image.type_of === 'betong&mosaik' ? (
        <>
          <img src={image.picture} />
          <div>
            <p>{image.title}</p>
            <p>{image.price}</p>
            <p>{image.size}</p>
          </div>
        </>
      ) : (
        ''
      )}
    </div>,
  ]);

  return (
    <betongmosaik className={SecondGalleryStyles.mosaic}>
      <div>gallery images</div>
      {galleryImageDisplay}
    </betongmosaik>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
