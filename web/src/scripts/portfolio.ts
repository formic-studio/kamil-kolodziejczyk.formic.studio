import {gsap, isMobile, throttleRaf} from './core';

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

  const firstBackground = slides[0]?.querySelector<HTMLElement>('.block-bg-orange');
  if (firstBackground) {
    gsap.fromTo(firstBackground,
      {scaleX: 0, transformOrigin: 'center'},
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: slides[0],
          start: 'top 55%',
          end: 'top 10%',
          scrub: true,
        },
      },
    );
  }

  slides.slice(1).forEach((element) => {
    const previous = element.previousElementSibling;
    const previousOverlay = previous?.querySelector<HTMLElement>('.bg-black');
    const setCompositingHint = (active: boolean) => {
      element.style.willChange = active ? 'clip-path' : 'auto';
      if (previousOverlay) previousOverlay.style.willChange = active ? 'opacity' : 'auto';
    };
    const tl = gsap.timeline({scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'top 10%',
      scrub: true,
      onEnter: () => setCompositingHint(true),
      onEnterBack: () => setCompositingHint(true),
      onLeave: () => setCompositingHint(false),
      onLeaveBack: () => setCompositingHint(false),
    }});
    tl.fromTo(element, {clipPath: 'inset(0 9%)'}, {clipPath: 'inset(0 0%)', duration: 1, ease: 'none'}, 0)
      .fromTo(element.querySelector('.caption-wrapper'), {opacity: 0}, {opacity: 1, duration: .5, ease: 'power1.out'}, .4)
      .fromTo(element.querySelector('.block-bg-orange'), {scaleX: 0}, {scaleX: 1, transformOrigin: 'center', duration: .5, ease: 'power2.inOut'}, .5)
      .fromTo(element.querySelectorAll('[data-animation="text"]'), {opacity: 0}, {opacity: 1, duration: .3, ease: 'none'}, .7);
    if (previousOverlay) tl.fromTo(previousOverlay, {opacity: 0}, {opacity: .75, duration: 1, ease: 'none'}, 0);
  });
}
