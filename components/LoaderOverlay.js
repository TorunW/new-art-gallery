import React from 'react';
import styles from '../styles/adminStyles/Admin.module.css';

export default function LoaderOverlay({ isLoading }) {
  return (
    <div className={isLoading === true ? styles.overlay : styles.overlayHidden}>
      <div className={styles.loader}></div>
    </div>
  );
}
