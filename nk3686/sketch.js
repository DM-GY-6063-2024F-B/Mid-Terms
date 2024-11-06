let sunY;
let simbaStage = 0;
let targetStage = 0;
let transitionAlpha = 0; // Alpha for smooth transition
let stars = [];
let ripples = [];
let bgImage;
let cubImage, youngImage, kingImage;

function preload() {
  bgImage = loadImage("background.jpg");
  youngImage = loadImage("young.png");
  cubImage = loadImage("cub.png"); 
  kingImage = loadImage("adult.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sunY = (height / 2) - 150;
  
  for (let i = 0; i < 100; i++) {  
    let star = {
      x: random(width),
      y: random(height / 4), 
      size: random(1, 3),
      brightness: random(150, 255)
    };
    stars.push(star);
  }
}

function draw() {
  background(bgImage);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(star.brightness);
    ellipse(star.x, star.y, star.size);
    
    star.brightness += random(-5, 5);
    star.brightness = constrain(star.brightness, 150, 255);
  }

  drawSun();
  
  smoothSimbaTransition();

  for (let i = ripples.length - 1; i >= 0; i--) {
    drawRipple(ripples[i]);
    if (ripples[i].alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function drawSun() {
  fill(255, 150, 0);
  noStroke();
  ellipse((width / 4) - 25, sunY, 100, 100);  
  
  if (sunY > 0) {
    sunY -= 0.2;
  } else {
    sunY = (height / 2) - 150; 
  }
}

function smoothSimbaTransition() {
  push();
  translate(width / 2, height - 150); 
  
  // Smoothly transition alpha
  if (simbaStage !== targetStage) {
    transitionAlpha += 10; // Speed of transition
    if (transitionAlpha >= 255) {
      simbaStage = targetStage; 
      transitionAlpha = 0; // Reset for next transition
    }
  }

  // Draw the current stage with decreasing alpha
  tint(255, 255 - transitionAlpha);
  drawSimbaStage(simbaStage);

  // Draw the next stage with increasing alpha
  if (simbaStage !== targetStage) {
    tint(255, transitionAlpha);
    drawSimbaStage(targetStage);
  }

  pop();
}

function drawSimbaStage(stage) {
  if (stage === 0) {
    image(cubImage, -100, -100, 250, 250);
  } else if (stage === 1) {
    image(youngImage, -100, -100, 250, 250);
  } else if (stage === 2) {
    image(kingImage, -100, -150, 300, 300);
  }
}

function drawRipple(ripple) {
  noFill();
  stroke(255, ripple.alpha);
  ellipse(ripple.x, ripple.y, ripple.radius * 2);
  ripple.radius += 1.5;  // Expand radius
  ripple.alpha -= 3;     // Fade out
}

// Mouse interaction to create ripple effects
function mousePressed() {
  let ripple = {
    x: mouseX,
    y: mouseY,
    radius: 10,
    alpha: 200
  };
  ripples.push(ripple);
}

// Keyboard interaction to change Simba's stage
function keyPressed() {
  if (key === '1') {
    targetStage = 1;
  } else if (key === '2') {
    targetStage = 2;
  } else {
    targetStage = 0;  // Default to cub stage
  }
}
