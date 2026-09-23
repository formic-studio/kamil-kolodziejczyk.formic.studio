import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export {gsap, ScrollTrigger};
export const isMobile = () => matchMedia('(max-width: 767px)').matches;
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const throttleRaf = <T extends unknown[]>(fn: (...args: T) => void) => {
  let ticking = false;
  return (...args: T) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { fn(...args); ticking = false; });
  };
};
