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
import { useGSAP } from '@gsap/react';

// Remove the duplicate import and invalid useEffect call
// import { useEffect } from 'react';

// Move useEffect inside the component

export default function Header() {
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  // Register ScrollTrigger plugin inside useEffect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Close the navigation menu when the pathname changes
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname, isActive]);

  const { contextSafe } = useGSAP({ scope: headerRef });

  // Initialize GSAP animations using the useGSAP hook
  useGSAP(
    (context, contextSafe) => {
      const handleLeave = contextSafe(() => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.25,
          ease: 'power1.out',
        });
      });

      const handleEnterBack = contextSafe(() => {
        gsap.to(buttonRef.current, {
          scale: 0,
          duration: 0.25,
          ease: 'power1.out',
        });
        setIsActive(false);
      });

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
    },
    { scope: headerRef }
  );

  // Toggle function for the navigation menu
  const toggleNav = contextSafe(() => {
    setIsActive((prev) => !prev);
  });

  return (
    <>
      <div ref={headerRef} className={styles.header}>
        {/* Your header content goes here */}
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
