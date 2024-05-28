import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { server } from '../config/server';
import styles from '../styles/adminStyles/Form.module.css';
import Image from 'next/image';
import LoaderOverlay from './LoaderOverlay';
import Link from 'next/link';

const ImageUploadForm = props => {
  const subgallery = props.subgallery;
  const [title, setTitle] = useState(subgallery ? subgallery.title : '');
  const [price, setPrice] = useState(subgallery ? subgallery.price : '');
  const [picture, setPicture] = useState({});
  const [size, setSize] = useState(subgallery ? subgallery.size : '');
  const [type, setType] = useState(subgallery ? subgallery.type_of : '');
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setIsloading(false);
        setUpdate(false);
        window.location.reload();
      }, 1000);
    }
  }, [update]);

  const onSubmit = async () => {
    setIsloading(true);
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

  const onUpdate = async () => {
    setIsloading(true);
    let newPicture = {
      picture: props.subgallery.picture,
      title,
      price,
      size,
      type_of: type,
    };

    let url = `${server}/api/subgallery/${subgallery.id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPicture),
    });
    const res = await response.json();
    props.onSubmit(res);
    setUpdate(true);
  };

  return (
    <imageuploadform className={styles.form}>
      <LoaderOverlay isLoading={isLoading} />
      <h4>Lägg till bild i album:</h4>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          {props.type !== 'edit' ? (
            <ImageUploader
              className={styles.imageUploader}
              image={picture}
              onSetImage={setPicture}
            />
          ) : (
            <Image
              src={`/${props.subgallery.picture}`}
              width={300}
              height={400}
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.formRow}>
            <p className={styles.title}>namn</p>
            <input
              className={styles.input}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <p className={styles.title}>pris</p>
            <input
              className={styles.input}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <p className={styles.title}>storlek</p>
            <input
              className={styles.input}
              value={size}
              onChange={e => setSize(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <p className={styles.title}>Kategori</p>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option>Välj album</option>
              <option value="tavlor">Tavlor</option>
              <option value="betongmosaik">Betong & Mosaik</option>
            </select>
          </div>
          <div className={styles.buttonContainer}>
            {props.type !== 'edit' ? (
              <a onClick={onSubmit}>{'Lägg till'}</a>
            ) : (
              <>
                <a href="/admin">{'Tillbaka till Admin'}</a>
                <a onClick={onUpdate}>{'Uppdatera'}</a>
              </>
            )}
          </div>
        </div>
      </div>
    </imageuploadform>
  );
};

export default ImageUploadForm;
