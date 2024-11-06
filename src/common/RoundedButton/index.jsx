// src/common/RoundedButton/index.jsx

'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import useGSAP from '../../hooks/useLocoScroll';

export default function RoundedButton({ children, onClick, className }) {
  const buttonRef = useRef(null);
  const timeline = useRef(null);

  useGSAP(() => {
    // Initialize GSAP timeline
    timeline.current = gsap
      .timeline({ paused: true })
      .to(buttonRef.current, { rotation: 90, duration: 0.3 })
      .to(buttonRef.current, { rotation: 0, duration: 0.3 });
  }, []);

  // Define the click handler
  const handleClick = () => {
    // Play the timeline and reverse it after completion
    timeline.current.play().then(() => timeline.current.reverse());
    // Call the onClick prop if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button ref={buttonRef} onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
