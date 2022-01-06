 
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import About from '../components/About';
import { server } from '../config/server';
import { importDb } from '../config/db';
import { useState } from 'react';
import Link from 'next/link';
 
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
      <h1>Se alla mina verk</h1>
      <div className={styles.container}>
        <div>
          <div className={styles.previewT}>
            <img className={styles.firstImg} />
            <div className={styles.caption}>
              <h2>
                <br />
                <span> tavlor</span>
              </h2>
              <p>⟶</p> <Link href='/tavlor'></Link>
            </div>
          </div>
        </div>
        <div className={styles.previewM}>
          <img className={styles.secondImg} />
          <div className={styles.caption}>
            <h2>
              <br />
              <span>
                Betong <br /> &<br /> Mosaik
              </span>
            </h2>
            <p>⟶</p> <Link href='/betongmosaik'></Link>
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
