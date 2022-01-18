const heightElement = document.getElementById("height");
const widthElement = document.getElementById("width");

function getWindowSize() {
  heightElement.innerText = window.innerHeight;
  widthElement.innerText = window.innerWidth;
}
