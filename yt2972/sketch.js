let eyeOpen = true;
let eyeColor;
let r = 100;
let g = 150;
let b = 200;
let rSpeed = 0.5;
let gSpeed = 0.3;
let bSpeed = 0.4;
let eyeballs = []; // array for eyeballs left behind

function setup() {
  createCanvas(windowWidth, windowHeight);
  eyeColor = color(random(100, 255), random(100, 255), random(100, 255)); // initial eye color
}

function draw() {
  // update BgColor
  r += rSpeed;
  g += gSpeed;
  b += bSpeed;
  if (r > 235 || r < 0) rSpeed *= -1;
  if (g > 205 || g < 0) gSpeed *= -1;
  if (b > 255 || b < 0) bSpeed *= -1;
  background(r, g, b);

  // draw eyeballs left behind
  for (let pos of eyeballs) {
    drawEyeball(pos.x, pos.y);
  }

  drawFace();
//blinking eye 
  if (eyeOpen) {
    drawEye();
  }
}

function drawFace() {
  
  // head (oval face shape)
  fill(255);
  noStroke();
  ellipse(width / 2, height / 2, 450, 600);

  // nose
  push();
  translate(width / 2, height / 2);
  fill(0);
  noStroke();
  triangle(-30, 35, 10, -90, 46, 35);
  pop();

  // mouth
  push();
  translate(width / 2, height / 2);
  fill(255, 0, 0); // color of lips
  noStroke();
  ellipse(-35, 140, 140, 190); // left lip
  ellipse(50, 140, 140, 190);  // right lip
  ellipse(10, 230, 160, 100);  // bottom lip
  pop();

  // eyebrows
  stroke(0);
  strokeWeight(1);
  fill(0);
  arc(width / 2 - 150, height / 2 - 150, 230, 60, PI, TWO_PI);
  arc(width / 2 + 150, height / 2 - 150, 230, 60, PI, TWO_PI);

  // cheeks
  fill(255, 182, 193);
  noStroke();
  ellipse(width / 2 - 120, height / 2 + 10, 100, 100); // left cheek
  ellipse(width / 2 + 130, height / 2 + 10, 100, 100); // right cheek
  // eyelashes
  stroke(0);
  strokeWeight(5);
  noFill();
  
  // left eyelashes
  push();
  translate(width / 2 - 150, height / 2 - 150);
  line(50, 30, 55, 65); // Le 1
  line(10, 40, 25, 65); // Le 2
  line(90, 40, 80, 75); // Le 3
  pop();
  
  // right eyelashes
  push();
  translate(width / 2 + 50, height / 2 - 150);
  line(50, 30, 55, 65); // re 1
  line(10, 40, 25, 65); // re 2
  line(90, 40, 80, 75); // re 3
  pop();

}

function drawEye() {
  push();
  // white part of eye 
  fill(255);
  ellipse(width / 2 + 10, height / 2 + 160, 160, 100);

  // iris
  fill(eyeColor);
  ellipse(width / 2 + 10, height / 2 + 160, 80, 100);

  // draw pupil
  fill(0);
  ellipse(width / 2 + 10, height / 2 + 160, 30, 30);
  pop();
}

function drawEyeball(x, y) {
  push();
  translate(x, y);

 // white part of eye 
  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(0, 0, 50, 30);

  // iris
  fill(eyeColor);
  noStroke();
  ellipse(0, 0, 20, 20);

  // pupil
  fill(0);
  ellipse(0, 0, 8, 8);

  pop();
}

// blinking and color change interaction
function mousePressed() {
  eyeOpen = !eyeOpen; //eye open/close
  eyeColor = color(random(100, 255), random(100, 255), random(100, 255)); // random eye color change
}

// store mouse positions to leave eyeballs behind
function mouseDragged() {
  eyeballs.push({ x: mouseX, y: mouseY });
}