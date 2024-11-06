// src/components/Header/index.jsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import useGSAP from '../../hooks/useLocoScroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  // Close the navigation menu when the pathname changes
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  // Initialize GSAP animations using the useGSAP hook
  useGSAP(() => {
    const handleLeave = () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.25,
        ease: 'power1.out',
      });
    };

    const handleEnterBack = () => {
      gsap.to(buttonRef.current, {
        scale: 0,
        duration: 0.25,
        ease: 'power1.out',
      });
      setIsActive(false);
    };

    gsap.to(buttonRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '+=100%',
        scrub: 0.25,
        onLeave: handleLeave,
        onEnterBack: handleEnterBack,
      },
    });
  }, []);

  // Toggle function for the navigation menu
  const toggleNav = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <div ref={headerRef} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <div className={styles.name}>
            <p className={styles.codeBy}>Code by</p>
            <p className={styles.dennis}>Dennis</p>
            <p className={styles.snellenberg}>Snellenberg</p>
          </div>
        </div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <a href="#work">Work</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="#about">About</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="#contact">Contact</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </div>
      <div ref={buttonRef} className={styles.headerButtonContainer}>
        <Rounded onClick={toggleNav} className={styles.button}>
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
