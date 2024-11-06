let flowers1;
let flowers2;
let grass1;
let grass2;
let dried1;
let dried2;
let hill1mask;
let hill2mask;

let fade;
let appear;

let NUM_OBJS = 100;
let circles = [];
let y;

let daytime;
let deg;

function preload() {
  flowers1 = loadImage("../assets/flowers1.png");
  flowers2 = loadImage("../assets/flowers2.png");
  grass1 = loadImage("../assets/grass1.jpg");
  grass2 = loadImage("../assets/grass2.jpg");
  dried1 = loadImage("../assets/dried1.jpg");
  dried2 = loadImage("../assets/dried2.jpg");
  hill1mask = loadImage("../assets/hill1mask.png");
  hill2mask = loadImage("../assets/hill2mask.png");
}

function cloud(x, y) {
  rect(x, y, 100, 50, 20);
  ellipse(x + 20, y + 25, 50);
  ellipse(x + 30, y, 30);
  ellipse(x + 60, y, 50);
  ellipse(x + 80, y + 20, 50);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  y = random(0, height / 2);

  let a = createA("../trask/", "Go East");
  a.position(width - 150, 50);
  a.style("color", "white");
  a.style("font-size", "20px");
  a.style("font-family", "Georgia");

  flowers2.resize(width, height);
  flowers2.mask(hill2mask);
  flowers1.resize(width, height);
  flowers1.mask(hill1mask);
  grass2.resize(width, height);
  grass2.mask(hill2mask);
  grass1.resize(width, height);
  grass1.mask(hill1mask);
  dried2.resize(width, height);
  dried2.mask(hill2mask);
  dried1.resize(width, height);
  dried1.mask(hill1mask);

  for (let cnt = 0; cnt < NUM_OBJS; cnt++) {
    let aCircle = {
      x: random(width),
      y: random(height),
      d: random(1, 5),
    };
    circles.push(aCircle);
  }
}

function draw() {
  //REAL TIME in CURRENT SECOND
  let h = hour() * 3600;
  let m = minute() * 60;
  let s = second();
  let daytime = h + m + s;

  //SKY GRADIENT
  if (daytime < 18000 || daytime > 72000) {
    //night
    background(0, 23, 54);
    for (let idx = 0; idx < circles.length; idx++) {
      let mCircle = circles[idx];
      fill(255, 255);
      noStroke();
      ellipse(mCircle.x, mCircle.y, mCircle.d);
    }
  } else if (daytime < 21600) {
    //night to day gradient
    let red = map(daytime, 18000, 21600, 0, 141);
    let green = map(daytime, 18000, 21600, 23, 186);
    let blue = map(daytime, 18000, 21600, 54, 237);
    background(red, green, blue);
  } else if (daytime > 68400) {
    //day to night gradient
    let red = map(daytime, 68400, 72000, 141, 0);
    let green = map(daytime, 68400, 72000, 186, 23);
    let blue = map(daytime, 68400, 72000, 237, 54);
    background(red, green, blue);
  } else {
    //day
    background(141, 186, 237);
  }

  //SUN ANIMATION
  deg = map(daytime, 21600, 72000, 180, 360);
  let rad = sin(deg) * 8 + width / 1.8;
  let xpos = rad * cos(deg);
  let ypos = rad * sin(deg);

  push();
  translate(width / 2, height * 1.25);
  fill(255, 199, 0);
  ellipse(xpos, ypos, 100);
  pop();

  if (daytime < 21600 || daytime > 72000) {
    xpos = 0;
    ypos = 0;
  }

  //CLOUDS
  let x = frameCount / 10;
  fill(255);
  noStroke();
  cloud(x % (width + 500), y);

  //HILL TRANSITIONS
  let hillcount = millis() % 3600000;
  print(hillcount);

  if (hillcount < 900000) {
    //full bloom
    image(flowers2, 0, 0);
    image(flowers1, 0, 0);
  } else if (hillcount < 1200000) {
    //bloom to grass transition
    fade = map(hillcount, 900000, 1200000, 255, 0);
    tint(255, fade);
    image(flowers2, 0, 0);
    image(flowers1, 0, 0);

    appear = map(hillcount, 900000, 1200000, 0, 255);
    tint(255, appear);
    image(grass2, 0, 0);
    image(grass1, 0, 0);
  } else if (hillcount < 2100000) {
    //full grass
    image(grass2, 0, 0);
    image(grass1, 0, 0);
  } else if (hillcount < 2400000) {
    //grass to dried transition
    fade = map(hillcount, 2100000, 2400000, 255, 0);
    tint(255, fade);
    image(grass2, 0, 0);
    image(grass1, 0, 0);

    appear = map(hillcount, 2100000, 2400000, 0, 255);
    tint(255, appear);
    image(dried2, 0, 0);
    image(dried1, 0, 0);
  } else if (hillcount < 3300000) {
    //full dried
    image(dried2, 0, 0);
    image(dried1, 0, 0);
  } else if (hillcount < 3600000) {
    //dried to bloom transition
    fade = map(hillcount, 3300000, 3600000, 255, 0);
    tint(255, fade);
    image(dried2, 0, 0);
    image(dried1, 0, 0);

    appear = map(hillcount, 3300000, 3600000, 0, 255);
    tint(255, appear);
    image(flowers2, 0, 0);
    image(flowers1, 0, 0);
  }
}
