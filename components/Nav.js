import { useState } from 'react';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();

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

  if (router.pathname === '/') {
    navbarTypeDisplay = (
      <div
        className={
          navbar ? navStyles.navContainer : navStyles.navContainerHidden
        }
      >
        <div className={navStyles.left}>
          <Link href="/">Charlotte Hillborg</Link>
        </div>
        <div className={navStyles.right}>
          <Link href="/tavlor">Tavlor</Link>
          <Link href="/betongmosaik">Betong & Mosaik</Link>
          <a onClick={() => onMenuClick('about')}>About</a>
          <a onClick={() => onMenuClick('about')}>Contact</a>
        </div>
      </div>
    );
  } else if (router.pathname === '/admin') {
    console.log('This is admin');
  } else if (
    router.pathname === '/tavlor' ||
    router.pathname === '/betongmosaik'
  ) {
    navbarTypeDisplay = (
      <div className={navStyles.navContainer}>
        <div className={navStyles.left}>
          <Link href="/">Charlotte Hillborg</Link>
        </div>
        <div className={navStyles.right}>
          <Link href="/tavlor">Tavlor</Link>
          <Link href="/betongmosaik">Betong & Mosaik</Link>
          <a onClick={() => onMenuClick('about')}>About</a>
          <a onClick={() => onMenuClick('about')}>Contact</a>
        </div>
      </div>
    );
  }

  return <nav className={navStyles.nav}>{navbarTypeDisplay} </nav>;
};

export default Nav;
