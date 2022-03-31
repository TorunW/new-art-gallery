import galleryStyles from '../styles/Gallery.module.css';
import lightboxStyles from '../styles/Lightbox.module.css';
import { useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';

const MainGallery = ({ maingallery }) => {
  const [imgSlider, setimgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function imgDisplay(index) {
    setCurrentIndex(index);
    setimgSlider(true);
  }

  function nextImg() {
    const nextIndex = currentIndex + 1;
    const maxIndex = maingallery.length - 1;
    const minIndex = 0;

    if (nextIndex > maxIndex) {
      setCurrentIndex(minIndex);
    } else {
      const newIndex = nextIndex;
      setCurrentIndex(newIndex);
    }
  }

  function prevImg() {
    const prevIndex = currentIndex - 1;
    const minIndex = 0;
    const maxIndex = maingallery.length - 1;

    if (prevIndex < minIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prevIndex);
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 37) {
        console.log('left');
        prevImg(e);
      } else if (e.keyCode === 39) {
        console.log('right');
        nextImg(e);
      }
    });
  }

  return (
    <div className={galleryStyles.gallery}>
      <div
        className={
          imgSlider ? lightboxStyles.lightboxOpen : lightboxStyles.lightboxClose
        }
      >
        <AiOutlineClose
          className={lightboxStyles.closeBtn}
          onClick={() => setimgSlider(false)}
        />
        <img src={maingallery[currentIndex].picture} />
        <AiOutlineArrowLeft
          className={lightboxStyles.leftBtn}
          onClick={() => prevImg()}
        />

        <AiOutlineArrowRight
          className={lightboxStyles.rightBtn}
          onClick={() => nextImg()}
        />
      </div>
      <div className={galleryStyles.grid}>
        {maingallery.map((item, index) => {
          return (
            <div className={galleryStyles.wrapper} key={index}>
              <img
                loading="lazy"
                src={item.picture}
                style={{ width: '100%' }}
                onClick={() => imgDisplay(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const db = await importDb();
  const maingallery = await db.all('select * from maingallery');
  return { props: { maingallery } };
};

export default MainGallery;
