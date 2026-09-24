import {throttleRaf} from './core';

type EdgeTheme = {
  selector: string;
  from: string;
  to?: string;
};

const edgeThemes: EdgeTheme[] = [
  {selector: '.section_popup', from: '#e82f12'},
  {selector: '.section_hero', from: '#fff9f5'},
  {selector: '.section_offer', from: '#fff9f5', to: '#b7b4b2'},
  {selector: '.portfolio-block', from: '#212121'},
  {selector: '.section_competencies', from: '#6f6f6f', to: '#212121'},
  {selector: '.section_services', from: '#e82f12'},
  {selector: '.section_testimonials', from: '#212121'},
  {selector: '.section_contact', from: '#212121', to: '#000000'},
  {selector: '.section_footer', from: '#000000'},
];

const toRgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const mixColors = (from: string, to: string, progress: number) => {
  const start = toRgb(from);
  const end = toRgb(to);
  const amount = Math.min(1, Math.max(0, progress));
  const channels = start.map((channel, index) => Math.round(channel + (end[index] - channel) * amount));
  return `rgb(${channels.join(' ')})`;
};

const colorAtPoint = (x: number, y: number, fallback: string) => {
  const elements = document.elementsFromPoint(x, y);

  for (const element of elements) {
    if (element.closest('.browser-edge-tint, .nav_fixed')) continue;

    for (const theme of edgeThemes) {
      const section = element.closest<HTMLElement>(theme.selector);
      if (!section) continue;
      if (!theme.to) return theme.from;

      const bounds = section.getBoundingClientRect();
      const progress = bounds.height > 0 ? (y - bounds.top) / bounds.height : 0;
      return mixColors(theme.from, theme.to, progress);
    }
  }

  return fallback;
};

export function initBrowserChrome() {
  const mobile = window.matchMedia('(max-width: 767px)');
  if (!mobile.matches) return;

  const root = document.documentElement;
  const themeMeta = document.querySelector<HTMLMetaElement>('#browser-theme-color');
  let topColor = '#fff9f5';
  let bottomColor = '#fff9f5';

  const update = () => {
    const center = window.innerWidth / 2;
    topColor = colorAtPoint(center, 1, topColor);
    bottomColor = colorAtPoint(center, Math.max(1, window.innerHeight - 2), bottomColor);

    root.style.setProperty('--browser-top-color', topColor);
    root.style.setProperty('--browser-bottom-color', bottomColor);
    root.style.backgroundColor = topColor;
    document.body.style.backgroundColor = bottomColor;

    // Older Safari versions use one theme color for both bars. The top edge
    // is the least surprising fallback; current Safari can additionally use
    // the independently painted safe-area colors above.
    if (themeMeta) themeMeta.content = topColor;
  };

  const scheduleUpdate = throttleRaf(update);
  update();
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate, {passive: true});
  window.addEventListener('pageshow', scheduleUpdate);
  window.visualViewport?.addEventListener('resize', scheduleUpdate, {passive: true});
  window.visualViewport?.addEventListener('scroll', scheduleUpdate, {passive: true});
}
