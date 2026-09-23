import type Lenis from 'lenis';
import {gsap, isMobile} from './core';

export function initPopup(lenis: Lenis | null) {
  const section = document.querySelector<HTMLElement>('[data-popup="section"]');
  const block = document.querySelector<HTMLElement>('[data-popup="block"]');
  const close = document.querySelector<HTMLElement>('[data-popup="close"]');
  const opens = document.querySelectorAll<HTMLElement>('[data-popup="open"]');
  if (!section || !block || !close) return;
  gsap.set(section, {display: 'none', opacity: 0}); gsap.set([block, close], {x: 80, opacity: 0, filter: isMobile() ? 'none' : 'blur(10px)'});
  const hide = () => gsap.timeline({onComplete: () => {gsap.set(section, {display: 'none'}); section.ariaHidden = 'true'; lenis?.start();}})
    .to([close, block], {x: 50, opacity: 0, duration: .3}).to(section, {opacity: 0, duration: .25});
  opens.forEach((open) => open.addEventListener('click', () => {lenis?.stop(); section.ariaHidden = 'false'; gsap.timeline().set(section, {display: 'flex'}).to(section, {opacity: 1, duration: .35}).to([block, close], {x: 0, opacity: 1, filter: 'none', duration: .55, stagger: .08}, '-=.2');}));
  close.addEventListener('click', hide); section.addEventListener('click', (event) => {if (event.target === section) hide();});
  addEventListener('keydown', (event) => {if (event.key === 'Escape' && section.ariaHidden === 'false') hide();});
}
