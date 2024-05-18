window.addEventListener('scroll', function () {
  document.documentElement.style.setProperty(
    '--scrollTop',
    `${this.scrollY}px`,
  );
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const position: string = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--scrollTop');

    const scrollTop: number = parseFloat(position.replace('px', ''));
    if (!isNaN(scrollTop)) {
      window.scrollTo(scrollTop, 0);
    }
  }, 800);
});
