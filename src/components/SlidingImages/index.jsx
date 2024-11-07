// src/components/SlidingImages/index.jsx

'use client';

import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { slideUp } from './animation';

gsap.registerPlugin(ScrollTrigger);

const slider1 = [
  { color: '#e3e5e7', src: 'c2.jpg' },
  { color: '#d6d7dc', src: 'decimal.jpg' },
  { color: '#e3e3e3', src: 'funny.jpg' },
  { color: '#21242b', src: 'google.jpg' },
];

const slider2 = [
  { color: '#d4e3ec', src: 'maven.jpg' },
  { color: '#e5e0e1', src: 'panda.jpg' },
  { color: '#d7d4cf', src: 'powell.jpg' },
  { color: '#e1dad6', src: 'wix.jpg' },
];

export default function SlidingImages() {
  const containerRef = useRef(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize GSAP animations
      gsap.fromTo(
        '.project',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      let xPercent = 0;
      let direction = -1;

      const animate = () => {
        if (xPercent < -100) {
          xPercent = 0;
        } else if (xPercent > 0) {
          xPercent = -100;
        }
        gsap.set(slider1Ref.current, { xPercent: xPercent });
        gsap.set(slider2Ref.current, { xPercent: xPercent });
        xPercent += 0.1 * direction;
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.landing}
      ref={containerRef}
    >
      <Image src="/images/background.jpg" fill={true} alt="background" />
      <div className={styles.sliderContainer}>
        <motion.div
          // style={{ x: x1 }}
          className={styles.slider}
          ref={slider1Ref}
        >
          {slider1.map((project, index) => (
            <div
              key={index}
              className="project" // Use className="project" for GSAP selector
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={`Project ${index + 1}`}
                  src={`/images/${project.src}`}
                  priority={false}
                />
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          // style={{ x: x2 }}
          className={styles.slider}
          ref={slider2Ref}
        >
          {slider2.map((project, index) => (
            <div
              key={index}
              className="project" // Use className="project" for GSAP selector
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={`Project ${index + 1}`}
                  src={`/images/${project.src}`}
                  priority={false}
                />
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div style={{ height }} className={styles.circleContainer}>
          <div className={styles.circle}></div>
        </motion.div>
      </div>
    </motion.main>
  );
}
