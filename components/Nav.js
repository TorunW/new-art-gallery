import { useState } from 'react';
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

  function logout() {
    sessionStorage.removeItem('Token');
    router.push('/');
  }

  function goToInbox() {
    router.push('/admin/inbox');
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
        <Link href="/tavlor">Tavlor</Link>
        <Link href="/betongmosaik">Betong & Mosaik</Link>
        <a onClick={() => onMenuClick('about')}>Om mig</a>
        <a onClick={() => onMenuClick('about')}>Kontakt</a>
      </div>
    );
  } else if (router.pathname === '/admin') {
    navbarTypeDisplay = (
      <div className={navStyles.navbarAdmin}>
        <div className={navStyles.left}>Admin</div>
        <div className={navStyles.inbox}>
          <svg
            onClick={goToInbox}
            className={navStyles.icon}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 370"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
          </svg>
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
