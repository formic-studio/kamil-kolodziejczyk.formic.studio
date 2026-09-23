import {gsap, isMobile, throttleRaf} from './core';

export function initTestimonials() {
  const wrapper = document.querySelector<HTMLElement>('.testimonial-wrapper');
  if (!wrapper) return;
  const slides = [...wrapper.querySelectorAll<HTMLElement>('.testimonial-slide')];
  const prev = document.querySelector<HTMLElement>('.testimonial-arrow--prev');
  const next = document.querySelector<HTMLElement>('.testimonial-arrow--next');
  let current = 0;
  const update = () => {
    const count = Number.parseInt(getComputedStyle(wrapper).getPropertyValue('--_slider---quantity')) || 1;
    const max = Math.max(0, slides.length - count); current = Math.max(0, Math.min(current, max));
    const gap = Number.parseFloat(getComputedStyle(wrapper).columnGap) || 0;
    gsap.to(wrapper, {x: -current * ((slides[0]?.offsetWidth || wrapper.clientWidth) + gap), duration: .8, ease: 'power2.inOut'});
    slides.forEach((slide, index) => gsap.to(slide, {opacity: index >= current && index < current + count ? 1 : .4, filter: isMobile() ? 'none' : index >= current && index < current + count ? 'blur(0px)' : 'blur(5px)', duration: .7}));
    prev?.classList.toggle('is-active', current > 0); next?.classList.toggle('is-active', current < max);
  };
  prev?.addEventListener('click', () => {current--; update();}); next?.addEventListener('click', () => {current++; update();});
  addEventListener('resize', throttleRaf(update)); update();
}
