import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { server } from '../config/server';
import FormStyles from '../styles/Form.module.css';

const MainGalleryForm = props => {
  const maingallery = props.maingallery;
  const [picture, setPicture] = useState(
    maingallery ? maingallery.picture : ''
  );
  const [update, setUpdate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted === true) {
      onSubmit();
    }
  }, [picture]);

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setUpdate(false);
        window.location.reload();
      }, 1000);
    }
  }, [update]);

  async function onSubmit() {
    let newPicture = {
      picture,
    };

    let url = `${server}/api/maingallerys`,
      method = 'POST';
    if (props.type === 'edit') {
      url = `${server}/api/maingallery/${maingallery.id}`;
      method = 'PUT';
    }
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPicture),
    });
    const res = await response.json();
    props.onSubmit(res);
    setUpdate(true);
    setIsSubmitted(false);
  }

  return (
    <maingalleryform className={FormStyles.form}>
      <h2 className={FormStyles.h2}>Lägg till bild:</h2>
      <div className={FormStyles.container}>
        <ImageUploader
          className={FormStyles.imageUploader}
          image={picture}
          onSetImage={setPicture}
          isSubmitted={isSubmitted}
        />
        <div className={FormStyles.buttonContainer}>
          <a onClick={onSubmit}>
            {props.type === 'edit' ? 'Uppdatera' : 'Lägg till'}
          </a>
        </div>
      </div>
    </maingalleryform>
  );
};

export default MainGalleryForm;
