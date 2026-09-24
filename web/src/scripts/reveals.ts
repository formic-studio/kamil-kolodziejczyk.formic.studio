import {gsap, isMobile} from './core';

export function initReveals() {
  document.querySelectorAll('[text-animation="true"]').forEach((element) => gsap.fromTo(element, {y: 20, opacity: 0, filter: isMobile() ? 'none' : 'blur(5px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, scrollTrigger: {trigger: element, start: 'top 90%', once: true}}));
  const offers = document.querySelectorAll('[data-offer]');
  if (offers.length) gsap.fromTo(offers, {opacity: 0, y: 40, filter: isMobile() ? 'none' : 'blur(5px)'}, {opacity: 1, y: 0, filter: 'none', duration: 1.4, stagger: .25, scrollTrigger: {trigger: '.padding-top-6', start: 'top 80%', once: true}});
  document.querySelectorAll('.form').forEach((form) => gsap.to(form.querySelectorAll('.form-field'), {backgroundSize: '100% 100%', duration: 1.4, stagger: .25, scrollTrigger: {trigger: form, start: 'top 80%', once: true}}));
}
