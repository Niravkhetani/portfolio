import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: self => {
        if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #b8892a, #d4a843, #f0c060)',
        transformOrigin: 'left',
        zIndex: 9999,
        scaleX: 0,
      }}
    />
  );
}
