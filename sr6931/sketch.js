let backgroundImg, bearImg, bunnyImg, catImg;
let maskImg, mouseImg, pigImg, ring1Img, ring2Img, ring3Img, ring4Img, tigerImg, templeImg;

const baseWidth = 1920;
const baseHeight = 1080;
let scaleX, scaleY;

let elementPositions = {
  temple: { x: 1582, y: 464, size: 300 },
  bear: { x: 760, y: 383, size: 250 },
  bunny: { x: 1860, y: 530, size: 150 },
  cat: { x: 1400, y: 400, size: 180 },
  tiger: { x: 1280, y: 400, size: 120 },
  mask: { x: 1450, y: 700, size: 1050 },
  mouse: { x: 1618, y: 420, size: 200 },
  pig: { x: 1700, y: 458, size: 150 },
  ring1: { x: 1080, y: 650, size: 1.9 },
  ring2: { x: 1080, y: 630, size: 1.5 },
  ring3: { x: 1150, y: 670, size: 2.0 },
  ring4: { x: 1260, y: 700, size: 1.9 }
};

let bearFlying = false;
let bearFlyY = 0;
let bearFlyX = 0;
let bearScale = 1;
let showAlbumInfo = false;
let showExtendedInfo = false;

const initialText = "Graduation by Kanye West\nReleased in 2007, this album explores themes of growth, fame, and success.";
const extendedInfoText = [
  "Kanye West's *Graduation* album, released in 2007, marked the third installment",
  "of his education-themed trilogy following *The College Dropout* and *Late Registration.*",
  "This album diverged in sound, incorporating electronic influences alongside hip-hop",
  "and pop, inspired by Kanye's experiences with European music and touring with artists",
  "like Daft Punk. It includes some of his iconic tracks like 'Stronger,' 'Good Life,'",
  "and 'Flashing Lights,' which showcase his experimentation with synthesizers,",
  "electronic beats, and collaborations that redefined his musical style.",
  "",
  "The album cover, designed by Japanese contemporary artist Takashi Murakami,",
  "is iconic for its colorful, animated style. Murakami’s artwork depicts Kanye’s",
  "Dropout Bear character—featured in previous album covers—being launched into",
  "the sky as if graduating from college, symbolizing Kanye’s ascension and growth.",
  "The futuristic, anime-inspired design is filled with surreal, vibrant imagery,",
  "such as floating bears, cityscapes, and animated versions of Kanye's themes,",
  "reflecting his love for Japanese pop culture and unique artistic vision.",
  "",
  "The cover is often celebrated for its creativity and its symbolic representation",
  "of Kanye's journey in the music industry.",
  "",
  "*Graduation* is not only a significant piece in Kanye's discography but also a",
  "turning point that influenced both his artistic direction and the larger hip-hop",
  "landscape."
];

