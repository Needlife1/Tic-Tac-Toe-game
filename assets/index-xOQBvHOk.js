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
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`;
});
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
function render() {
  const cells = document.querySelectorAll(
    ".playing-field-item"
  );
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
      return;
    }
  }
  if (!arr.includes(0))
    showDraw();
}
function showWin(step2) {
  console.log(`Победил ${step2 === 1 ? "X" : "O"}`);
  playingField == null ? void 0 : playingField.removeEventListener("click", click);
}
function showDraw() {
  console.log("Ничья");
  playingField == null ? void 0 : playingField.removeEventListener("click", click);
}
playingField == null ? void 0 : playingField.addEventListener("click", click);
const winnersCountBtn = document.querySelector(".winners-count-btn");
if (winnersCountBtn) {
  winnersCountBtn.addEventListener("click", () => {
    location.reload();
  });
}
