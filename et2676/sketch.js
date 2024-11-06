let slowSec = 0;
let circleD = {r: 100, L1: 200, L2: 300, L3: 350, L4: 400};
let mImg = [];
let mImgBG;
let spacing = 1.1;
let detailAngle = 0;
let rotationSpeed = 1;

function preload() {
  mImg[0] = loadImage("./assets/Reality_Texture.gif");
  mImg[1] = loadImage("./assets/Layer1_Texture.gif");
  mImg[2] = loadImage("./assets/Layer2_Texture.gif");
  mImg[3] = loadImage("./assets/Layer3_Texture.gif");
  mImg[4] = loadImage("./assets/Layer4_Texture.gif");
  mImgBG = loadImage("./assets/Background_Texture.gif");
}

function detailCircle(x, y, diameter, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(150);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, diameter);
  pop();
}

let maskImg0, maskImg1, maskImg2, maskImg3, maskImg4;
let img0WithMask, img1WithMask, img2WithMask, img3WithMask, img4WithMask;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);

  // circle mask (create)
  maskImg4 = createGraphics(circleD.L4, circleD.L4); // load mask off-screen (buffer)
  maskImg4.ellipse(circleD.L4 / 2, circleD.L4 / 2, circleD.L4); // draw a circle in the buffer
  maskImg4.loadPixels(); // loading mask graphic 
  // prep Gif image
  img4WithMask = createImage(circleD.L4, circleD.L4); // vessel for holding masked image
  
  // circle mask (create)
  maskImg3 = createGraphics(circleD.L3, circleD.L3);
  maskImg3.ellipse(circleD.L3 / 2, circleD.L3 / 2, circleD.L3);
  maskImg3.loadPixels();
  // prep Gif image
  img3WithMask = createImage(circleD.L3, circleD.L3);
  
  // circle mask (create)
  maskImg2 = createGraphics(circleD.L2, circleD.L2);
  maskImg2.ellipse(circleD.L2 / 2, circleD.L2 / 2, circleD.L2);
  maskImg2.loadPixels();
  // prep Gif image
  img2WithMask = createImage(circleD.L2, circleD.L2);

  // circle mask (create)
  maskImg1 = createGraphics(circleD.L1, circleD.L1);
  maskImg1.ellipse(circleD.L1 / 2, circleD.L1 / 2, circleD.L1);
  maskImg1.loadPixels();
  // prep Gif image
  img1WithMask = createImage(circleD.L1, circleD.L1);

  // circle mask (create)
  maskImg0 = createGraphics(circleD.r, circleD.r);
  maskImg0.ellipse(circleD.r / 2, circleD.r / 2, circleD.r);
  maskImg0.loadPixels();
  // prep Gif image
  img0WithMask = createImage(circleD.r, circleD.r);

  mImgBG.resize(width, height);
}

