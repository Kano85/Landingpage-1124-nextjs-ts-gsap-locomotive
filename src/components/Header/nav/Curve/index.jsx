// src/components/Header/nav/Curve/index.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

export default function Curve() {
  const [path, setPath] = useState({
    initialPath: 'M100 0 L100 0 Q-100 0 100 0', // Default path
    targetPath: 'M100 0 L100 0 Q100 0 100 0', // Default path
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
      const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;
      setPath({ initialPath, targetPath });
    }
  }, []);

  const curve = {
    initial: {
      d: path.initialPath,
    },
    enter: {
      d: path.targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: path.initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={styles.svgCurve}>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
}
