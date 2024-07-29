import Image from 'next/image';
import React from 'react';
import ThumbnailMosaic from '../public/uploads/ThumbnailMosaic.png';
import ThumbnailTavlor from '../public/uploads/ThumbnailTavlor.png';
import styles from '../styles/Card.module.css';

import Link from 'next/link';
import { ArrowRight } from './Icons';

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
            <div className={styles.link}>
              <h3>Se mina tavlor</h3>
              <ArrowRight />
            </div>
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
            <div className={styles.link}>
              <h3>Se min mosaik</h3>
              <ArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