function preload() {
  backgroundImg = loadImage('./assets/background.jpg');
  bearImg = loadImage('./assets/bear.png');
  bunnyImg = loadImage('./assets/buny.png');
  catImg = loadImage('./assets/cat.png');
  maskImg = loadImage('./assets/mask.png');
  mouseImg = loadImage('./assets/mouse.png');
  pigImg = loadImage('./assets/pig.png');
  templeImg = loadImage('./assets/temple.png');
  ring1Img = loadImage('./assets/ring1.png');
  ring2Img = loadImage('./assets/ring2.png');
  ring3Img = loadImage('./assets/ring3.png');
  ring4Img = loadImage('./assets/ring4.png');
  tigerImg = loadImage('./assets/tiger.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  calculateScalingFactors();
  console.log("Setup complete. Click on the canvas to get coordinates for precise element placement.");
}

function draw() {
  background(255);
  drawBackground();

  if (!showExtendedInfo) {
    placeElements();
  } else {
    displayExtendedInfo();
  }
}

function calculateScalingFactors() {
  scaleX = windowWidth / baseWidth;
  scaleY = windowHeight / baseHeight;
}

function drawBackground() {
  image(backgroundImg, width / 2, height / 2, width, height);
}

function placeElements() {
  let templePos = {
    x: elementPositions.temple.x * scaleX,
    y: elementPositions.temple.y * scaleY
  };
  image(templeImg, templePos.x, templePos.y, elementPositions.temple.size * scaleX, elementPositions.temple.size * scaleY);

  let bearPos = {
    x: (elementPositions.bear.x + bearFlyX) * scaleX,
    y: (elementPositions.bear.y + bearFlyY) * scaleY
  };

  if (bearFlying) {
    bearFlyY -= 3;
    bearFlyX -= 3;
    bearScale *= 0.98;

    if (bearPos.x < -elementPositions.bear.size * bearScale * scaleX || 
        bearPos.y < -elementPositions.bear.size * bearScale * scaleY) {
      bearFlying = false;
      bearFlyY = 0;
      bearFlyX = 0;
      bearScale = 1;
      showAlbumInfo = true;

      setTimeout(() => {
        showExtendedInfo = true;
        console.log("Displaying extended information.");
      }, 5000);
      return;
    }
  }

  if (!showAlbumInfo) {
    push();
    translate(bearPos.x, bearPos.y);
    scale(bearScale);
    image(bearImg, 0, 0, elementPositions.bear.size * scaleX, elementPositions.bear.size * scaleY);
    pop();
  } else {
    textSize(20 * scaleX);
    textAlign(CENTER, CENTER);
    fill(0);
    text(initialText, elementPositions.bear.x * scaleX, elementPositions.bear.y * scaleY);
  }

  if (!showExtendedInfo) {
    const elements = ['bunny', 'cat', 'tiger', 'mouse', 'pig'];
    elements.forEach(el => {
      let pos = {
        x: elementPositions[el].x * scaleX,
        y: elementPositions[el].y * scaleY
      };
      image(eval(el + 'Img'), pos.x, pos.y, elementPositions[el].size * scaleX, elementPositions[el].size * scaleY);
    });

    let maskPos = {
      x: elementPositions.mask.x * scaleX,
      y: elementPositions.mask.y * scaleY
    };
    push();
    translate(maskPos.x, maskPos.y);
    rotate(radians(-30));
    image(maskImg, 0, 0, elementPositions.mask.size * scaleX, elementPositions.mask.size * scaleY);
    pop();

    for (let i = 1; i <= 4; i++) {
      let ring = elementPositions[`ring${i}`];
      let ringPos = {
        x: ring.x * scaleX,
        y: ring.y * scaleY
      };
      let ringSize = (120 + sin(frameCount * 0.1) * 10) * ring.size;
      image(eval(`ring${i}Img`), ringPos.x, ringPos.y, ringSize * scaleX, ringSize * scaleY);
    }
  }
}

function displayExtendedInfo() {
  drawBackground();  

  textSize(18);
  textAlign(CENTER, TOP);
  fill(0);

  let yPosition = height / 2 - (extendedInfoText.length * 12);
  for (let i = 0; i < extendedInfoText.length; i++) {
    text(extendedInfoText[i], width / 2, yPosition + i * 24);
    console.log(extendedInfoText[i]);  
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScalingFactors();
}

function mousePressed() {
  let bearPos = {
    x: elementPositions.bear.x * scaleX,
    y: (elementPositions.bear.y + bearFlyY) * scaleY
  };
  let bearSize = elementPositions.bear.size * bearScale * scaleX;

  if (
    mouseX > bearPos.x - bearSize / 2 &&
    mouseX < bearPos.x + bearSize / 2 &&
    mouseY > bearPos.y - bearSize / 2 &&
    mouseY < bearPos.y + bearSize / 2
  ) {
    bearFlying = true;
    showAlbumInfo = false;
    showExtendedInfo = false;
  }
}
