import styles from '../styles/Header.module.css';
import { ArrowDown } from './Icons';

const Header = () => {
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
              <h1>Charlotte Hillborg</h1>
              <h2>Upptäck min konstnärliga värld</h2>
            </span>
          </div>
        </div>
      </div>
      <ArrowDown />
    </header>
  );
};
export default Header;
