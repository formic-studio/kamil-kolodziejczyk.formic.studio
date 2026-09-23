import type Lenis from 'lenis';
import {gsap, throttleRaf} from './core';

export function initNavigation(lenis: Lenis | null) {
  const nav = document.querySelector<HTMLElement>('.nav_fixed');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-block .link-block')];
  if (!nav || !links.length) return;
  let active = 0;
  const select = (index: number) => links.forEach((link, i) => {
    link.classList.toggle('link-bg-color', i === index);
    gsap.to(link.querySelector('.nav-bg'), {xPercent: i === index ? 0 : 100, opacity: i === index ? 1 : 0, duration: .35, overwrite: true});
  });
  select(0);
  links.forEach((link, index) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(link.hash);
    if (!target) return;
    active = index; select(index);
    if (lenis) lenis.scrollTo(target, {duration: 1}); else target.scrollIntoView({behavior: 'smooth'});
  }));
  const sections = links.map((link) => document.querySelector<HTMLElement>(link.hash)).filter(Boolean) as HTMLElement[];
  let lastY = scrollY;
  addEventListener('scroll', throttleRaf(() => {
    const current = scrollY;
    nav.style.bottom = current > 150 && current > lastY + 8 ? `-${nav.offsetHeight + 40}px` : '';
    lastY = current;
    const found = sections.findIndex((section) => {const rect = section.getBoundingClientRect(); return rect.top <= innerHeight / 2 && rect.bottom >= innerHeight / 2;});
    if (found >= 0 && found !== active) {active = found; select(found);}
  }), {passive: true});
  nav.style.transition = 'bottom .6s cubic-bezier(.25,.46,.45,.94)';
}
