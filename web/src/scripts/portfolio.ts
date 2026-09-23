import {gsap, ScrollTrigger, isMobile, throttleRaf} from './core';

export function initPortfolio() {
  const wrapper = document.querySelector<HTMLElement>('.portfolio-wrapper');
  if (!wrapper) return;
  const slides = [...wrapper.querySelectorAll<HTMLElement>('.portfolio-block')];
  if (isMobile()) {
    const pagination = document.querySelector<HTMLElement>('.mobile-scroll-paggination');
    if (!pagination) return;
    pagination.replaceChildren(...slides.map((slide, index) => {
      const dot = document.createElement('button'); dot.className = `paggination${index === 0 ? ' active' : ''}`; dot.ariaLabel = `Realizacja ${index + 1}`;
      dot.addEventListener('click', () => slide.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'nearest'})); return dot;
    }));
    wrapper.addEventListener('scroll', throttleRaf(() => {
      const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
      let active = 0, distance = Infinity;
      slides.forEach((slide, i) => {const d = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center); if (d < distance) {active = i; distance = d;}});
      [...pagination.children].forEach((dot, i) => dot.classList.toggle('active', i === active));
    }), {passive: true});
    return;
  }
  slides.slice(1).forEach((element) => {
    const previous = element.previousElementSibling;
    const tl = gsap.timeline({scrollTrigger: {trigger: element, start: 'top bottom', end: 'top 10%', scrub: true}});
    tl.fromTo(element, {width: '82%'}, {width: '100%', ease: 'none'}, 0)
      .fromTo(element.querySelector('.caption-wrapper'), {opacity: 0}, {opacity: 1}, .4)
      .fromTo(element.querySelector('.block-bg-orange'), {scaleX: 0}, {scaleX: 1, transformOrigin: 'center'}, .5)
      .fromTo(element.querySelectorAll('[data-animation="text"]'), {opacity: 0}, {opacity: 1}, .7);
    if (previous) tl.fromTo(previous.querySelector('.bg-black'), {backgroundColor: 'rgba(0,0,0,0)'}, {backgroundColor: 'rgba(0,0,0,.75)', ease: 'none'}, 0);
  });
  ScrollTrigger.refresh();
}
