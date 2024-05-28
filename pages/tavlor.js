import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import { useEffect, useState } from 'react';
import Lightbox from '../components/Lightbox';

export default function Tavlor({ subgallery }) {
  const [imgSlider, setImgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    let filterImages = subgallery.filter(item => item.type_of === 'tavlor');
    setFilteredImages(filterImages);
  }, []);

  function imgDisplay(index) {
    setCurrentIndex(index);
    setImgSlider(true);
  }

  return (
    <tavlor className={subgalleryStyles.gallery}>
      {imgSlider === true && filteredImages[currentIndex] !== undefined ? (
        <Lightbox
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          filteredImages={filteredImages}
          setFilteredImages={setFilteredImages}
          imgSlider={imgSlider}
          setImgSlider={setImgSlider}
        />
      ) : (
        <div className={subgalleryStyles.grid}>
          {filteredImages.map((image, index) => (
            <div key={index}>
              <figure className={subgalleryStyles.effect}>
                <img src={image.picture} onClick={() => imgDisplay(index)} />
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
          ))}
        </div>
      )}
    </tavlor>
  );
}

export const getStaticProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
