import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';

export default function Tavlor({ subgallery }) {
  console.log(subgallery, 'subgallery');

  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'tavlor') {
      return (
        <div key={index} className={subgalleryStyles.container}>
          <div className={subgalleryStyles.imageContainer}>
            <img src={image.picture} />
          </div>

          <div>
            <p>{image.title}</p>
            <p>{image.price}</p>
            <p>{image.size}</p>
          </div>
        </div>
      );
    }
  });

  return (
    <tavlor>
      <div>gallery images</div>
      {/* <div className={subgalleryStyles.galleryDisplay}> */}
      {galleryImageDisplay}
      {/* </div> */}
    </tavlor>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
