import galleryStyles from '../styles/Gallery.module.css';
import lightboxStyles from '../styles/Lightbox.module.css';
import { useState, useEffect } from 'react';
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import Coloor from 'coloor';

const MainGallery = ({ maingallery }) => {
  const [imgSlider, setimgSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function Coloor() {
    let d = document;
    let ce = 'createElement';
    let ga = 'getAttribute';
    function isCanvasSupported() {
      let elem = d[ce]('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
    function preload(image) {
      let src, pi, li, w, h, size;
      if (!isCanvasSupported()) {
        image.src = src;
        return;
      }
      src = image[ga]('data-coloor');
      size = image[ga]('data-coloor-size').split('x');
      w = parseInt(size[0]);
      h = parseInt(size[1]);
      pi = new Image();
      li = new Image();
      pi.onload = function () {
        let canvas = d[ce]('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(pi, 0, 0, w, h);
        image.src = canvas.toDataURL('image/png');
      };
      pi.src = image[ga]('src');
      li.onload = function () {
        image.src = src;
      };
      li.src = src;
    }
    var images = d.querySelectorAll('img[data-coloor]');
    for (var i = 0; i < images.length; i++) {
      preload(images[i]);
    }
  }
  Coloor();

  function imgDisplay(index) {
    setCurrentIndex(index);
    setimgSlider(true);
  }

  if (imgSlider === true) {
    if (typeof window !== 'undefined') {
      window.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
          prevImg(e);
        } else if (e.keyCode === 39) {
          nextImg(e);
        }
      });
    }
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

  return (
    <div className={galleryStyles.gallery}>
      <div
        className={
          imgSlider === true
            ? lightboxStyles.lightboxOpen
            : lightboxStyles.lightboxClose
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
                src={item.picture}
                style={{ width: '100%' }}
                onClick={() => imgDisplay(index)}
                data-coloor="../photos/img.jpg"
                data-coloor-size="640x480"
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
