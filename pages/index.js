import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import About from '../components/About';
import { server } from '../config/server';
import { importDb } from '../config/db';
import { useState } from 'react';

export default function Home({ maingallery, about, contact, initMessages }) {
  const [messages, setMessages] = useState(initMessages);

  async function onSubmitNewMessage(newMessage) {
    const response = await fetch(`${server}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });
    const newMessages = await response.json();
    setMessages(newMessages);
  }

  return (
    <div className={styles.home}>
      {/* <Head>
        <Script
          src='https://kit.fontawesome.com/4eddce3a99.js'
          crossorigin='anonymous'
        ></script>
      </Head> */}
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'
        integrity='sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <Header />
      <Gallery maingallery={maingallery} />

      <div className={styles.container}>
        <div>
          <div className={styles.preview}>
            <img src='/uploads/thumbnail2.jpg' className={styles.firstImg} />
            <div className={styles.caption}>
              <h2>
                Se alla <br />
                <span> tavlor</span>
              </h2>
              <p>⟶</p> <a href='#'></a>
            </div>
          </div>
        </div>
        <div className={styles.preview}>
          <img src='/uploads/thumbnail1.jpg' className={styles.secondImg} />
          <div className={styles.caption}>
            <h2>
              Se alla
              <br />
              <span>
                Betong <br /> &<br /> Mosaik
              </span>
            </h2>
            <p>⟶</p>
          </div>
        </div>
      </div>

      <About about={about} contact={contact} onSubmit={onSubmitNewMessage} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const maingallery = await db.all('select * from maingallery');
  const about = await db.all('select * from about');
  const contact = await db.all('select * from contact');
  return { props: { maingallery, about, initMessages: contact } };
};
