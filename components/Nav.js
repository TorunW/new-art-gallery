import { useEffect, useState } from 'react';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  let lastKnownScrollPosition = 0;
  let ticking = false;
  console.log(ticking, 'ticking');
  console.log(lastKnownScrollPosition);

  useEffect(() => {
    function doSomething(scrollPos) {
      console.log(scrollPos, 'scrollpos');
    }
    document.addEventListener('scroll', function (e) {
      lastKnownScrollPosition = window.scrollY;

      console.log(lastKnownScrollPosition, 'lastknow');
      console.log(e, 'e');

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(lastKnownScrollPosition);
          ticking = false;

          console.log(ticking, lastKnownScrollPosition);
        });
        ticking = true;
        console.log(ticking, lastKnownScrollPosition);
      }
    });
  }, []);

  // const updatePosition = e => {
  //   setScrollPosition(window.lastKnownScrollPosition);
  //   console.log(e);
  // };

  // function navbarDisplay() {
  //   console.log(window.scrollY >= 80 ? 'they see me scrollin' : 'bascls');
  // }

  // if (typeof window !== 'undefined') {
  //   window.addEventListener('scroll', navbarDisplay);
  // }

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

  // let navbarTypeDisplay;

  // if (router.pathname === '/') {
  //   navbarTypeDisplay = (
  //     <div
  //       className={
  //         navbar ? navStyles.navContainer : navStyles.navContainerHidden
  //       }
  //     >
  //       <div
  //         className={navStyles.left}
  //         style={
  //           router.pathname === '/'
  //             ? { fontWeight: '600', opacity: '1' }
  //             : { fontWeight: '100' }
  //         }
  //       >
  //         <Link href="/">Charlotte Hillborg</Link>
  //       </div>
  //       <div className={navStyles.right}>
  //         <Link href="/tavlor">Tavlor</Link>
  //         <Link href="/betongmosaik">Betong & Mosaik</Link>
  //         <a onClick={() => onMenuClick('about')}>Om mig</a>
  //         <a onClick={() => onMenuClick('about')}>Kontakt</a>
  //       </div>
  //     </div>
  //   );
  // } else if (router.pathname === '/admin') {
  //   console.log('This is admin');
  // } else if (
  //   router.pathname === '/tavlor' ||
  //   router.pathname === '/betongmosaik'
  // ) {
  //   navbarTypeDisplay = (
  //     <div className={navStyles.navContainer}>
  //       <div className={navStyles.left}>
  //         <Link href="/">Charlotte Hillborg</Link>
  //       </div>
  //       <div className={navStyles.right}>
  //         <Link href="/tavlor">Tavlor</Link>
  //         <Link href="/betongmosaik">Betong & Mosaik</Link>
  //         <a onClick={() => onMenuClick('about')}>About</a>
  //         <a onClick={() => onMenuClick('about')}>Contact</a>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <nav className={navStyles.nav}>
      <div
        className={
          navbar ? navStyles.navContainer : navStyles.navContainerHidden
        }
      >
        <div
          className={navStyles.left}
          style={
            router.pathname === '/'
              ? { fontWeight: '600', opacity: '1' }
              : { fontWeight: '100' }
          }
        >
          <Link href="/">Charlotte Hillborg</Link>
        </div>
        <div className={navStyles.right}>
          <Link href="/tavlor">Tavlor</Link>
          <Link href="/betongmosaik">Betong & Mosaik</Link>
          <a onClick={() => onMenuClick('about')}>Om mig</a>
          <a onClick={() => onMenuClick('about')}>Kontakt</a>
        </div>
      </div>{' '}
    </nav>
  );
};

export default Nav;
