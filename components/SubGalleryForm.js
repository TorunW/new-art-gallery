import { useState, useEffect } from 'react/cjs/react.development';
import { getServerSideProps } from '../pages/admin';
import ImageUploader from './ImageUploader';
import { server } from '../config/server';
import FormStyles from '../styles/Form.module.css';

const SubGalleryForm = (props) => {
  const subgallery = props.subgallery;
  const [title, setTitle] = useState(subgallery ? subgallery.title : '');
  const [price, setPrice] = useState(subgallery ? subgallery.price : '');
  const [picture, setPicture] = useState(subgallery ? subgallery.picture : '');
  const [size, setSize] = useState(subgallery ? subgallery.size : '');
  const [type, setType] = useState(subgallery ? subgallery.type_of : '');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setUpdate(false);
        window.location.reload();
      }, 1000);
    }
  }, [update]);

  async function onSubmit() {
    let newSubPicture = {
      title,
      price,
      picture,
      size,
      type_of: type,
    };

    let url = `${server}/api/subgallerys`,
      method = 'POST';
    if (props.type === 'edit') {
      url = `${server}/api/subgallery/${subgallery.id}`;
      method = 'PUT';
    }
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSubPicture),
    });
    const res = await response.json();

    props.onSubmit(res);
    setUpdate(true);
  }

  return (
    <subgalleryform className={FormStyles.form}>
      <h2 className={FormStyles.h2}>Lägg till bild i album:</h2>
      <div className={FormStyles.container}>
        <ImageUploader
          className={FormStyles.imageUploader}
          image={picture}
          onSetImage={setPicture}
        />
        <div className={FormStyles.inputContainer}>
          <div className={FormStyles.title}>namn</div>
          <input
            className={FormStyles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={FormStyles.title}>pris</div>
          <input
            className={FormStyles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className={FormStyles.title}>storlek</div>
          <input
            className={FormStyles.input}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <div className={FormStyles.title}>Kategori</div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Välj album</option>
            <option value='tavlor'>Tavlor</option>
            <option value='skulpturer'>Skulpturer</option>
          </select>
        </div>
        <div className={FormStyles.buttonContainer}>
          <a className={FormStyles.button} onClick={onSubmit}>
            {props.type === 'edit' ? 'Uppdatera' : 'Lägg till'}
          </a>
          {props.type === 'edit' ? (
            <a className={FormStyles.button} href='/admin'>
              Tillbaka till admin
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    </subgalleryform>
  );
};

export default SubGalleryForm;
