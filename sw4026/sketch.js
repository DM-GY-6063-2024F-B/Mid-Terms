let font, img;
let imgState = false;
let imgX, imgY;
let imgAlpha = 0;
let snowX = [];
let snowY = [];
let snowSize = [];
let snowAlpha = [];
let snowSpeed = [];

function preload() {
  img = loadImage("girl.png");
  font = loadFont("C023-邯郸(唐)欧阳询千字文.otf");
}

function setup() {
  createCanvas(600, windowHeight);
  textFont(font);
  angleMode(DEGREES);

  //snow
  for (let i = 0; i < 100; i++) {
    snowX[i] = random(width);
    snowY[i] = random(height);
    snowSize[i] = int(random(5, 8));
    snowAlpha[i] = random(100, 230);
    snowSpeed[i] = random(1, 3);
  }
}

function draw() {
  background(0);

  //circle
  fill(183, 88, 72);
  ellipse(width / 2, height / 2, 580);

  //girl silhoutte
  imageMode(CENTER);

  if (imgState) {
    tint(255, imgAlpha);
    image(img, width / 2 + 50, height / 2 + 80, 450, 600);
    if (imgAlpha > 0) {
      imgAlpha -= 0.8;
    }
  }

  //building
  building();

  //title
  textSize(140);
  textAlign(CENTER, CENTER);
  fill(144, 174, 193);
  noStroke();
  text("寻找无双", width / 2 - 10, 100);

  //snow

  noStroke();

  for (let i = 0; i < 100; i++) {
    fill(255, snowAlpha[i]);
    ellipse(snowX[i], snowY[i], snowSize[i]);
    snowY[i] += snowSpeed[i];
    if (snowY[i] > height) {
      snowY[i] = 0;
    }
  }
}

function building() {
  fill(94, 98, 99);
  strokeWeight(3);
  stroke(180);

  //roof
  fill(144, 174, 193);
  quad(0, 260, 130, 260, 200, 350, 0, 350);
  quad(0, 400, 150, 400, 250, 500, 0, 500);

  //body

  fill(255, 254, 239, 220);
  rect(0, 350, 150, 50);

  fill(255, 254, 239, 220);
  rect(0, 500, 200, 300);

  //window line/pillar

  // strokeWeight(10);
  fill(183, 88, 72);

  stroke(183, 88, 72, 250);

  noStroke();
  rect(146, 350, 8, 50);

  for (let x = -2; x < 230; x += 65) {
    rect(x, 502, 8, height - 5);
  }

  rect(3, 600, 195, 6);

  //roof lines

  strokeWeight(6);
  fill(59, 84, 99);
  stroke(180, 150);
  for (let x = -10; x < 135; x += 13) {
    line(x, 262, x / 0.7, 353);
  }
  for (let x = -10; x < 150; x += 13) {
    line(x, 403, x / 0.6, 503);
  }
}

function mousePressed() {
  if (random(10) < 4) {
    imgState = true;
    // imgX=random(width)
    // imgY=random(height)
    // let rad = random(240);
    // let angle = random(360);
    // imgX = cos(angle) * rad + width/2;
    // imgY = sin(angle) * rad + height/2;
    imgAlpha = 255;
  }
}
