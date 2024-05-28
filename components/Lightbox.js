import { AiOutlineClose } from 'react-icons/ai';
import styles from '../styles/Lightbox.module.css';
import { ArrowLeft, ArrowRight } from './Icons';
import Link from 'next/link';
import Image from 'next/image';

function Lightbox({
  filteredImages,
  currentIndex,
  setCurrentIndex,
  setImgSlider,
}) {
  function nextImg() {
    const nextIndex = currentIndex + 1;
    const maxIndex = filteredImages.length - 1;
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
    const maxIndex = filteredImages.length - 1;
    console.log('first');

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
    <div className={styles.lightbox}>
      <AiOutlineClose
        className={styles.closeBtn}
        onClick={() => setImgSlider(false)}
        alt="Close"
      />
      <div className={styles.galleryContent}>
        <button className={styles.leftBtn} onClick={() => prevImg()}>
          <ArrowLeft />
        </button>
        <button className={styles.rightBtn} onClick={() => nextImg()}>
          <ArrowRight />
        </button>

        <div className={styles.nonFocusedImages}>
          {currentIndex > 0 ? (
            <img
              className={styles.prevImg}
              src={filteredImages[currentIndex - 1].picture}
            />
          ) : (
            <div className={styles.placeholder}></div>
          )}
          {filteredImages[currentIndex + 1] !== undefined ? (
            <img
              className={styles.nextImg}
              src={filteredImages[currentIndex + 1].picture}
            />
          ) : (
            <div className={styles.placeholder}></div>
          )}
        </div>
        <div className={styles.focusedImage}>
          <div className={styles.currentImg}>
            <h2>{filteredImages[currentIndex].title}</h2>

            <img src={filteredImages[currentIndex].picture} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
