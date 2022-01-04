import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { server } from '../config/server';
import FormStyles from '../styles/Form.module.css';
import Link from 'next/link';

const MainGalleryForm = (props) => {
  const maingallery = props.maingallery;
  const subgallery = props.subgallery;
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

  //  on submit <change a state var to true, pass that state var as a prop in teh img uplooadde, in the img uploaderthat runs on props state var,test.
  //  in the useffect run the uploadto server if its true, onsetimage in main gallery should be set to
  // useeffect for picture, if the submit is true call function on submit, statevar false in the end of onsubmit

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
          <a onClick={() => setIsSubmitted(true)}>
            {props.type === 'edit' ? 'Uppdatera' : 'Lägg till'}
          </a>
          {props.type === 'edit' ? (
            <Link href='/admin'>Tillbaka till admin</Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </maingalleryform>
  );
};

export default MainGalleryForm;
