// src/components/SlidingImages/index.jsx

'use client'; // Ensure this is the first line to mark the component as a Client Component

import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

import { gsap } from 'gsap'; // Import GSAP
import useGSAP from '../../hooks/useLocoScroll';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Import ScrollTrigger plugin

import { slideUp } from './animation'; // Import slideUp variant

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Initialize GSAP animations using the useGSAP hook
  useGSAP(
    () => {
      // Example GSAP animation: Fade in projects on scroll
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

      // Animation loop using requestAnimationFrame (if needed)
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
    },
    [],
    containerRef.current
  ); // Pass containerRef.current as the scope

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
          style={{ x: x1 }}
          className={styles.slider}
          ref={slider1Ref}
        >
          {slider1.map((project, index) => (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={`Project ${index + 1}`}
                  src={`/images/${project.src}`}
                  priority={false} // Adjust based on your optimization strategy
                />
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          style={{ x: x2 }}
          className={styles.slider}
          ref={slider2Ref}
        >
          {slider2.map((project, index) => (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <Image
                  fill={true}
                  alt={`Project ${index + 1}`}
                  src={`/images/${project.src}`}
                  priority={false} // Adjust based on your optimization strategy
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
