let backgroundImg, snitchBodyImg, snitchWingImg;
let snitchX, snitchY;
let targetX, targetY;
let wingOffset = 0;
let wingDirection = 1;
let health = 100;  // 血条start
let healthDecay = 0.9;  // - blood
let moveSpeed = 0.2; 

function preload() {
  backgroundImg = loadImage('background.png');
  snitchBodyImg = loadImage('snitch_body.png');
  snitchWingImg = loadImage('snitch_wing.png');
}

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  snitchX = width / 2;
  snitchY = height / 2;
  targetX = snitchX;
  targetY = snitchY;
}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  
  displayHealthBar();

  // snitch move
  snitchX = lerp(snitchX, targetX, moveSpeed);
  snitchY = lerp(snitchY, targetY, moveSpeed);

  displaySnitch();

  // - blood bar
  if (health <= 0) {
    noLoop();  
    
    textSize(32);
    fill(196, 60, 51);
    text('Game Over!', width / 2 - 80, height / 2);

    textSize(20);
    fill(196, 60, 51);
    text('Refresh the page to restart', width / 2 -120, height / 2+50);
  }
}

function displayHealthBar() {
  fill(212, 107, 102);
  rect(windowWidth / 2, 40, health * 10, 20,50);  

  // - blood
  health -= healthDecay;
  if (health < 0) health = 0;
}

function displaySnitch() {
  // wings shaking
  wingOffset += wingDirection * 7;
  if (wingOffset > 3 || wingOffset < -3) {
    wingDirection *= -1;
  }

  // body+wings
  image(snitchWingImg, snitchX - 90, snitchY + wingOffset, 180, 30);
  image(snitchBodyImg, snitchX - 20, snitchY, 40, 40);
}

function mousePressed() {
  // click snitch
  if (dist(mouseX, mouseY, snitchX, snitchY) < 30) {  // body only
    // restart bloodbar
    health = 100;

    // new position
    targetX = random(width);
    targetY = random(height);
  }
}
