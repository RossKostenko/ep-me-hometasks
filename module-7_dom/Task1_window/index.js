const heightElement = document.getElementById("height");
const widthElement = document.getElementById("width");

function getWindowSize() {
  heightElement.innerText = window.innerHeight;
  widthElement.innerText = window.innerWidth;
}

function throttle(callback, time) {
  return function () {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall === undefined || this.lastCall - previousCall > time) {
      callback();
    }
  };
}

let insertData = throttle(getWindowSize, 500);
