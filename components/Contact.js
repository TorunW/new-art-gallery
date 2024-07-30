import styles from '../styles/About.module.css';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = (props, about, contact) => {
  const [fullname, setFullname] = useState('');
  const [fullnameError, setFullnameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setMessageStatus('');
    }, 5000);
  }, [messageStatus]);

  const onSendEmail = isValidated => {
    if (isValidated === true) {
      const templateParams = {
        from_name: fullname,
        from_email: email,
        message,
      };

      setIsLoading(true);
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then(
          function (response) {
            console.log(response);
            setFullname('');
            setEmail('');
            setMessage('');
            setIsLoading(false);
            setMessageStatus(
              'Tack för ditt meddelande, jag återkommer så snart som möjligt!'
            );
          },
          function (error) {
            console.log(error);
            setIsLoading(false);
            setMessageStatus('Något gick fel, prova igen.');
          }
        );
    }
  };

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

    if (message.length < 1) {
      setMessageError(true);
      isValidated = false;
    } else {
      setMessageError(false);
    }

    onSendEmail(isValidated);
    return isValidated;
  }

  let aboutDisplay = props.about.map((about, index) => {
    return (
      <div key={index}>
        <h3> {about.title} </h3>
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
              <h3>Kontakt</h3>
              <div>
                <input
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  type="text"
                  placeholder="Namn"
                />
                {fullnameError ? (
                  <p className={styles.error}>Namn måste vara ifyllt</p>
                ) : null}
              </div>

              <div>
                <input
                  value={email}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {emailError === true ? (
                  <p className={styles.error}>E-postadressen är inte giltig</p>
                ) : null}
              </div>

              <div>
                <textarea
                  value={message}
                  type="text"
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Meddelande"
                ></textarea>
                {messageError === true ? (
                  <p className={styles.error}>Meddelande kan inte vara tomt</p>
                ) : null}
              </div>
              <div className={styles.submit}>
                {messageStatus.length <= 0 ? (
                  <a
                    className={
                      isLoading === false ? styles.btn : styles.btnLoading
                    }
                    onClick={formValidation}
                  >
                    {isLoading === false ? 'Skicka meddelande' : 'Skickar'}
                  </a>
                ) : (
                  <p>{messageStatus}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </contact>
  );
};

export default Contact;
