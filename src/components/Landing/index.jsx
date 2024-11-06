// src/components/Landing/index.jsx

'use client';

import Image from 'next/image';
import styles from './style.module.scss';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useGSAP from '../../hooks/useLocoScroll';

import { slideUp } from './animation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing() {
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  let xPercent = 0;
  let direction = -1;

  // Initialize GSAP animations using the useGSAP hook
  useGSAP(() => {
    // ScrollTrigger animation for the slider
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 'top top',
        end: '+=100%',
        onUpdate: (self) => {
          direction = self.direction * -1;
        },
      },
      x: '-500px',
      ease: 'none',
    });

    // Animation loop using requestAnimationFrame
    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }
      gsap.set(firstTextRef.current, { xPercent: xPercent });
      gsap.set(secondTextRef.current, { xPercent: xPercent });
      xPercent += 0.1 * direction;
      requestAnimationFrame(animate);
    };

    animate();
  }, [direction]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
      ref={containerRef}
    >
      <Image src="/images/background.jpg" fill={true} alt="background" />
      <div className={styles.sliderContainer}>
        <div ref={sliderRef} className={styles.slider}>
          <p ref={firstTextRef}>Freelance Developer -</p>
          <p ref={secondTextRef}>Freelance Developer -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="white"
          />
        </svg>
        <p>Freelance</p>
        <p>Designer & Developer</p>
      </div>
    </motion.main>
  );
}
