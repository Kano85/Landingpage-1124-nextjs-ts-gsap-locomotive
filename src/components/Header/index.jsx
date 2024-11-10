// src/components/Header/index.jsx

'use client';

import styles from './style.module.scss';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  // Renamed component for clarity
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  // Handle pathname changes to deactivate the menu
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname, isActive]);

  // Use the useGSAP hook for GSAP animations
  useGSAP(() => {
    // Animate the button based on scroll position
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top', // More descriptive start
        end: 'bottom top', // More descriptive end
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out',
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out',
          });
          setIsActive(false); // Correctly call the state updater
        },
        // Optional: Add markers for debugging
        // markers: true,
      },
    });

    // Cleanup is handled automatically by useGSAP
  }, []); // Empty dependency array ensures this runs once

  return (
    <>
      <div ref={header} className={styles.header}>
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
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className={styles.button}
        >
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
