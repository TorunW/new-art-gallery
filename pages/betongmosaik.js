import { importDb } from '../config/db';
import subgalleryStyles from '../styles/SecondGallery.module.css';
import { useState } from 'react';
import lightboxStyles from '../styles/Lightbox.module.css';
// import {
//   AiOutlineClose,
//   AiOutlineArrowLeft,
//   AiOutlineArrowRight,
// } from 'react-icons/ai';

export default function Betongmosaik({ subgallery }) {
  const [imgSlider, setimgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function imgDisplay(index) {
    setCurrentIndex(index);
    setimgSlider(true);
  }

  function nextImg() {
    const nextIndex = currentIndex + 1;
    const maxIndex = subgallery.length - 1;
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
    const maxIndex = subgallery.length - 1;

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

  let galleryImageDisplay = subgallery.map((image, index) => {
    if (image.type_of === 'betongmosaik') {
      return (
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
      <div className={subgalleryStyles.gallery}>
        {' '}
        <div
          className={
            imgSlider
              ? lightboxStyles.lightboxOpen
              : lightboxStyles.lightboxClose
          }
        >
          <button
            className={lightboxStyles.closeBtn}
            onClick={() => setimgSlider(false)}
          >
            X
          </button>
          <img src={maingallery[currentIndex].picture} />
          <button className={lightboxStyles.leftBtn} onClick={() => prevImg()}>
            left
          </button>

          <button className={lightboxStyles.rightBtn} onClick={() => nextImg()}>
            right
          </button>
        </div>
        <div className={subgalleryStyles.grid}>{galleryImageDisplay}</div>
      </div>
    </betongmosaik>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const subgallery = await db.all('select * from subgallery');
  return { props: { subgallery } };
};
