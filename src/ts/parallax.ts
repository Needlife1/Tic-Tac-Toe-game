window.addEventListener('scroll', function () {
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`;
});
