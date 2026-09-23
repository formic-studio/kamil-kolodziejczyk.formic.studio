import type Lenis from 'lenis';
import {gsap, isMobile, reducedMotion} from './core';

export function initHero(lenis: Lenis | null, onReady: () => void) {
  const mobile = isMobile();
  const heroImg = document.querySelector(mobile ? '.img-hero.is-mobile' : '.img-hero:not(.is-mobile)');
  const text = document.querySelector('[animation-data="text-hero"]');
  const button = document.querySelector('[animation-data="button"]');
  const caption = document.querySelector('[animation-data="caption"]');
  const nav = document.querySelector('.nav_fixed');
  const rectangles = gsap.utils.toArray<HTMLElement>('[animation-rectangle]').sort((a, b) => Number(a.getAttribute('animation-rectangle')) - Number(b.getAttribute('animation-rectangle')));

  if (reducedMotion()) { gsap.set([heroImg, text, button, caption, nav, rectangles], {clearProps: 'all'}); onReady(); return; }
  gsap.set(nav, {y: '6rem', opacity: 0});
  gsap.set(rectangles, {opacity: 0, scale: mobile ? 1 : .5, transformOrigin: 'center'});
  gsap.set(text, {opacity: 0, filter: mobile ? 'none' : 'blur(5px)'});
  gsap.set(button, {x: 32, opacity: 0});
  gsap.set(caption, {yPercent: -18, opacity: 0});
  if (!mobile) gsap.set(heroImg, {scale: 2, filter: 'blur(5px)', transformOrigin: 'center'});
  else gsap.set(heroImg, {scale: 1, opacity: 1});

  const tl = gsap.timeline({delay: mobile ? .08 : .3, onComplete: () => {lenis?.start(); onReady();}});
  tl.to(rectangles, {opacity: 1, scale: 1, duration: mobile ? .35 : .6, stagger: mobile ? .05 : .18, ease: 'power2.out'}, 0);
  if (!mobile) tl.to(heroImg, {scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power2.inOut'}, .4);
  tl.to(caption, {yPercent: 0, opacity: 1, duration: mobile ? .45 : 1, ease: 'power2.out'}, mobile ? .12 : 1.4)
    .to(text, {opacity: 1, filter: 'blur(0px)', duration: mobile ? .45 : 1}, mobile ? .24 : 1.6)
    .to(button, {x: 0, opacity: 1, duration: mobile ? .5 : 1}, mobile ? .32 : 1.8)
    .to(nav, {y: 0, opacity: 1, duration: mobile ? .8 : 1}, mobile ? .32 : 2);
}
