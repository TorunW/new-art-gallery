import ImageDisplay from '../components/ImageDisplay';
import Lightbox from '../components/Lightbox';
import { importDb } from '../config/db';
import styles from '../styles/SecondGallery.module.css';
import { useState, useEffect } from 'react';

export default function Betongmosaik({ subgallery }) {
  const [imgSlider, setImgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    let filterImages = subgallery.filter(
      item => item.type_of === 'betongmosaik'
    );
    setFilteredImages(filterImages);
  }, []);

  return (
    <betongmosaik className={styles.gallery}>
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
        <div className={styles.grid}>
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
    </betongmosaik>
  );
}

export const getStaticProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
