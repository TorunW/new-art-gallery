import { server } from '../config/server';
import { importDb } from '../config/db';
import { useState } from 'react';

export default function Tavlor({ subgallery }) {
  let galleryImageDisplay = subgallery.map((image, index) => [
    <div key={index} image={image}>
      {image.type_of === 'tavlor' ? (
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
    <tavlor>
      <div>gallery images</div>
      {galleryImageDisplay}
    </tavlor>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
