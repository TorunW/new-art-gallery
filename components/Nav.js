import { useEffect, useState } from 'react';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoMail } from 'react-icons/io5';

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

  const logout = () => {
    sessionStorage.removeItem('Token');
    router.push('/');
  };

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
      <div className={navStyles.navbar}>
        <div className={navStyles.left}>Admin</div>
        <div className={navStyles.inbox}>
          <a href="admin/inbox">
            <IoMail className={navStyles.icon} />
          </a>
          <button onClick={logout}>Logga ut</button>
        </div>
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
          <a onClick={() => onMenuClick('about')}>Om mig</a>
          <a onClick={() => onMenuClick('about')}>Kontak</a>
        </div>
      </div>
    );
  }

  return <nav className={navStyles.nav}>{navbarTypeDisplay}</nav>;
};

export default Nav;
