'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function RoundedButton({ children, onClick, className }) {
  const buttonRef = useRef(null);
  const timeline = useRef(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  // Initialize GSAP timeline inside contextSafe()
  const initializeTimeline = contextSafe(() => {
    timeline.current = gsap
      .timeline({ paused: true })
      .to(buttonRef.current, { rotation: 90, duration: 0.3 })
      .to(buttonRef.current, { rotation: 0, duration: 0.3 });
  });

  // Initialize timeline when component mounts
  React.useEffect(() => {
    initializeTimeline();
  }, []);

  // Wrap click handler with contextSafe()
  const handleClick = contextSafe(() => {
    timeline.current.play().then(() => timeline.current.reverse());
    if (onClick) {
      onClick();
    }
  });

  return (
    <button ref={buttonRef} onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
