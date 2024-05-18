import { click } from './tic-tac-toe';

const cells: NodeListOf<HTMLElement> = document.querySelectorAll(
  '.playing-field-item',
);

cells.forEach((playingFieldItem) => {
  playingFieldItem.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      click(e);
    } else if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      const currentIndex: number = Array.from(cells).indexOf(playingFieldItem);

      let nextIndex: number = -1;
      switch (e.key) {
        case 'ArrowUp':
          nextIndex = currentIndex - 3;
          break;
        case 'ArrowDown':
          nextIndex = currentIndex + 3;
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex - 1;
          break;
        case 'ArrowRight':
          nextIndex = currentIndex + 1;
          break;
      }
      if (nextIndex >= 0 && nextIndex < cells.length) {
        cells[nextIndex].focus();
      }
    }
  });
});

const nicknameBtn = document.querySelector(
  '.nickname-btn',
) as HTMLButtonElement | null;

const focusableElements = document.querySelectorAll<HTMLElement>(
  '.nickname-input, .nickname-btn',
);

nicknameBtn?.addEventListener('click', () => {
  focusableElements.forEach((element: HTMLElement) => {
    element.setAttribute('tabindex', '-1');
  });
});
