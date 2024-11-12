//src/components/Landing/index.jsx

'use client';

import Image from 'next/image';
import styles from './style.module.scss';
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-500px',
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.08 * direction;
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
    >
      {isMobile ? (
        <Image src="/images/smolnit.jpg" fill={true} alt="background" />
      ) : (
        <Image src="/images/nit.jpg" fill={true} alt="background" />
      )}
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Harold Cano Harold Cano</p>
          <p ref={secondText}>Harold Cano Harold Cano</p>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed={0.1}
        className={styles.description}
      ></div>
    </motion.main>
  );
}
