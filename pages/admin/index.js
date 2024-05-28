import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import styles from '../../styles/adminStyles/Admin.module.css';
import ImageUploadForm from '../../components/ImageUploadForm';
import { app } from '../../firebaseConfig';
import { useRouter } from 'next/router';
import DeleteImage from '../../components/DeleteImage';
import LoaderOverlay from '../../components/LoaderOverlay';

export default function Admin({ initSubGallery, initAbout }) {
  const [subgallery, setSubgallery] = useState(initSubGallery);
  const [about, setAbout] = useState(initAbout);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [currentImageId, setCurrentImageId] = useState();
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
    if (!token) {
      router.push('/login');
    }
  }, []);

  async function onAddNewSubGalleryPicture({ id }) {
    await fetch(`${server}/api/subgallery/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const onDeleteImage = id => {
    setIsOverlayVisible(true);
    setCurrentImageId(id);
  };

  return (
    <admin>
      <LoaderOverlay isLoading={isLoading} />
      {isOverlayVisible === true ? (
        <DeleteImage
          id={currentImageId}
          setId={setCurrentImageId}
          isOverlayVisible={isOverlayVisible}
          setIsOverlayVisible={setIsOverlayVisible}
          setIsLoading={setIsLoading}
          setUpdate={setUpdate}
        />
      ) : (
        ''
      )}
      <div className={styles.admin}>
        <div className={styles.sectionContainer}>
          <div className={styles.firstRow}>
            <ImageUploadForm onSubmit={onAddNewSubGalleryPicture} />
          </div>

          <div className={styles.thirdRow}>
            <h3>Tavlor</h3>
            <div className={styles.gallery}>
              {subgallery.map((item, index) => {
                if (item.type_of === 'tavlor') {
                  return (
                    <div
                      key={index}
                      item={item}
                      className={styles.itemContainer}
                    >
                      <h4>{item.title}</h4>
                      <img loading="lazy" src={item.picture} />
                      <p>{item.price}</p>
                      <p>{item.size}</p>
                      <div className={styles.buttonContainer}>
                        <a onClick={() => onDeleteImage(item.id)}>Ta bort</a>
                        <a href={`admin/subgallery/${item.id}`}>Ändra</a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.fourthRow}>
            <h3>Mosaik & Betong</h3>
            <div className={styles.gallery}>
              {subgallery.map((item, index) => {
                if (item.type_of === 'betongmosaik') {
                  return (
                    <div
                      key={index}
                      item={item}
                      className={styles.itemContainer}
                    >
                      <h4>{item.title}</h4>
                      <img loading="lazy" src={item.picture} />
                      <p>{item.price}</p>
                      <p>{item.size}</p>
                      <div className={styles.buttonContainer}>
                        <a onClick={() => onDeleteImage(item.id)}>Ta bort</a>
                        <a href={`admin/subgallery/${item.id}`}>Ändra</a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className={styles.fifthRow}>
            <h3>Om mig</h3>
            {about.map((about, index) => (
              <div key={index} aboutinfo={about}>
                <div className={styles.aboutSection}>
                  <h4 className={styles.title}>{about.title}</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: about.about_text }}
                  ></div>
                </div>
                <div className={styles.buttonContainer}>
                  <a className={styles.button} href={`admin/about/${about.id}`}>
                    Ändra
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
