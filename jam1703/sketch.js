let rows = 4; // total number of waves
let waveMaxHeight = 150;
let time = 0; // starting time for waves
let initialWaveHeight = waveMaxHeight; // store the initial wave height

let swellStart = 0; // starting time for swell
let swell = false;

let smallSwellStart = 0; // starting time for small swells
let smallSwell = false;
let smallSwellHeight = 0.75; // height of smaller swell
let smallSwellDuration = 4000;

let birdX;
let birdY;

function preload() {
  bird = loadImage("./images/albatross.png");
  collage = loadImage("./images/collage.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  birdX = width; // starting bird on right side of canvas
}

function drawWave(n, rows) {
  // drawing one wave
  let waveY = height - (n * waveMaxHeight) / 4;
  let t = time + n * 100;
  let waveX = 0;

  colorMode(HSB);
  let hue = map(n, 0, rows, 180, 240);
  fill(hue, 100, 50);
  noStroke();

  beginShape();
  vertex(waveX, waveY);
  for (let x = waveX; x <= width; x += 10) {
    let y = waveY - map(noise(t), 0, 1, 10, waveMaxHeight);
    vertex(x, y);
    t += 0.01;
  }
  vertex(width, waveY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

//drawing multiple waves
function drawWaves(n) {
  for (let idx = n; idx >= 0; idx--) {
    drawWave(idx, n);
  }
  time += 0.005;
}

function mouseClicked() {
  // if (!smallSwell) {
    // big swell only when small swell is not happening
    swellStart = millis();
    swell = true;
  }
// }

// rendering small swells
function drawSmallSwells() {
  if (millis() - smallSwellStart > smallSwellDuration) {
    smallSwellStart = millis();
    smallSwell = true;
  }

  if (smallSwell) {
    waveMaxHeight += smallSwellHeight; // Increase wave height for small swell
    setTimeout(() => {
      waveMaxHeight -= smallSwellHeight; // Decrease wave height after a small swell
      smallSwell = false; // Reset small swell status
    }, 1000); // Duration for the small swell
  }
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(collage, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  drawWaves(rows);

  //small regular swells
  drawSmallSwells();

  // albatross to fly across the screen
  birdX -= 2;
  birdY = height / 3 + 50 * sin(0.05 * frameCount);
  if (birdX < -150) {
    birdX = width;
    birdY = random(100, 150);
  }

  image(bird, birdX, birdY, 100, 100);

  // finish swell click interaction!!!
  if (swell) {
    let swellDuration = millis() - swellStart;
    if (swellDuration < 2000) {
      waveMaxHeight = map(swellDuration, 0, 2000, initialWaveHeight, 350);
    } else if (swellDuration < 4000) {
      waveMaxHeight = map(swellDuration - 2000, 0, 2000, 350, 150);
    } else {
      swell = false;
      waveMaxHeight = 150;
    }
  }
}
