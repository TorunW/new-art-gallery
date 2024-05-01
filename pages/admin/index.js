import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import styles from '../../styles/adminStyles/Admin.module.css';
import SubGalleryForm from '../../components/SubGalleryForm';
import { app } from '../../firebaseConfig';
import { useRouter } from 'next/router';

export default function Admin({ initSubGallery, initAbout }) {
  const [subgallery, setSubgallery] = useState(initSubGallery);
  const [about, setAbout] = useState(initAbout);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setUpdate(false);
        window.location.reload();
        setIsLoading(false);
      }, 3000);
    }
  }, [update]);

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    // push back to login if token doesnt exist, this should be in the admin index
    if (!token) {
      // should push to admin in real life project
      router.push('/login');
    }
  }, []);

  async function onAddNewSubGalleryPicture(newSubPicture) {}

  async function onDeleteSubGalleryPicture(id) {
    setIsLoading(true);
    await fetch(`${server}/api/subgallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUpdate(true);
  }

  let tavlorDisplay = subgallery.map((item, index) => {
    if (item.type_of === 'tavlor') {
      return (
        <div key={index} item={item} className={styles.itemContainer}>
          <p>{item.title}</p>
          <img loading="lazy" src={item.picture} />
          <p>{item.price}</p>
          <p>{item.size}</p>
          <div>
            <a onClick={() => onDeleteSubGalleryPicture(item.id)}>Ta bort</a>
            <a href={`admin/subgallery/${item.id}`}>Ändra</a>
          </div>
        </div>
      );
    }
  });

  let betongmosaikDisplay = subgallery.map((item, index) => {
    if (item.type_of === 'betongmosaik') {
      return (
        <div key={index} item={item} className={styles.itemContainer}>
          <p>{item.title}</p>
          <img loading="lazy" src={item.picture} />
          <p>{item.price}</p>
          <p>{item.size}</p>
          <div>
            <a onClick={() => onDeleteSubGalleryPicture(item.id)}>Ta bort</a>
            <a href={`admin/subgallery/${item.id}`}>Ändra</a>
          </div>
        </div>
      );
    }
  });

  return (
    <admin>
      <div
        className={isLoading === true ? styles.overlay : styles.overlayHidden}
      >
        <div className={styles.loader}></div>
      </div>
      <div className={styles.admin}>
        <div className={styles.sectionContainer}>
          <div className={styles.firstRow}>
            <SubGalleryForm onSubmit={onAddNewSubGalleryPicture} />
          </div>

          <div className={styles.thirdRow}>
            <h2>tavlor</h2>
            <div className={styles.gallery}>{tavlorDisplay}</div>
          </div>
          <div className={styles.fourthRow}>
            <h2>Mosaik & Betong</h2>
            <div className={styles.gallery}>{betongmosaikDisplay}</div>
          </div>

          <div className={styles.fifthRow}>
            <h3>Om mig</h3>
            {about.map((about, index) => (
              <div
                className={styles.aboutSection}
                key={index}
                aboutinfo={about}
              >
                <p className={styles.title}>{about.title}</p>
                <p>{about.info_text}</p>
                <div className={styles.buttonContainer}>
                  <a className={styles.button} href={`admin/about/${about.id}`}>
                    Edit About
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </admin>
  );
}

export const getStaticProps = async () => {
  const db = await importDb();
  const maingallery = await db.all('select * from maingallery');
  const subgallery = await db.all('select * from subgallery');
  const about = await db.all('select * from about');

  return {
    props: {
      initMainGallery: maingallery,
      initSubGallery: subgallery,
      initAbout: about,
    },
  };
};
