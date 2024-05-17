type FormDataObject = {
  player1: string;
  player2: string;
};

const nicknameForm: HTMLElement | null =
  document.querySelector('.nickname-form');
const winnersWruper: HTMLElement | null =
  document.querySelector('.winners-wruper');

nicknameForm?.addEventListener('submit', getNames);

function getNames(this: HTMLFormElement, e: Event) {
  e.preventDefault();

  const formData = new FormData(this);
  const formDataObject: FormDataObject = {
    player1: '',
    player2: '',
  };

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      if (value.trim() === '') {
        formDataObject[key as keyof FormDataObject] =
          (
            this.elements[
              key as keyof HTMLFormControlsCollection
            ] as HTMLElement
          )?.getAttribute('name') || '';
      } else {
        formDataObject[key as keyof FormDataObject] = value.trim();
      }
    } else if (value instanceof File) {
      formDataObject[key as keyof FormDataObject] = value.name;
    }
  });

  createElement(formDataObject);
  hideForm();
}

function createElement({ player1, player2 }: FormDataObject) {
  const users = [
    { name: player1, id: 'user-1' },
    { name: player2, id: 'user-2' },
  ];

  users.forEach(({ name, id }) => {
    const parentSpan = document.createElement('span');
    parentSpan.className = 'winners-count-item';
    parentSpan.textContent = `${name}: `;

    const childSpan = document.createElement('span');
    childSpan.id = id;
    childSpan.textContent = `0`;

    parentSpan.appendChild(childSpan);
    winnersWruper?.appendChild(parentSpan);
  });
}

function hideForm() {
  if (nicknameForm) {
    nicknameForm.style.opacity = '0';
  }
}
