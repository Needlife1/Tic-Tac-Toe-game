const playingField: HTMLElement | null =
  document.querySelector('.playing-field');

const arr: number[] = Array(9).fill(0);
let step: number = 1;

const fragment = document.createDocumentFragment();

arr.forEach((_, index: number) => {
  const cell = document.createElement('div');

  cell.className = 'playing-field-item';
  cell.dataset.n = index.toString();
  fragment.appendChild(cell);
});

if (playingField !== null) {
  playingField.appendChild(fragment);
}

function click(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target) return;

  const n = target.dataset.n;
  if (!n || arr[parseInt(n)] !== 0) return;

  arr[parseInt(n)] = step;

  render();
  checkWinner(step);

  step = step === 1 ? 2 : 1;
}

function render() {
  const cells: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.playing-field-item',
  );
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
      return;
    }
  }

  if (!arr.includes(0)) showDraw();
}

function showWin(step: number) {
  console.log(`Победил ${step === 1 ? 'X' : 'O'}`);
  playingField?.removeEventListener('click', click);
}

function showDraw() {
  console.log('Ничья');
  playingField?.removeEventListener('click', click);
}

playingField?.addEventListener('click', click);

const winnersCountBtn: HTMLButtonElement | null =
  document.querySelector('.winners-count-btn');

if (winnersCountBtn) {
  winnersCountBtn.addEventListener('click', () => {
    location.reload();
  });
}
