import {ScrollTrigger} from './core';
import {initSmoothScroll} from './smoothScroll';
import {initHero} from './hero';
import {initNavigation} from './navigation';
import {initPortfolio} from './portfolio';
import {initSliders} from './sliders';
import {initTestimonials} from './testimonials';
import {initReveals} from './reveals';
import {initPopup} from './popup';
import {initForms} from './forms';
import {initIntroLock} from './intro';
import {initBrowserChrome} from './browserChrome';

const start = () => {
  initBrowserChrome();
  const lenis = initSmoothScroll();
  const releaseIntro = initIntroLock(lenis);
  const initContent = () => {
    releaseIntro();
    initNavigation(lenis); initPortfolio(); initSliders(); initTestimonials(); initReveals(); initPopup(lenis); initForms();
    ScrollTrigger.refresh();
  };
  initHero(lenis, initContent);
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true}); else start();
