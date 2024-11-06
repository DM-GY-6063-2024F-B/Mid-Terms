let traskfarm;
let traskhouse;
let traskroof;
let traskrock;
let roofmask;
let traskdoor;
let rock;
let pool1mask;
let pool2mask;
let pool3mask;
let pool4mask;
let pool1;
let pool2;
let pool3;
let pool4;

let horizon;
let houseEdge;

let clicks;
let fade;
let appear;
let poolcount;

let NUM_OBJS = 100;
let circles = [];
let y;

let daytime;
let deg;

function preload() {
  traskfarm = loadImage("../assets/traskfarm2.jpg");
  traskhouse = loadImage("../assets/traskhouse.jpg");
  traskroof = loadImage("../assets/traskroof.jpg");
  traskrock = loadImage("../assets/traskrock.jpg");
  traskdoor = loadImage("../assets/traskdoor.jpg");
  rock = loadImage("../assets/rock.png");
  roofmask = loadImage("../assets/roofmask.png");
  pool1mask = loadImage("../assets/pool1mask.png");
  pool2mask = loadImage("../assets/pool2mask.png");
  pool3mask = loadImage("../assets/pool3mask.png");
  pool4mask = loadImage("../assets/pool4mask.png");
  pool1 = loadImage("../assets/pool1.png");
  pool2 = loadImage("../assets/pool2.png");
  pool3 = loadImage("../assets/pool3.png");
  pool4 = loadImage("../assets/pool4.png");
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
  horizon = 2 * (height / 3);
  houseEdge = 2 * (width / 3);
  clicks = 0;

  let a = createA("../hamilton/", "Go West");
  a.position(50, 50);
  a.style("color", "white");
  a.style("font-size", "20px");
  a.style("font-family", "Georgia");

  traskfarm.resize(width, height / 3);
  traskhouse.resize(170, 100);
  traskroof.resize(200, 0);
  traskroof.mask(roofmask);
  pool1.resize(width, height);
  pool1.mask(pool1mask);
  pool2.resize(width, height);
  pool2.mask(pool2mask);
  pool3.resize(width, height);
  pool3.mask(pool3mask);
  pool4.resize(width, height);
  pool4.mask(pool4mask);

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
  deg = map(daytime, 21600, 72000, 360, 180);
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

  //FARM AND HOUSE
  image(traskfarm, 0, horizon);
  image(traskhouse, houseEdge, horizon - 50);
  image(traskroof, houseEdge - 15, horizon - 250);

  traskdoor.resize(40, 0);
  image(traskdoor, houseEdge + 60, horizon - 10);

  //POOLS OF BLOOD
  push();
  let oddEven = clicks % 2;
  let poolcount = millis() % 60000;

  if (oddEven) {
    if (poolcount < 7000) {
      image(pool1, 0, 0);
    } else if (poolcount < 10000) {
      image(pool1, 0, 0);
      appear = map(poolcount, 7000, 10000, 0, 255);
      tint(255, appear);
      image(pool2, 0, 0);
    } else if (poolcount < 17000) {
      image(pool2, 0, 0);
    } else if (poolcount < 20000) {
      image(pool1, 0, 0);
      image(pool2, 0, 0);
      appear = map(poolcount, 17000, 20000, 0, 255);
      tint(255, appear);
      image(pool3, 0, 0);
    } else if (poolcount < 27000) {
      image(pool3, 0, 0);
    } else if (poolcount < 30000) {
      image(pool1, 0, 0);
      image(pool2, 0, 0);
      image(pool3, 0, 0);
      appear = map(poolcount, 27000, 30000, 0, 255);
      tint(255, appear);
      image(pool4, 0, 0);
    } else if (poolcount < 37000) {
      image(pool4, 0, 0);
    } else if (poolcount < 40000) {
      image(pool3, 0, 0);
      fade = map(poolcount, 37000, 40000, 255, 0);
      tint(255, fade);
      image(pool4, 0, 0);
    } else if (poolcount < 47000) {
      image(pool3, 0, 0);
    } else if (poolcount < 50000) {
      image(pool2, 0, 0);
      fade = map(poolcount, 47000, 50000, 255, 0);
      tint(255, fade);
      image(pool3, 0, 0);
    } else if (poolcount < 57000) {
      image(pool2, 0, 0);
    } else if (poolcount < 60000) {
      image(pool1, 0, 0);
      fade = map(poolcount, 57000, 60000, 255, 0);
      tint(255, fade);
      image(pool2, 0, 0);
    }
  }
  pop();

  //ROCK
  rock.resize(300, 300);
  image(rock, 300, horizon - 120);
}

function mouseClicked() {
  clicks++;
}
