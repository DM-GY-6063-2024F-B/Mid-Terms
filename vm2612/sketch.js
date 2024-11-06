let slider, stars = [];
let i = 100;
let angle = 0.1;
let branchRandomness = [];
let seasonIndex = 0;
let seasonChangeInterval = 200;
let leafCount = 0;
let seasons;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(PI, TWO_PI, PI / 8, 0.5);
  slider.position(width / 2 - slider.width / 2, 20);

  for (let s = 0; s < 200; s++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      brightness: random(100, 255)
    });
  }

  generateBranchRandomness(10);

  seasons = [
    {
      backgroundStart: color(135, 206, 235),
      backgroundEnd: color(34, 139, 34),
      leafColors: [color(60, 179, 113), color(34, 139, 34)],
      leavesVisible: true
    },
    {
      backgroundStart: color(70, 130, 180),
      backgroundEnd: color(34, 139, 34),
      leafColors: [color(60, 179, 113), color(34, 139, 34), color(46, 139, 87)],
      leavesVisible: true
    },
    {
      backgroundStart: color(255, 228, 181),
      backgroundEnd: color(255, 69, 0),
      leafColors: [
        color(255, 69, 0), color(255, 140, 0), color(218, 165, 32), color(205, 92, 92)
      ],
      leavesVisible: true
    },
    {
      backgroundStart: color(176, 224, 230),
      backgroundEnd: color(0, 0, 139),
      leafColors: [],
      leavesVisible: false,
      quote: "Reflecting on life's cycles - 'The Tree of Life'"
    }
  ];
}

function draw() {
  if (frameCount % seasonChangeInterval === 0) {
    seasonIndex = (seasonIndex + 1) % seasons.length;
    leafCount = 0;
  }
  
  let currentSeason = seasons[seasonIndex];

  drawBackgroundGradient(currentSeason);

  noStroke();
  for (let star of stars) {
    star.brightness = random(150, 255);
    fill(star.brightness);
    ellipse(star.x, star.y, star.size);
  }

  angle = slider.value();

  stroke(0);
  fill(0);
  push();
  translate(width / 2, height);
  branch(i, 0, currentSeason);
  pop();

  drawTextOverlay(currentSeason);
}

function drawBackgroundGradient(season) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(season.backgroundStart, season.backgroundEnd, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function branch(len, depth, season) {
  strokeWeight(map(len, 2, i, 3, 19));
  stroke(0);
  
  line(0, 0, 0, -len * 2);
  translate(0, -len * 2);

  if (len < 10 && season.leavesVisible) {
    if (seasonIndex === 2 && frameCount % 5 === 0) {
      if (leafCount < 200) leafCount++;
    }
    
    if (seasonIndex !== 2 || random(leafCount) > 10) {
      fill(random(season.leafColors));
      noStroke(1);
      ellipse(0, 0, random(10, 15), random(10, 15));
    }
  }

  if (len > 4 && depth < branchRandomness.length) {
    stroke(0);
    noFill();
    
    push();
    let leftAngle = angle * branchRandomness[depth];
    let leftScale = 0.66;
    rotate(leftAngle);
    branch(len * leftScale, depth + 1, season);
    pop();

    push();
    let rightAngle = -angle * branchRandomness[depth];
    let rightScale = 0.76;
    rotate(rightAngle);
    branch(len * rightScale, depth + 1, season);
    pop();
  }
}

function generateBranchRandomness(depthLevels) {
  branchRandomness = [];
  for (let i = 0; i < depthLevels; i++) {
    branchRandomness.push(random(0.8, 1.2));
  }
}

function drawTextOverlay(season) {
  textAlign(CENTER);
  fill(255);

  textFont('serif');

  textSize(48);
  text("THE TREE OF LIFE", width / 2, height * 0.2);

  textSize(16);
  text("NOTHING STANDS STILL", width / 2, height * 0.25);

  if (seasonIndex === 3 && season.quote) {
    textSize(12);
    fill(200);
    text(season.quote, width / 2, height * 0.35);
  }

  textSize(12);
  fill(200);
  text("Written and Directed by Terrence Malick", width / 2, height * 0.27);
}
