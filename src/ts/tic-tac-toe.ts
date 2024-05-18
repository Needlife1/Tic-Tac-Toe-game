const playingField: HTMLElement | null =
  document.querySelector('.playing-field');

const arr: number[] = Array(9).fill(0);
let step: number = 1;

const fragment = document.createDocumentFragment();

arr.forEach((_, index: number) => {
  const cell = document.createElement('div');

  cell.className = 'playing-field-item';
  cell.dataset.n = index.toString();
  cell.setAttribute('role', 'button');
  cell.setAttribute('tabindex', '0');
  fragment.appendChild(cell);
});

if (playingField !== null) {
  playingField.appendChild(fragment);
}

export function click(e: MouseEvent | KeyboardEvent) {
  const target = e.target as HTMLElement;
  if (!target) return;

  const n = target.dataset.n;
  if (!n || arr[parseInt(n)] !== 0) return;

  arr[parseInt(n)] = step;

  render();
  checkWinner(step);

  step = step === 1 ? 2 : 1;
}

const cells: NodeListOf<HTMLElement> = document.querySelectorAll(
  '.playing-field-item',
);

function render() {
  cells.forEach((cell: HTMLElement, i: number) => {
    switch (arr[i]) {
      case 1:
        cell.textContent = 'X';
        break;
      case 2:
        cell.textContent = 'O';
        break;
      default:
        cell.textContent = '';
        break;
    }
  });
}

function checkWinner(step: number) {
  const winnerArr: string[] = [
    '012',
    '345',
    '678',
    '036',
    '147',
    '258',
    '048',
    '246',
  ];
  const indexStep: number[] = [];

  arr.forEach((item: number, i: number) => {
    if (item === step) indexStep.push(i);
  });

  for (const winPattern of winnerArr) {
    const winIndexes = winPattern.split('').map(Number);
    if (winIndexes.every((index) => indexStep.includes(index))) {
      showWin(step);

      if (winIndexes.length > 0) {
        const winSet = new Set(winIndexes);

        cells.forEach((cell, index) => {
          if (winSet.has(index)) {
            cell.classList.add('winner');
          } else {
            cell.classList.add('not-winner');
          }
        });
      }
      return;
    }
  }

  if (!arr.includes(0)) showDraw();
}

let counterUser1 = 0;
let counterUser2 = 0;

function showWin(step: number) {
  if (step === 1) {
    counterUser1++;
    const user1 = document.getElementById('user-1');
    if (user1) {
      user1.textContent = `${counterUser1}`;
    }
  } else {
    counterUser2++;
    const user2 = document.getElementById('user-2');
    if (user2) {
      user2.textContent = `${counterUser2}`;
    }
  }

  playingField?.removeEventListener('click', click);
}

function showDraw() {
  playingField?.removeEventListener('click', click);
}

playingField?.addEventListener('click', click);

const winnersCountBtn: HTMLButtonElement | null =
  document.querySelector('.winners-count-btn');

if (winnersCountBtn) {
  winnersCountBtn.addEventListener('click', () => {
    arr.fill(0);
    step = 1;

    cells.forEach((el) => {
      el.textContent = '';
      el.classList.remove('winner');
      el.classList.remove('not-winner');
    });

    playingField?.addEventListener('click', click);
  });
}
