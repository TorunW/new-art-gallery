import styles from '../styles/Header.module.css';
import { ArrowDown } from './Icons';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  function handleScroll() {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.leftContainer}>
          <span className={styles.circleTwoOuter}>
            <span className={styles.circleTwoMiddle}>
              <span className={styles.circleTwoInner}></span>
            </span>
          </span>
          <span className={styles.circleThreeOuter}>
            <span className={styles.circleThreeMiddle}>
              <span className={styles.circleThreeInner}></span>
            </span>
          </span>
        </div>
        <div className={styles.rightContainer}>
          <span className={styles.circleOneOuter}>
            <span className={styles.circleOneMiddle}>
              <span className={styles.circleOneInner}></span>
            </span>
          </span>
          <div className={styles.textContainer}>
            <span>
              <h2>Charlotte Hillborg</h2>
              <h3>Upptäck min konstnärliga värld</h3>
            </span>
          </div>
        </div>
      </div>
      {isScrolled === true ? '' : <ArrowDown />}
    </header>
  );
};
export default Header;
