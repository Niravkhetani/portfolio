import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisCtx = createContext({ lenis: null });
export const useLenis = () => useContext(LenisCtx);

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;
}

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) {
      ScrollTrigger.refresh();
      return;
    }
    let lenis;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
    } catch {
      ScrollTrigger.refresh();
      return;
    }
    const raf = t => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisCtx.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisCtx.Provider>
  );
}
