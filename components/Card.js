import Image from 'next/image';
import React from 'react';
import ThumbnailMosaic from '../public/uploads/ThumbnailMosaic.png';
import ThumbnailTavlor from '../public/uploads/ThumbnailTavlor.png';
import cardStyles from '../styles/Card.module.css';

import Link from 'next/link';

const Card = () => {
  return (
    <div className={cardStyles.pageContainer}>
      <div className={cardStyles.topContainer}>
        <span className={cardStyles.banner} />
        <div className={cardStyles.content}>
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

      <div className={cardStyles.bottomContainer}>
        <span className={cardStyles.bannerBottom} />
        <div className={cardStyles.content}>
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
