import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    const numericEnd = parseInt(end.toString().replace(/[^0-9]/g, ''));

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * numericEnd);
      
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration]);

  // Format the number with suffix
  const formatNumber = (num) => {
    if (end.toString().includes('+')) {
      return `${num.toLocaleString()}+`;
    }
    if (end.toString().includes(',')) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return <span className="whitespace-nowrap">{formatNumber(count)}{suffix}</span>;
}

