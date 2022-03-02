import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import { useState } from 'react';
import EmblaCarousel from './EmblaCarousel';

export default function Betongmosaik({ subgallery }) {
  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'betongmosaik') {
      return (
        <div key={index}>
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
                  {image.size ? 'Storlek:' : ''}
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
    <betongmosaik>
      <div className={subgalleryStyles.grid}>{galleryImageDisplay}</div>
    </betongmosaik>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
