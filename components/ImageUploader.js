import { useState } from 'react';
import { server } from '../config/server';
import styles from '../styles/adminStyles/ImageUploader.module.css';

export default function ImageUploader(props) {
  const [createObjectURL, setCreatedObjectURL] = useState(null);

  const uploadToClient = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      props.onSetImage(i);
      setCreatedObjectURL(URL.createObjectURL(i));
    }
  };

  return (
    <imageuploader className={styles.uploaderContainer}>
      <div className={styles.imageUploader}>
        {createObjectURL === null ? (
          <>
            <h4>Select Image</h4>
            <input
              className={styles.button}
              type="file"
              name="myImage"
              onChange={uploadToClient}
            />
          </>
        ) : (
          <>
            <img
              className={styles.img}
              src={
                createObjectURL !== null
                  ? createObjectURL
                  : server + '/' + props.image
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
        )}
      </div>
    </imageuploader>
  );
}
