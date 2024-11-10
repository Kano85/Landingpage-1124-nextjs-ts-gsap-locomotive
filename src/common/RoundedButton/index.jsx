// src/common/RoundedButton/index.jsx

import React, { useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';
import { useGSAP } from '@gsap/react';

export default function RoundedButton({
  children,
  backgroundColor = '#455CE9',
  ...attributes
}) {
  const buttonRef = useRef(null); // Ref for the main button element
  const circleRef = useRef(null); // Ref for the animated circle
  const timelineRef = useRef(null); // Ref for the GSAP timeline
  const timeoutIdRef = useRef(null); // Ref for managing timeouts

  useGSAP(
    (context, contextSafe) => {
      if (!circleRef.current || !buttonRef.current) return; // Ensure refs are attached

      // Initialize GSAP timeline
      timelineRef.current = gsap.timeline({ paused: true });
      timelineRef.current
        .to(
          circleRef.current,
          { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
          'enter'
        )
        .to(
          circleRef.current,
          { top: '-150%', width: '125%', duration: 0.25 },
          'exit'
        );

      // Define context-safe event handlers
      const manageMouseEnter = contextSafe(() => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        timelineRef.current.tweenFromTo('enter', 'exit');
      });

      const manageMouseLeave = contextSafe(() => {
        timeoutIdRef.current = setTimeout(() => {
          timelineRef.current.play();
        }, 300);
      });

      // Attach event listeners
      buttonRef.current.addEventListener('mouseenter', manageMouseEnter);
      buttonRef.current.addEventListener('mouseleave', manageMouseLeave);

      // Cleanup function to remove event listeners and kill the timeline
      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mouseenter', manageMouseEnter);
          buttonRef.current.removeEventListener('mouseleave', manageMouseLeave);
        }
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        if (timelineRef.current) timelineRef.current.kill();
      };
    },
    { scope: buttonRef }
  ); // Set scope to the ref for context management

  return (
    <Magnetic>
      <div
        className={styles.roundedButton}
        style={{ overflow: 'hidden' }}
        ref={buttonRef}
        {...attributes}
      >
        {children}
        <div
          ref={circleRef}
          style={{ backgroundColor }}
          className={styles.circle}
        ></div>
      </div>
    </Magnetic>
  );
}
