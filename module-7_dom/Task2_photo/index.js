class ImageCollection {
  constructor() {
    this.imageArray = [
      'url("https://www.nawpic.com/media/2020/desktop-backgrounds-nawpic-25.jpg")',
      'url("https://www.wallpapertip.com/wmimgs/250-2508428_ultra-hd-nature-wallpapers.jpg")',
      'url("https://cdn.wallpapersafari.com/77/54/oX0CPD.jpg")',
    ];
    this.currentImage = null;
  }

  add(url) {
    this.imageArray.push(`url("${url}")`);
  }

  delete(url) {
    this.imageArray = this.imageArray.filter((el) => el !== url);
  }

  togglePicture(number = 1) {
    if (!this.currentImage) {
      this.currentImage = this.imageArray[0];
      return this.currentImage;
    }

    let next = this.imageArray.indexOf(this.currentImage) + number;

    if (next > this.imageArray.length - 1) {
      next = 0;
    }
    if (next < 0) {
      next = this.imageArray.length - 1;
    }

    this.currentImage = this.imageArray[next];
    return this.currentImage;
  }
}

const currentCollection = new ImageCollection();

let showNextPicAfterDelay = null;

const addTimerInput = document.getElementById("add_timer");
addTimerInput.value = 3;

const imageContainer = document.getElementById("slideshow_container");
imageContainer.addEventListener("dblclick", deleteCurrentIamge);

function addImage() {
  let newImageUrl = document.getElementById("add_url").value;
  currentCollection.add(newImageUrl);
  document.getElementById("add_url").value = "";
}

function deleteCurrentIamge() {
  const result = window.confirm("Do you really want to delete this picture?");
  if (result) {
    currentCollection.delete(this.style.backgroundImage);
    plusSlides(0);
  }
}

function plusSlides(number) {
  imageContainer.style.backgroundImage =
    currentCollection.togglePicture(number);
  resetTimeout();
}

function resetTimeout() {
  if (showNextPicAfterDelay) {
    clearInterval(showNextPicAfterDelay);
  }

  timeout = addTimerInput.value * 1000;
  showNextPicAfterDelay = setInterval(plusSlides, timeout);
}

plusSlides();
resetTimeout();
