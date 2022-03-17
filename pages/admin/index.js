import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import AdminStyles from '../../styles/Admin.module.css';
import MainGalleryForm from '../../components/MainGalleryForm';
import SubGalleryForm from '../../components/SubGalleryForm';

export default function Admin({ initMainGallery, initSubGallery, initAbout }) {
  const [maingallery, setMaingallery] = useState(initMainGallery);
  const [subgallery, setSubgallery] = useState(initSubGallery);
  const [about, setAbout] = useState(initAbout);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setUpdate(false);
        window.location.reload();
      }, 3000);
    }
  }, [update]);

  async function onAddNewMainGalleryPicture(newPicture) {}

  async function onDeleteMainGalleryPicture(id) {
    await fetch(`${server}/api/maingallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUpdate(true);
  }

  async function onAddNewSubGalleryPicture(newSubPicture) {}

  async function onDeleteSubGalleryPicture(id) {
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
        <div key={index} item={item} className={AdminStyles.itemContainer}>
          <p>{item.title}</p>
          <img src={item.picture} />
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
        <div key={index} item={item} className={AdminStyles.itemContainer}>
          <p>{item.title}</p>
          <img src={item.picture} />
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
      <div className={AdminStyles.admin}>
        <a className={AdminStyles.navButton} href="admin/inbox">
          <div>Inbox</div>
        </a>
        <div className={AdminStyles.sectionContainer}>
          <div className={AdminStyles.firstRow}>
            <SubGalleryForm onSubmit={onAddNewSubGalleryPicture} />
            <MainGalleryForm onSubmit={onAddNewMainGalleryPicture} />
          </div>

          <div className={AdminStyles.secondRow}>
            <h2>Bilder - Blandat</h2>
            <div className={AdminStyles.galleryContainer}>
              {maingallery.map((maingallery, index) => (
                <div key={index} maingallery={maingallery}>
                  <img src={maingallery.picture} />
                  <div>
                    <a
                      onClick={() => onDeleteMainGalleryPicture(maingallery.id)}
                    >
                      Radera
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={AdminStyles.thirdRow}>
            <h2>tavlor</h2>
            <div className={AdminStyles.gallery}>{tavlorDisplay}</div>
          </div>
          <div className={AdminStyles.fourthRow}>
            <h2>Mosaik & Betong</h2>
            <div className={AdminStyles.gallery}>{betongmosaikDisplay}</div>
          </div>

          <div className={AdminStyles.fifthRow}>
            <h3>Om mig</h3>
            {about.map((about, index) => (
              <div
                className={AdminStyles.aboutSection}
                key={index}
                aboutinfo={about}
              >
                <p className={AdminStyles.title}>{about.title}</p>
                <p>{about.info_text}</p>
                <div className={AdminStyles.buttonContainer}>
                  <a
                    className={AdminStyles.button}
                    href={`admin/about/${about.id}`}
                  >
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

export const getServerSideProps = async () => {
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
