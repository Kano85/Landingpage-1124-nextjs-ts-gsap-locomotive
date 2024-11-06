// app/page.js
'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import useLocoScroll from '../hooks/useLocoScroll'; // Import the custom hook

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Locomotive Scroll after loading is complete
  useLocoScroll(!isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <main className={styles.main} data-scroll-container>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {/* Render the content only after loading is complete */}
      {!isLoading && (
        <>
          <Landing />
          <Description />
          <Projects />
          <SlidingImages />
          <Contact />
        </>
      )}
    </main>
  );
}
