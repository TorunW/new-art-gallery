import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';

export default function Tavlor({ subgallery }) {
  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'tavlor') {
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
    <tavlor>
      <div className={subgalleryStyles.grid}>{galleryImageDisplay}</div>
    </tavlor>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
