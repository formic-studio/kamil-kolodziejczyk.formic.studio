import type Lenis from 'lenis';
import {isMobile, reducedMotion} from './core';

export function initIntroLock(lenis: Lenis | null) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const shouldLock = !isMobile() && !reducedMotion();
  if (!shouldLock) {
    document.documentElement.classList.remove('is-intro-loading');
    return () => window.scrollTo(0, 0);
  }

  let running = true;
  document.documentElement.classList.add('is-intro-loading');
  lenis?.stop();
  lenis?.scrollTo(0, {immediate: true});

  const preventScroll = (event: Event) => {
    if (!running || !event.cancelable) return;
    event.preventDefault();
  };

  window.addEventListener('wheel', preventScroll, {passive: false});
  window.addEventListener('touchmove', preventScroll, {passive: false});
  const keepAtTopOnce = () => {
    if (!running) return;
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, {immediate: true});
  };
  window.addEventListener('load', keepAtTopOnce, {once: true});

  let safetyTimer = 0;
  const release = () => {
    if (!running) return;
    running = false;
    window.clearTimeout(safetyTimer);
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('load', keepAtTopOnce);
    document.documentElement.classList.remove('is-intro-loading');
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, {immediate: true});
    lenis?.start();
  };

  // Never leave the page locked if an asset or animation unexpectedly fails.
  safetyTimer = window.setTimeout(release, 6000);
  return release;
}
