export default function resetFontsize() {
  const el = document.documentElement;
  const { clientWidth } = el;

  el.style['font-size'] = `${clientWidth / 10}px`;
}

resetFontsize();
window.addEventListener('resize', resetFontsize);
