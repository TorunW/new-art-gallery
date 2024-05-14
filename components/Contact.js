import styles from '../styles/About.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Contact = (props, about, contact) => {
  const [fullname, setFullname] = useState('');
  const [fullnameError, setFullnameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [msg, setMsg] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (messageSent === true) {
      setTimeout(() => {
        setMessageSent(false);
        router.reload();
      }, 5000);
    }
  }, [messageSent]);

  function onSubmit() {
    if (formValidation()) {
      let newMessage = {
        fullname,
        email,
        msg,
      };
      props.onSubmit(newMessage);
      setMessageSent(true);
    }
  }

  function formValidation() {
    let isValidated = true;
    if (fullname.length < 1) {
      setFullnameError(true);
      isValidated = false;
    } else {
      setFullnameError(false);
    }

    const patternEmail =
      /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
    const isValidEmail = patternEmail.test(email);
    if (!isValidEmail) {
      setEmailError(true);
      isValidated = false;
    } else {
      setEmailError(false);
    }

    if (msg.length < 1) {
      setMessageError(true);
      isValidated = false;
    } else {
      setMessageError(false);
    }

    return isValidated;
  }

  let fullnameErrorDisplay;
  if (fullnameError === true) {
    fullnameErrorDisplay = (
      <p className={styles.error}>Namn måste vara ifyllt</p>
    );
  }

  let emailErrorDisplay;
  if (emailError === true) {
    emailErrorDisplay = (
      <p className={styles.error}>E-postadressen är inte giltig</p>
    );
  }

  let messageErrorDisplay;
  if (messageError === true) {
    messageErrorDisplay = (
      <p className={styles.error}>Meddelande kan inte vara tomt</p>
    );
  }

  let displaySuccessMessage;
  if (messageSent === true) {
    displaySuccessMessage = (
      <div>
        <p className={styles.success}>
          Tack för ditt meddelande, jag återkommer med svar så snart som
          möjligt.
        </p>
      </div>
    );
  }

  let aboutDisplay = props.about.map((about, index) => {
    return (
      <div key={index}>
        <h2> {about.title} </h2>
        <div dangerouslySetInnerHTML={{ __html: about.about_text }}></div>
      </div>
    );
  });

  return (
    <contact id="about" className={styles.about}>
      <div className={styles.bgContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.aboutContainer}>{aboutDisplay}</div>
          <div className={styles.formContainer}>
            <form>
              <h2>Kontakt</h2>
              <div>
                <input
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  type="text"
                  placeholder="Namn"
                />
                {fullnameErrorDisplay}
              </div>

              <div>
                <input
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {emailErrorDisplay}
              </div>

              <div>
                <textarea
                  type="text"
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Meddelande"
                ></textarea>
                {messageErrorDisplay}
              </div>

              <div className={styles.submit}>
                <a className={styles.btn} onClick={onSubmit}>
                  Skicka meddelande
                </a>
                {displaySuccessMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </contact>
  );
};

export default Contact;
