let albumCoverImg; // Full album cover image
let centerImages = []; // Array to hold the center images
let imgWidth, imgHeight;
let fadeSpeed = 1.25; // Speed of the fading effect
let currentImageIndex = 0; // Index to track the current image
let nextImageIndex = 1; // Index for the next image
let alphaValue = 255; // Alpha value for crossfade effect

function preload() {
  albumCoverImg = loadImage("AlbumCover.png"); // Load the full album cover

  
  for (let i = 1; i <= 10; i++) {
    centerImages.push(loadImage(`Image${i}.png`)); // Load Image1.png to Image10.png
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgWidth = width * 0.7; 
  imgHeight = albumCoverImg.height * (imgWidth / albumCoverImg.width); 
  imageMode(CENTER);
}

function draw() {
  background(255); 
  image(albumCoverImg, width / 2, height / 2, imgWidth, imgHeight);  

  // Call the custom function to handle image transitions
  crossfadeImages();

  // Gradually decrease the alpha value
  alphaValue -= fadeSpeed;
  if (alphaValue <= 0) {
    alphaValue = 255; 
    currentImageIndex = nextImageIndex; 
    nextImageIndex = (nextImageIndex + 1) % centerImages.length; 
  }
}

// Custom function to handle crossfade transitions
function crossfadeImages() {
  // Crossfade between the current and next images
  push();
  tint(255, alphaValue); 
  image(centerImages[currentImageIndex], width / 2, height / 2, imgWidth / 2.5, imgHeight / 2.5);
  pop();

  push();
  tint(255, 255 - alphaValue); 
  image(centerImages[nextImageIndex], width / 2, height / 2, imgWidth / 2.5, imgHeight / 2.5);
  pop();
}

// Keyboard interactivity
function keyPressed() {
  if (key === 'N' || key === 'n') {
    alphaValue = 0; // Skip to the next image
  }
  if (key === 'S' || key === 's') {
    fadeSpeed = max(fadeSpeed - 0.25, 0.5); // Slow down fade speed
  }
  if (key === 'F' || key === 'f') {
    fadeSpeed = min(fadeSpeed + 0.25, 5); // Speed up fade speed
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  imgWidth = width * 0.7;
  imgHeight = albumCoverImg.height * (imgWidth / albumCoverImg.width);
}
