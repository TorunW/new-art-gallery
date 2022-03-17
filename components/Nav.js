import { useEffect, useState } from 'react';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();

  function handleScroll() {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 180) {
        setNavbar(true);
        console.log(window.scrollY);
      } else {
        setNavbar(false);
      }
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  function onMenuClick(divId) {
    let element = document.getElementById(divId);
    if (element !== null) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/#about';
      }
    }
  }

  let navbarTypeDisplay;
  if (router.pathname === '/') {
    navbarTypeDisplay = (
      <div
        className={
          navbar === true
            ? navStyles.navContainer
            : navStyles.navContainerHidden
        }
      >
        <div className={navStyles.left}>
          <Link href="/">Charlotte Hillborg</Link>
        </div>
        <div className={navStyles.right}>
          <Link href="/tavlor">Tavlor</Link>
          <Link href="/betongmosaik">Betong & Mosaik</Link>
          <a onClick={() => onMenuClick('about')}>Om mig</a>
          <a onClick={() => onMenuClick('about')}>Kontakt</a>
        </div>
      </div>
    );
  } else if (router.pathname === '/admin') {
    navbarTypeDisplay = (
      <div>
        <h2>Admin</h2>
        <a href="admin/inbox">Meddeladen</a>
      </div>
    );
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

  return <nav className={navStyles.nav}>{navbarTypeDisplay}</nav>;
};

export default Nav;
