let NUM_FEATHERS = 100; // Number of feathers
let feathers = []; // Array to hold feather objects
let featherImg; // Variable for feather image
let quotes = []; // Array to hold Pride and Prejudice quotes
let currentQuoteIndex = 0; // Index to track the current quote
let customFont; // Variable for English font

function preload() {
  // Load the feather image
  featherImg = loadImage("peacock-feather.png");

  // Load the classic lines from Pride and Prejudice
  quotes = [
    "Pride relates more to our opinion of ourselves, vanity to what we would have others think of us.\n骄傲多半涉及我们自己怎样看待自己，而虚荣则涉及我们想别人怎样看我们。",
    "Not all of us can afford to be romantic.\n并不是我们所有的人都会拥有浪漫。",
    "If your feelings are still what they were last April, tell me so at once. My affections and wishes have not changed. But one word from you will silence me forever.\n如果你的心意仍与四月时一样，马上告诉我。我的爱与心愿一如既往。但是你的一句话也会让我永远缄默。",
    "Misery can be caused by someone being just weak and indecisive.\n一个人仅仅因为软弱无能或优柔寡断就完全可能招致痛苦。",
    "Not all of us can afford to be romantic.\n并不是我们所有的人都会拥有浪漫。",
  ];

  // Load the custom font file for English text
  customFont = loadFont("GreatVibes-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Create feather objects
  for (let cnt = 0; cnt < NUM_FEATHERS; cnt++) {
    let aFeather = {
      x: random(width),
      y: random(height),
      size: random(50, 400), // Random size for each feather
      alpha: random(50, 200), // Random transparency for each feather
      dx: random(-2, 2), // Horizontal speed
      dy: random(-2, 2), // Vertical speed
      angle: random(TWO_PI), // Random initial angle
      da: random(-0.025, 0.025), // Random rotational speed
    };

    feathers.push(aFeather);
  }

  textFont(customFont);
  textSize(32);
  fill(50);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(20, 139, 139);

  // Draw and animate each feather
  for (let idx = 0; idx < feathers.length; idx++) {
    let mFeather = feathers[idx];
    tint(255, mFeather.alpha); // Adjust transparency

    // Apply transformations for position and rotation
    push();
    translate(mFeather.x, mFeather.y); // Move to the feather's position
    rotate(mFeather.angle); // Rotate by the feather's angle

    // Draw the feather image at the origin after rotation
    imageMode(CENTER);
    image(featherImg, 0, 0, mFeather.size, mFeather.size);
    pop();

    // Update feather position and angle
    mFeather.x += mFeather.dx;
    mFeather.y += mFeather.dy;
    mFeather.angle += mFeather.da; // Update the rotation angle

    // Reset position if it goes out of bounds
    if (mFeather.y < 0 || mFeather.y > height) {
      mFeather.y = random(height);
    }
    if (mFeather.x < 0 || mFeather.x > width) {
      mFeather.x = random(width);
    }
  }

  // Display the current quote with both English and Chinese lines
  displayQuote(quotes[currentQuoteIndex], width / 2, height - 200);

  textSize(120);
  textFont(customFont);
  text("Pride and Prejudice", width / 2, height / 2);
}

function displayQuote(quote, x, y) {
  let englishText = quote.split("\n")[0]; // Extract English part
  let chineseText = quote.split("\n")[1]; // Extract Chinese part

  // Display English text in custom font
  textFont(customFont);
  textSize(36);
  fill(0);
  text(englishText, x, y - 30);

  // Display Chinese text with default font
  textFont("sans-serif"); // Switch to default font for Chinese
  textSize(20);
  text(chineseText, x, y + 30);
}

function mousePressed() {
  // Switch to the next quote on each mouse click
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas on window resize
}
