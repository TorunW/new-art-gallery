import { useEffect, useState } from 'react';
import { server } from '../config/server';
import FormStyles from '../styles/Form.module.css';

export default function ImageUploader(props) {
  const [image, setImage] = useState(props.image);
  const [createObjectURL, setCreatedObjectURL] = useState(null);

  console.log(props.image);

  useEffect(() => {
    if (props.isSubmitted === true && props.type !== 'edit') {
      uploadToServer();
    }
  }, [props.isSubmitted]);

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
    setImage(res.pathname);
    props.onSetImage(res.pathname);
  };

  let imageDisplay;
  if (createObjectURL !== null) {
    imageDisplay = (
      <img
        className={FormStyles.img}
        src={createObjectURL !== null ? createObjectURL : server + '/' + image}
      />
    );
  } else {
    imageDisplay = <h4>Select Image</h4>;
  }
  return (
    <imageuploader>
      <div className={FormStyles.imageUploader}>
        {imageDisplay}

        <input type="file" name="myImage" onChange={uploadToClient} />
      </div>
      {/* <div className={FormStyles.buttonContainer}>
        <a type='submit' onClick={uploadToServer}>
          Upload image
        </a>
      </div> */}
    </imageuploader>
  );
}
