window.addEventListener('scroll', function () {
  document.documentElement.style.setProperty(
    '--scrollTop',
    `${this.scrollY}px`,
  );
});
