import { useState } from 'react/cjs/react.development';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';

const Nav = () => {
  const [navbar, setNavbar] = useState(false);

  function navbarDisplay() {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', navbarDisplay);
  }

  function onMenuClick(divId) {
    let element = document.getElementById(divId);
    if (element !== null) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  let navbarTypeDisplay;
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/') {
      navbarTypeDisplay = (
        <div
          className={
            navbar ? navStyles.navContainer : navStyles.navContainerHidden
          }
        >
          <div className={navStyles.left}>
            <Link href='/'>Charlotte Hillborg</Link>
          </div>
          <div className={navStyles.right}>
            <Link href='/tavlor'>Tavlor</Link>
            <Link href='/betong&mosaik'>Betong & Mosaik</Link>
            <Link onClick={() => onMenuClick('about')}>About</Link>
            <Link onClick={() => onMenuClick('about')}>Contact</Link>
          </div>
        </div>
      );
    } else if (window.location.pathname === '/admin') {
      console.log('This is admin');
    } else if (
      window.location.pathname === '/tavlor' ||
      window.location.pathname === '/betong&mosaik'
    ) {
      navbarTypeDisplay = (
        <div
          className={
            navbar ? navStyles.navContainer : navStyles.navContainerHidden
          }
        >
          <div className={navStyles.left}>
            <Link href='/'>Charlotte Hillborg</Link>
          </div>
          <div className={navStyles.right}>
            <Link href='/tavlor'>Tavlor</Link>
            <Link href='/betong&mosaik'>Betong & Mosaik</Link>
            <Link onClick={() => onMenuClick('about')}>About</Link>
            <Link onClick={() => onMenuClick('about')}>Contact</Link>
          </div>
        </div>
      );
    }
  }

  return <nav className={navStyles.nav}>{navbarTypeDisplay} </nav>;
};

export default Nav;
