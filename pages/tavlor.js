import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import { useEffect, useState } from 'react';
import Lightbox from '../components/Lightbox';
import ImageDisplay from '../components/ImageDisplay';

export default function Tavlor({ subgallery }) {
  const [imgSlider, setImgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    let filterImages = subgallery.filter(item => item.type_of === 'tavlor');
    setFilteredImages(filterImages);
  }, []);

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
            <ImageDisplay
              index={index}
              image={image}
              setCurrentIndex={setCurrentIndex}
              setImgSlider={setImgSlider}
            />
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
