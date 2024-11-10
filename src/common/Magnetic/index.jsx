// src/common/Magnetic/index.jsx

'use client'; // Add this line

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Magnetic({ children }) {
  const magneticRef = useRef(null);

  useGSAP(
    () => {
      if (!magneticRef.current) return; // Ensure ref is attached

      // Create GSAP quickTo instances for x and y
      const xTo = gsap.quickTo(magneticRef.current, 'x', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      const yTo = gsap.quickTo(magneticRef.current, 'y', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });

      // Event handler for mouse movement
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } =
          magneticRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      };

      // Event handler for mouse leave
      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      // Attach event listeners
      magneticRef.current.addEventListener('mousemove', handleMouseMove);
      magneticRef.current.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function to remove event listeners
      return () => {
        magneticRef.current.removeEventListener('mousemove', handleMouseMove);
        magneticRef.current.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: magneticRef }
  ); // Set scope to the ref for context management

  return React.cloneElement(children, { ref: magneticRef });
}
