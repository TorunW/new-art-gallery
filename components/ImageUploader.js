import { useState } from 'react';
import { server } from '../config/server';
import styles from '../styles/ImageUploader.module.css';

export default function ImageUploader(props) {
  const [image, setImage] = useState(props.image);
  const [createObjectURL, setCreatedObjectURL] = useState(null);

  const uploadToClient = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreatedObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async event => {
    const body = new FormData();
    body.append('file', image);
    const response = await fetch('/api/file', {
      method: 'POST',
      body,
    });
    const res = await response.json();
    console.log(res, 'res');
    setImage(res.pathname);
    props.onSetImage(res.pathname);
  };

  let imageDisplay;
  if (props.type === 'edit') {
    imageDisplay = (
      <>
        <img
          className={styles.img}
          src={
            createObjectURL !== null ? createObjectURL : server + '/' + image
          }
        />
        <input
          className={styles.button}
          type="file"
          name="myImage"
          onChange={uploadToClient}
        />
        <button>Change Image</button>
      </>
    );
  } else if (createObjectURL === null) {
    imageDisplay = (
      <>
        <h4>Select Image</h4>
        <input
          className={styles.button}
          type="file"
          name="myImage"
          onChange={uploadToClient}
        />
      </>
    );
  } else {
    imageDisplay = (
      <>
        <img
          className={styles.img}
          src={
            createObjectURL !== null ? createObjectURL : server + '/' + image
          }
        />
        <input
          className={styles.button}
          type="file"
          name="myImage"
          onChange={uploadToClient}
        />
        <button>Change Image</button>
      </>
    );
  }
  return (
    <imageuploader className={styles.uploaderContainer}>
      <div className={styles.imageUploader}>{imageDisplay}</div>
      <button type="submit" onClick={uploadToServer}>
        Upload
      </button>
    </imageuploader>
  );
}
