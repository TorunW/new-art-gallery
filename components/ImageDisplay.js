import React from 'react';
import styles from '../styles/SecondGallery.module.css';

const ImageDisplay = ({ index, image, setCurrentIndex, setImgSlider }) => {
  function imgDisplay(index) {
    setCurrentIndex(index);
    setImgSlider(true);
  }

  return (
    <div key={index}>
      <figure className={styles.effect}>
        <img src={image.picture} onClick={() => imgDisplay(index)} />
        <figcaption>
          <h3>{image.title}</h3>
          <div className={styles.description}>
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
  );
};

export default ImageDisplay;
