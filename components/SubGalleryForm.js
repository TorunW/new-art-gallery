import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { server } from '../config/server';
import FormStyles from '../styles/Form.module.css';

const SubGalleryForm = props => {
  const subgallery = props.subgallery;
  const [title, setTitle] = useState(subgallery ? subgallery.title : '');
  const [price, setPrice] = useState(subgallery ? subgallery.price : '');
  const [picture, setPicture] = useState({});
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

  const onSubmit = async () => {
    const body = new FormData();
    body.append('file', picture);
    const fileUploadResponse = await fetch('/api/file', {
      method: 'POST',
      body,
    });
    const fileRes = await fileUploadResponse.json();
    console.log(fileRes, 'res, image uploaded to server');

    let newPicture = {
      picture: fileRes.pathname,
      title,
      price,
      size,
      type_of: type,
    };

    let url = `${server}/api/subgallerys`,
      method = 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPicture),
    });
    const res = await response.json();
    console.log(res, 'response database');
    props.onSubmit(res);
    setUpdate(true);
  };

  return (
    <subgalleryform className={FormStyles.form}>
      <h2 className={FormStyles.h2}>Lägg till bild i album:</h2>
      <div className={FormStyles.container}>
        <div className={FormStyles.topContainer}>
          <ImageUploader
            className={FormStyles.imageUploader}
            image={picture}
            onSetImage={setPicture}
            type={'add'}
          />
        </div>
        <div className={FormStyles.inputContainer}>
          <div className={FormStyles.formRow}>
            <div className={FormStyles.title}>namn</div>
            <input
              className={FormStyles.input}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className={FormStyles.formRow}>
            <div className={FormStyles.title}>pris</div>
            <input
              className={FormStyles.input}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className={FormStyles.formRow}>
            <div className={FormStyles.title}>storlek</div>
            <input
              className={FormStyles.input}
              value={size}
              onChange={e => setSize(e.target.value)}
            />
          </div>
          <div className={FormStyles.formRow}>
            <div className={FormStyles.title}>Kategori</div>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option>Välj album</option>
              <option value="tavlor">Tavlor</option>
              <option value="betongmosaik">Betong & Mosaik</option>
            </select>
          </div>
        </div>
        <div className={FormStyles.buttonContainer}>
          <a onClick={onSubmit}>{'Lägg till'}</a>
        </div>
      </div>
    </subgalleryform>
  );
};

export default SubGalleryForm;
