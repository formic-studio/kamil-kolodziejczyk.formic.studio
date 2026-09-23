import type Lenis from 'lenis';
import {gsap, throttleRaf} from './core';

export function initNavigation(lenis: Lenis | null) {
  const nav = document.querySelector<HTMLElement>('.nav_fixed');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-block .link-block')];
  if (!nav || !links.length) return;

  const navContainer = links[0].parentElement;
  let active = 0;
  let visual = 0;
  let isClicking = false;
  let isHovering = false;

  const select = (index: number) => {
    const oldLink = links[visual];
    const newLink = links[index];
    if (!newLink) return;

    const oldBackground = oldLink?.querySelector<HTMLElement>('.nav-bg');
    const newBackground = newLink.querySelector<HTMLElement>('.nav-bg');

    if (visual !== index) {
      const direction = index > visual ? 100 : -100;
      oldLink?.classList.remove('link-bg-color');
      if (oldBackground) {
        gsap.to(oldBackground, {
          xPercent: direction,
          opacity: 0,
          duration: .35,
          ease: 'power2.inOut',
          overwrite: true,
        });
      }

      newLink.classList.add('link-bg-color');
      if (newBackground) {
        gsap.fromTo(newBackground,
          {xPercent: -direction, opacity: 1},
          {xPercent: 0, opacity: 1, duration: .35, ease: 'power2.inOut', overwrite: true},
        );
      }
      visual = index;
      return;
    }

    newLink.classList.add('link-bg-color');
    if (newBackground) gsap.to(newBackground, {xPercent: 0, opacity: 1, duration: .2, overwrite: true});
  };

  const firstBackground = links[0].querySelector<HTMLElement>('.nav-bg');
  if (firstBackground) gsap.set(firstBackground, {xPercent: 0, opacity: 1});
  links[0].classList.add('link-bg-color');

  links.forEach((link, index) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(link.hash);
    if (!target) return;
    isClicking = true;
    active = index;
    select(index);
    const unlock = () => {
      isClicking = false;
      updateActiveOnScroll();
    };
    if (lenis) lenis.scrollTo(target, {duration: 1, onComplete: unlock});
    else {
      target.scrollIntoView({behavior: 'smooth'});
      window.setTimeout(unlock, 800);
    }
  }));

  links.forEach((link, index) => link.addEventListener('mouseenter', () => {
    if (isClicking) return;
    isHovering = true;
    select(index);
  }));

  navContainer?.addEventListener('mouseleave', () => {
    isHovering = false;
    if (!isClicking) select(active);
  });

  const sections = links.map((link) => document.querySelector<HTMLElement>(link.hash)).filter(Boolean) as HTMLElement[];
  const updateActiveOnScroll = throttleRaf(() => {
    if (isClicking) return;
    const found = sections.findIndex((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= innerHeight / 2 && rect.bottom >= innerHeight / 2;
    });
    if (found >= 0 && found !== active) {
      active = found;
      if (!isHovering) select(found);
    }
  });

  const defaultBottom = getComputedStyle(nav).bottom;
  const hiddenBottom = `-${nav.offsetHeight + 40}px`;
  let lastY = scrollY;
  let distanceDown = 0;
  let distanceUp = 0;
  addEventListener('scroll', throttleRaf(() => {
    const current = scrollY;
    const delta = current - lastY;

    if (current < 150) {
      nav.style.bottom = defaultBottom;
      distanceDown = 0;
      distanceUp = 0;
    } else if (delta > 0) {
      distanceDown += delta;
      distanceUp = 0;
      if (distanceDown >= 10) nav.style.bottom = hiddenBottom;
    } else if (delta < 0) {
      distanceUp -= delta;
      distanceDown = 0;
      if (distanceUp >= 10) nav.style.bottom = defaultBottom;
    }

    lastY = current;
    updateActiveOnScroll();
  }), {passive: true});
  nav.style.transition = 'bottom .6s cubic-bezier(.25,.46,.45,.94)';
}
