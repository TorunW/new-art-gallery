import { useState } from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  function handleScroll() {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 180) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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

  function logout() {
    sessionStorage.removeItem('Token');
    router.push('/');
  }

  let navbarTypeDisplay;
  if (router.pathname === '/') {
    navbarTypeDisplay = (
      <>
        <Link href="/tavlor">Tavlor</Link>
        <Link href="/betongmosaik">Betong & Mosaik</Link>
        <a onClick={() => onMenuClick('about')}>Om mig</a>
        <a onClick={() => onMenuClick('about')}>Kontakt</a>
      </>
    );
  } else if (router.pathname === '/admin') {
    navbarTypeDisplay = (
      <div className={styles.navbarAdmin}>
        <div>Admin</div>

        <button onClick={logout}>Logga ut</button>
      </div>
    );
  } else if (
    router.pathname === '/tavlor' ||
    router.pathname === '/betongmosaik'
  ) {
    navbarTypeDisplay = (
      <div className={styles.navContainer}>
        <div className={styles.left}>
          <Link href="/">Charlotte Hillborg</Link>
        </div>
        <div className={styles.right}>
          <Link href="/tavlor">Tavlor</Link>
          <Link href="/betongmosaik">Betong & Mosaik</Link>
          <a onClick={() => onMenuClick('about')}>Om mig</a>
          <a onClick={() => onMenuClick('about')}>Kontak</a>
        </div>
      </div>
    );
  }

  return (
    <nav
      className={
        route.pathname !== '/admin' && isScrolled === true
          ? styles.navbarScrolled
          : styles.navbar
      }
    >
      {navbarTypeDisplay}
    </nav>
  );
};

export default Nav;
