import Lenis from 'lenis';
import {gsap, ScrollTrigger, isMobile, reducedMotion} from './core';

export function initSmoothScroll() {
  if (isMobile() || reducedMotion()) return null;
  const lenis = new Lenis({lerp: 0.1, wheelMultiplier: 1, infinite: false, gestureOrientation: 'vertical'});
  lenis.on('scroll', () => ScrollTrigger.update());
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  return lenis;
}
