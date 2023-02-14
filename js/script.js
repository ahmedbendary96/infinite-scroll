'use strict';
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const apiKey = 'CHUyNCkL-DMOe6b_uYYmy5U3CzXYBZlPPXyngQbikFE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);

    if (!photo.alt_description) {
      img.setAttribute('alt', 'No caption for this image');
      img.setAttribute('title', 'No caption for this image');
    } else {
      img.setAttribute('alt', photo.alt_description);
      img.setAttribute('title', photo.alt_description);
    }

    img.addEventListener('load', imageLoaded);

    imageContainer.appendChild(item);
    item.appendChild(img);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch {
    // Catch Error Here
  }
}

window.addEventListener('scroll', function () {
  if (
    this.innerHeight + this.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
