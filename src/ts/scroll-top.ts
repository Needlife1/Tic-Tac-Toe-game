document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const position: string = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--scrollTop');

    const scrollTop: number = parseFloat(position.replace('px', ''));
    if (!isNaN(scrollTop)) {
      window.scrollTo(scrollTop, 0);
    }
  }, 500);
});
