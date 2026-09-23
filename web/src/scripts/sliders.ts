import {gsap, ScrollTrigger, isMobile} from './core';

const revealBlock = (block: Element) => {
  const titles = block.querySelectorAll('.font-size-link, .heading-style-h4');
  const bodies = block.querySelectorAll('.list-block, .text-caption');
  const dividers = block.querySelectorAll('.divider');
  const socials = block.querySelectorAll('.social-link-block');
  gsap.set([titles, bodies, socials], {opacity: 0, y: 10, filter: isMobile() ? 'none' : 'blur(10px)'});
  gsap.set(dividers, {opacity: 1, scaleX: 0, transformOrigin: 'left'});
  gsap.timeline().to(titles, {opacity: 1, y: 0, filter: 'none', duration: 1.2, stagger: .16})
    .to(bodies, {opacity: 1, y: 0, filter: 'none', duration: 1.2, stagger: .12}, '-=.9')
    .to(dividers, {scaleX: 1, duration: 1.6, stagger: .15}, '-=1.4')
    .to(socials, {opacity: 1, y: 0, filter: 'none', duration: .8, stagger: .1}, '-=.8');
};

export function initSliders() {
  document.querySelectorAll<HTMLElement>('[data-slider-group]').forEach((group) => {
    const buttons = [...group.querySelectorAll<HTMLElement>('.slider-text')];
    const inner = group.querySelector<HTMLElement>('.slider-inner');
    const blocks = [...group.querySelectorAll<HTMLElement>('.slider-block, .slider-block-services')];
    if (!inner || !blocks.length) return;
    const goTo = (index: number) => {
      const block = blocks[index]; if (!block) return;
      const gap = Number.parseFloat(getComputedStyle(inner).columnGap) || 0;
      gsap.to(inner, {x: -index * (block.offsetWidth + gap), duration: .35, ease: 'power2.out', onComplete: () => revealBlock(block)});
      buttons.forEach((button, i) => button.classList.toggle('font-opacity-25', i !== index));
      group.querySelectorAll<HTMLElement>('[slider-connect]').forEach((el) => el.classList.toggle('font-color-opacity', Number(el.getAttribute('slider-connect')) !== index));
    };
    buttons.forEach((button, index) => button.addEventListener('click', () => goTo(index)));
    ScrollTrigger.create({trigger: group, start: 'top 75%', once: true, onEnter: () => goTo(0)});
  });
}
