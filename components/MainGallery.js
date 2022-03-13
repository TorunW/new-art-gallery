import galleryStyles from '../styles/Gallery.module.css';
import Lightbox from './Lightbox';
import { useState } from 'react';

const MainGallery = ({ maingallery }) => {
  // const [clickedImg, setClickedImg] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(null);
  // console.log(currentIndex, 'click');
  // const handleClick = (item, index) => {
  //   setCurrentIndex(index);
  //   setClickedImg(item.picture);
  // };

  // const handelRightClick = () => {
  //   const totalLength = maingallery.length;

  //   if (currentIndex + 1 >= totalLength) {
  //     setCurrentIndex(0);
  //     const newUrl = maingallery[0].link;
  //     setClickedImg(newUrl);
  //     return;
  //   }
  //   const newIndex = currentIndex + 1;
  //   const newUrl = maingallery.filter(item => {
  //     return maingallery.indexOf(item) === newIndex;
  //   });
  //   const newItem = newUrl[0].link;
  //   setClickedImg(newItem);
  //   setCurrentIndex(newIndex);
  // };

  // console.log(maingallery.indexOf(maingallery.picture));

  // const handelLeftClick = () => {
  //   const totalLength = maingallery.length;
  //   if (currentIndex === 0) {
  //     setCurrentIndex(totalLength - 1);
  //     const newUrl = maingallery[totalLength - 1].link;
  //     setClickedImg(newUrl);
  //     return;
  //   }
  //   const newIndex = currentIndex - 1;
  //   const newUrl = maingallery.filter(item => {
  //     return maingallery.indexOf(item) === newIndex;
  //   });
  //   const newItem = newUrl[0].link;
  //   setClickedImg(newItem);
  //   setCurrentIndex(newIndex);
  // };

  return (
    <div className={galleryStyles.gallery}>
      <div className={galleryStyles.grid}>
        {maingallery.map((item, index) => {
          return (
            <div className={galleryStyles.wrapper} key={index}>
              <img
                src={item.picture}
                style={{ width: '100%' }}
                // onClick={() => handleClick(item, index)}
              />
            </div>
          );
        })}
        {/* {clickedImg && (
          <Lightbox
            clickedImg={clickedImg}
            handelRightClick={handelRightClick}
            setClickedImg={setClickedImg}
            handelLeftClick={handelLeftClick}
          />
        )} */}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const db = await importDb();
  const maingallery = await db.all('select * from maingallery');
  return { props: { maingallery } };
};

export default MainGallery;
