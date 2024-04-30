import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <span className={headerStyles.circleOneOuter}>
          <span className={headerStyles.circleOneInner}></span>
        </span>
        <span className={headerStyles.circleTwoOuter}>
          <span className={headerStyles.circleTwoInner}></span>
        </span>
        <span className={headerStyles.circleThreeOuter}>
          <span className={headerStyles.circleThreeInner}></span>
        </span>
      </div>
    </header>
  );
};
export default Header;
