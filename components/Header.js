import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <div className={headerStyles.leftContainer}>
          <span className={headerStyles.circleTwoOuter}>
            <span className={headerStyles.circleTwoInner}></span>
          </span>
          <span className={headerStyles.circleThreeOuter}>
            <span className={headerStyles.circleThreeInner}></span>
          </span>
        </div>
        <div className={headerStyles.rightContainer}>
          <span className={headerStyles.circleOneOuter}>
            <span className={headerStyles.circleOneMiddle}>
              {' '}
              <span className={headerStyles.circleOneInner}></span>
            </span>{' '}
          </span>
          <div className={headerStyles.textContainer}>
            <span>
              <h1>Charlotte Hillborg</h1>
              <h2>Upptäck min konstnärliga värld</h2>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
