import Image from 'next/image';
import React from 'react';
import ThumbnailMosaic from '../public/uploads/ThumbnailMosaic.png';
import ThumbnailTavlor from '../public/uploads/ThumbnailTavlor.png';
import styles from '../styles/Card.module.css';

import Link from 'next/link';

const Card = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <span className={styles.banner} />
        <div className={styles.content}>
          <Image
            src={ThumbnailTavlor}
            objectFit="fill"
            fill={true}
            loading="lazy"
            alt="Picture of the author"
          />
          <Link href={'/tavlor'}>
            <h2>Klicka här för att se mina tavlor</h2>
          </Link>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <span className={styles.bannerBottom} />
        <div className={styles.content}>
          <Image
            src={ThumbnailMosaic}
            objectFit="fill"
            fill={true}
            loading="lazy"
            alt="Picture of the author"
          />
          <Link href={'/tavlor'}>
            <h2>Klicka här för att se min mosaik</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
