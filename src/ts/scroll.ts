const footer: HTMLElement | null = document.querySelector('.footer');
const startGameBtn: HTMLElement | null =
  document.querySelector('.nickname-btn');

function scrollToFooter() {
  document.body.classList.remove('no-scroll');

  const playingField: HTMLElement | null =
    document.querySelector('.playing-field');

  if (playingField) {
    playingField.style.transition = 'opacity 5s ease';
    playingField.style.opacity = '1';
  }

  if (footer) {
    const targetY: number = footer.getBoundingClientRect().top + window.scrollY;
    const startY: number = window.scrollY;
    const distance: number = targetY - startY;
    const duration: number = 3000;
    const startTime: number = performance.now();

    requestAnimationFrame((timestamp) => {
      scrollStep(timestamp, startY, distance, duration, startTime);
    });
  }
}

function scrollStep(
  timestamp: number,
  startY: number,
  distance: number,
  duration: number,
  startTime: number,
) {
  const currentTime: number = timestamp - startTime;
  const progress = Math.min(currentTime / duration, 1);

  window.scrollTo(0, startY + distance * progress);

  if (currentTime < duration) {
    requestAnimationFrame((newTimestamp) => {
      scrollStep(newTimestamp, startY, distance, duration, startTime);
    });
  } else {
    document.body.classList.add('no-scroll');
  }
}

startGameBtn?.addEventListener('click', scrollToFooter);