function draw() {
  background(220);
  image(mImgBG, 0, 0, width, height);
  image(mImg[0], -width, 0);  // hide graphics
  image(mImg[1], -width, 0);
  image(mImg[2], -width, 0);
  image(mImg[3], -width, 0);
  image(mImg[4], -width, 0);

  // current time and date data (real-time)
  let now = new Date();
  let sec = now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 3600; // total seconds since midnight

  // clock timings
  let realSec = sec;
  let slowSec1 = sec / 12; // 12x slower
  let slowSec2 = sec / 144; // 144x slower
  let slowSec3 = sec / 1728; // 1728x slower
  let slowSec4 = sec / 20736; // 20736x slower


////////////


// looping details in bg

  detailAngle += rotationSpeed;
  let mwBGx = map(mouseX, 0, width, width / 6, width / 5);
  let mwBGr = map(mouseX, 0, width, -80, -200);

  //detail circles
  push();
  blendMode(HARD_LIGHT);
  translate(width / 6, height / 2); 
  rotate(mwBGr);
  for (let d = 10; d < width * 2; d *= spacing) {
    noFill();
    drawingContext.setLineDash([10, 5, 20, 8, 5, 15]);
    detailCircle(mwBGx, 0, d, detailAngle);
  }
  pop();


/////


// LAYER 4 CIRCLE
 
 push();
 let mw4 = map(mouseX, 0, width, width - width / 4, width / 4);
 pop();
 
 //// drawing circle
 img4WithMask.copy(mImg[4], 0, 0, mImg[4].width, mImg[4].height, 0, 0, circleD.L4, circleD.L4);
 img4WithMask.mask(maskImg4); // apply the mask to the gif

 // circle mask (draw)
 push();
 translate(mw4, height / 2);
 image(img4WithMask, -circleD.L4 / 2, -circleD.L4 / 2); // center the gif
 pop();
 
 //// drawing time display
 
 // layer 4 time
 let hours4 = floor(slowSec4 / 3600) % 24;
 let minutes4 = floor(slowSec4 / 60) % 60; 
 let seconds4 = floor(slowSec4) % 60;
 
 // layer 4 AM/PM trigger
 let ampm4;
 
 if (hours4 >= 12) {
   ampm4 = "pm";
 } else {
   ampm4 = "am";
 }
 
 // layer 4 hour reset trigger
 hours4 = hours4 % 12;
 
 if (hours4 === 0) {
   hours4 = 12;
 } else {
   // change nothing
 }
 
 // layer 4 time display format hh:mm:ss (AM/PM)
 let timeDisplay4 =
   nf(hours4, 2) + ":" + nf(minutes4, 2) + ":" + nf(seconds4, 2) + " " + ampm4;
 
 // layer 4 time display (on screen)
 push();
 fill(200);
 textFont('Courier New');
 textSize(16);
 let tmw4 = map(mouseX, 0, width, width - width / 4, width / 4);
 text('Limbo', tmw4, 610);
 text(timeDisplay4, tmw4, 635);
 pop();
 
 // layer 4 drawing line
 push();
 translate(mw4, height / 2);
 stroke(200);
 line(0, 0, 0, 230);
 pop();

/////


// LAYER 3 CIRCLE
 
 push();
 let mw3 = map(mouseX, 0, width, width - width / 2.2, width / 2.2);
 pop();
 
 //// drawing circle
 img3WithMask.copy(mImg[3], 0, 0, mImg[3].width, mImg[3].height, 0, 0, circleD.L3, circleD.L3);
 img3WithMask.mask(maskImg3);

 // circle mask (draw)
 push();
 translate(mw3, height / 2);
 image(img3WithMask, -circleD.L3 / 2, -circleD.L3 / 2);
 pop();
 
 ////drawing time display
 
 // layer 3 time
 let hours3 = floor(slowSec3 / 3600) % 24;
 let minutes3 = floor(slowSec3 / 60) % 60; 
 let seconds3 = floor(slowSec3) % 60;
 
 // layer 3 AM/PM trigger
 let ampm3;
 
 if (hours3 >= 12) {
   ampm3 = "pm";
 } else {
   ampm3 = "am";
 }
 
 // layer 3 hour reset trigger
 hours3 = hours3 % 12;
 
 if (hours3 === 0) {
   hours3 = 12;
 } else {
   // change nothing
 }
 
 // layer 3 time display format hh:mm:ss (AM/PM)
 let timeDisplay3 =
   nf(hours3, 2) + ":" + nf(minutes3, 2) + ":" + nf(seconds3, 2) + " " + ampm3;
 
 // layer 3 time display (on screen)
 push();
 fill(200);
 textFont('Courier New');
 textSize(16);
 let tmw3 = map(mouseX, 0, width, width - width / 2.2, width / 2.2);
 text('Layer 3', tmw3, 95);
 text(timeDisplay3, tmw3, 70);
 pop();
 
 ////drawing line
 push();
 translate(mw3, height / 2);
 stroke(200);
 line(0, 0, 0, -230);
 pop();

/////


// LAYER 2 CIRCLE
 
 push();
 let mw2 = map(mouseX, 0, width, width / 2.8, width - width / 2.8);
 pop();
 
 //// drawing circle
 img2WithMask.copy(mImg[2], 0, 0, mImg[2].width, mImg[2].height, 0, 0, circleD.L2, circleD.L2);
 img2WithMask.mask(maskImg2);

 // circle mask (draw)
 push();
 translate(mw2, height / 2);
 image(img2WithMask, -circleD.L2 / 2, -circleD.L2 / 2);
 pop();
 
 ////drawing time display
 
 // layer 2 time
 let hours2 = floor(slowSec2 / 3600) % 24;
 let minutes2 = floor(slowSec2 / 60) % 60; 
 let seconds2 = floor(slowSec2) % 60;
 
 // layer 2 AM/PM trigger
 let ampm2;
 
 if (hours2 >= 12) {
   ampm2 = "pm";
 } else {
   ampm2 = "am";
 }
 
 // layer 2 hour reset trigger
 hours2 = hours2 % 12;
 
 if (hours2 === 0) {
   hours2 = 12;
 } else {
   // change nothing
 }
 
 // layer 2 time display format hh:mm:ss (AM/PM)
 let timeDisplay2 =
   nf(hours2, 2) + ":" + nf(minutes2, 2) + ":" + nf(seconds2, 2) + " " + ampm2;
 
 // layer 2 time display (on screen)
 fill(200);
 textFont('Courier New');
 textSize(16);
 let tmw2 = map(mouseX, 0, width, width / 2.8, width - width / 2.8);
 text('Layer 2', tmw2, 550);
 text(timeDisplay2, tmw2, 575);
 
 // layer 2 drawing line
 push();
 translate(mw2, height / 2);
 stroke(200);
 line(0, 0, 0, 180);
 pop();

/////

  
// LAYER 1 CIRCLE

  push();
  let mw1 = map(mouseX, 0, width, width / 4.8, width - width / 4.8);
  pop();

 //// drawing circle 
 img1WithMask.copy(mImg[1], 0, 0, mImg[1].width, mImg[1].height, 0, 0, circleD.L1, circleD.L1);
 img1WithMask.mask(maskImg1);

 // circle mask (draw)
 push();
 translate(mw1, height / 2);
 image(img1WithMask, -circleD.L1 / 2, -circleD.L1 / 2);
 pop();
 
 //// drawing time display
 
 // layer 1 time
 let hours1 = floor(slowSec1 / 3600) % 24;
 let minutes1 = floor(slowSec1 / 60) % 60; 
 let seconds1 = floor(slowSec1) % 60;
 
 // layer 1 AM/PM trigger
 let ampm1;
 
 if (hours1 >= 12) {
   ampm1 = "pm";
 } else {
   ampm1 = "am";
 }
 
 // layer 1 hour reset trigger
 hours1 = hours1 % 12;
 
 if (hours1 === 0) {
   hours1 = 12;
 } else {
   // change nothing
 }
 
 // layer 1 time display format hh:mm:ss (AM/PM)
 let timeDisplay1 =
   nf(hours1, 2) + ":" + nf(minutes1, 2) + ":" + nf(seconds1, 2) + " " + ampm1;
 
 // layer 1 time display (on screen)
 fill(200);
 textFont('Courier New');
 textSize(16);
 let tmw1 = map(mouseX, 0, width, width / 4.8, width - width / 4.8);
 text('Layer 1', tmw1, 195);
 text(timeDisplay1, tmw1, 170);
 
 // layer 1 drawing line
 push();
 translate(mw1, height / 2);
 stroke(200);
 line(0, 0, 0, -130);
 pop();

/////


// REALITY CIRCLE

  push();
  let mw0 = map(mouseX, 0, width, width / 9, width - width / 9);
  pop();

  //// drawing circle
  img0WithMask.copy(mImg[0], 0, 0, mImg[0].width, mImg[0].height, 0, 0, circleD.r, circleD.r);
  img0WithMask.mask(maskImg0);

  // circle mask (draw)
  push();
  translate(mw0, height / 2);
  image(img0WithMask, -circleD.r / 2, -circleD.r / 2);
  pop();

  //// drawing time display

  // reality time
  let hours0 = floor(realSec / 3600) % 24;
  let minutes0 = floor(realSec / 60) % 60; 
  let seconds0 = floor(realSec) % 60;

  // reality AM/PM trigger
  let ampm0;

  if (hours0 >= 12) {
    ampm0 = "pm";
  } else {
    ampm0 = "am";
  }

  // reality hour reset trigger
  hours0 = hours0 % 12;

  if (hours0 === 0) {
    hours0 = 12;
  } else {
    // change nothing
  }

  // reality time display format hh:mm:ss (AM/PM)
  let timeDisplay0 =
    nf(hours0, 2) + ":" + nf(minutes0, 2) + ":" + nf(seconds0, 2) + " " + ampm0;

  // reality time display (on screen)
  fill(200);
  textFont('Courier New');
  textSize(16);
  let tmw0 = map(mouseX, 0, width, width / 9, width - width / 9);
  text('Reality', tmw0, 450);
  text(timeDisplay0, tmw0, 475);

  ////drawing line
  push();
  translate(mw0, height / 2);
  stroke(200);
  line(0, 0, 0, 80);
  pop();


}

