import { useState } from 'react';
import { server } from '../config/server';
import styles from '../styles/Form.module.css';

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
  if (createObjectURL !== null) {
    imageDisplay = (
      <img
        className={styles.img}
        src={createObjectURL !== null ? createObjectURL : server + '/' + image}
      />
    );
  } else {
    imageDisplay = (
      <h4>{props.type === 'edit' ? 'Change Image' : 'Select Image'}</h4>
    );
  }
  return (
    <imageuploader>
      <div className={styles.imageUploader}>
        {imageDisplay}
        <input
          className={styles.button}
          type="file"
          name="myImage"
          onChange={uploadToClient}
        />
      </div>
      <div className={styles.buttonContainer}>
        <a
          className={createObjectURL === null ? styles.btn : styles.uploadbtn}
          type="submit"
          onClick={uploadToServer}
        >
          {props.type === 'edit' ? 'Upload new image' : 'Upload image'}
        </a>
      </div>
    </imageuploader>
  );
}
