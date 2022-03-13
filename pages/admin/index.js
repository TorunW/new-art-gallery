import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import AdminStyles from '../../styles/Admin.module.css';
import Head from 'next/head';
import MainGalleryForm from '../../components/MainGalleryForm';
import SubGalleryForm from '../../components/SubGalleryForm';

export default function Admin({ initMainGallerys, initSubGallerys, props }) {
  const [maingallerys, setMaingallerys] = useState(initMainGallerys);
  const [subgallerys, setSubgallerys] = useState(initSubGallerys);
  //   const [about, setAbout] = useState(initAbout);
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

  let tavlorDisplay = subgallerys.map((item, index) => {
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

  let betongmosaikDisplay = subgallerys.map((item, index) => {
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
        <div className={AdminStyles.sectionContainer}>
          <div className={AdminStyles.firstRow}>
            <SubGalleryForm onSubmit={onAddNewSubGalleryPicture} />
            <MainGalleryForm onSubmit={onAddNewMainGalleryPicture} />
          </div>

          <div className={AdminStyles.secondRow}>
            <h2>Bilder - Blandat</h2>
            <div className={AdminStyles.galleryContainer}>
              {maingallerys.map((maingallery, index) => (
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
          </div>
        </div>
      </div>
    </admin>
  );
}

export const getServerSideProps = async () => {
  const db = await importDb();
  const maingallerys = await db.all('select * from maingallery');
  const subgallerys = await db.all('select * from subgallery');
  //   const infos = await db.all('select * from about');

  return {
    props: { initMainGallerys: maingallerys, initSubGallerys: subgallerys },
  };
};

{
  /* <div>
          <h2>Admin Panel</h2>
          <a href='admin/inbox'>
            <i className='fas fa-envelope'></i>
            <div>Inbox</div>
          </a>
        </div> */
}
{
  /* {infos.map((aboutinfo, index) => (
          <div
            className={AdminStyles.aboutSection}
            key={index}
            aboutinfo={aboutinfo}
          >
            <p className={AdminStyles.title}>{aboutinfo.title}</p>
            <p>{aboutinfo.info_text}</p>
            <div className={AdminStyles.buttonContainer}>
              <a
                className={AdminStyles.button}
                href={`admin/about/${aboutinfo.id}`}
              >
                Edit About
              </a>
            </div>
          </div>
        ))} */
}
