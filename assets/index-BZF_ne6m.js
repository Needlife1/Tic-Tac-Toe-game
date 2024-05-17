(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
window.addEventListener("scroll", function() {
  document.documentElement.style.setProperty(
    "--scrollTop",
    `${this.scrollY}px`
  );
});
const nicknameForm = document.querySelector(".nickname-form");
const winnersWruper = document.querySelector(".winners-wruper");
nicknameForm == null ? void 0 : nicknameForm.addEventListener("submit", getNames);
function getNames(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const formDataObject = {
    player1: "",
    player2: ""
  };
  formData.forEach((value, key) => {
    var _a;
    if (typeof value === "string") {
      if (value.trim() === "") {
        formDataObject[key] = ((_a = this.elements[key]) == null ? void 0 : _a.getAttribute("name")) || "";
      } else {
        formDataObject[key] = value.trim();
      }
    } else if (value instanceof File) {
      formDataObject[key] = value.name;
    }
  });
  createElement(formDataObject);
  hideForm();
}
function createElement({ player1, player2 }) {
  const users = [
    { name: player1, id: "user-1" },
    { name: player2, id: "user-2" }
  ];
  users.forEach(({ name, id }) => {
    const parentSpan = document.createElement("span");
    parentSpan.className = "winners-count-item";
    parentSpan.textContent = `${name}: `;
    const childSpan = document.createElement("span");
    childSpan.id = id;
    childSpan.textContent = `0`;
    parentSpan.appendChild(childSpan);
    winnersWruper == null ? void 0 : winnersWruper.appendChild(parentSpan);
  });
}
function hideForm() {
  if (nicknameForm) {
    nicknameForm.style.opacity = "0";
  }
}
const footer = document.querySelector(".footer");
const startGameBtn = document.querySelector(".nickname-btn");
function scrollToFooter() {
  document.body.classList.remove("no-scroll");
  const playingField2 = document.querySelector(".playing-field");
  if (playingField2) {
    playingField2.style.transition = "opacity 5s ease";
    playingField2.style.opacity = "1";
  }
  if (footer) {
    const targetY = footer.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 3e3;
    const startTime = performance.now();
    requestAnimationFrame((timestamp) => {
      scrollStep(timestamp, startY, distance, duration, startTime);
    });
  }
}
function scrollStep(timestamp, startY, distance, duration, startTime) {
  const currentTime = timestamp - startTime;
  const progress = Math.min(currentTime / duration, 1);
  window.scrollTo(0, startY + distance * progress);
  if (currentTime < duration) {
    requestAnimationFrame((newTimestamp) => {
      scrollStep(newTimestamp, startY, distance, duration, startTime);
    });
  } else {
    document.body.classList.add("no-scroll");
  }
}
startGameBtn == null ? void 0 : startGameBtn.addEventListener("click", scrollToFooter);
const playingField = document.querySelector(".playing-field");
const arr = Array(9).fill(0);
let step = 1;
const fragment = document.createDocumentFragment();
arr.forEach((_, index) => {
  const cell = document.createElement("div");
  cell.className = "playing-field-item";
  cell.dataset.n = index.toString();
  fragment.appendChild(cell);
});
if (playingField !== null) {
  playingField.appendChild(fragment);
}
function click(e) {
  const target = e.target;
  if (!target)
    return;
  const n = target.dataset.n;
  if (!n || arr[parseInt(n)] !== 0)
    return;
  arr[parseInt(n)] = step;
  render();
  checkWinner(step);
  step = step === 1 ? 2 : 1;
}
const cells = document.querySelectorAll(
  ".playing-field-item"
);
function render() {
  cells.forEach((cell, i) => {
    switch (arr[i]) {
      case 1:
        cell.textContent = "X";
        break;
      case 2:
        cell.textContent = "O";
        break;
      default:
        cell.textContent = "";
        break;
    }
  });
}
function checkWinner(step2) {
  const winnerArr = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246"
  ];
  const indexStep = [];
  arr.forEach((item, i) => {
    if (item === step2)
      indexStep.push(i);
  });
  for (const winPattern of winnerArr) {
    const winIndexes = winPattern.split("").map(Number);
    if (winIndexes.every((index) => indexStep.includes(index))) {
      showWin(step2);
      if (winIndexes.length > 0) {
        const winSet = new Set(winIndexes);
        cells.forEach((cell, index) => {
          if (winSet.has(index)) {
            cell.classList.add("winner");
          } else {
            cell.classList.add("not-winner");
          }
        });
      }
      return;
    }
  }
  if (!arr.includes(0))
    showDraw();
}
let counterUser1 = 0;
let counterUser2 = 0;
function showWin(step2) {
  if (step2 === 1) {
    counterUser1++;
    const user1 = document.getElementById("user-1");
    if (user1) {
      user1.textContent = `${counterUser1}`;
    }
  } else {
    counterUser2++;
    const user2 = document.getElementById("user-2");
    if (user2) {
      user2.textContent = `${counterUser2}`;
    }
  }
  playingField == null ? void 0 : playingField.removeEventListener("click", click);
}
function showDraw() {
  playingField == null ? void 0 : playingField.removeEventListener("click", click);
}
playingField == null ? void 0 : playingField.addEventListener("click", click);
const winnersCountBtn = document.querySelector(".winners-count-btn");
if (winnersCountBtn) {
  winnersCountBtn.addEventListener("click", () => {
    arr.fill(0);
    step = 1;
    cells.forEach((el) => {
      el.textContent = "";
      el.classList.remove("winner");
      el.classList.remove("not-winner");
    });
    playingField == null ? void 0 : playingField.addEventListener("click", click);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const position = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollTop");
    const scrollTop = parseFloat(position.replace("px", ""));
    if (!isNaN(scrollTop)) {
      window.scrollTo(scrollTop, 0);
    }
  }, 800);
});
