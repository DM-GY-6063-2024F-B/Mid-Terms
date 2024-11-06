let columns = [];
let fallingChars = [];
let colorPalette = [];
let gravity = 0.1;
let radius = 200;
let currentPatternChars = [];
let charSize = 20;
let columnSpacing = 20; // Slightly increased spacing for better performance

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(charSize);
  textAlign(CENTER, CENTER);
  frameRate(60); // frame rate to make animations smoother

  // Initialize the color palette with shades of green
  colorPalette = [
    color(0, 255, 0),   // Bright green
    color(0, 200, 0),   // Medium green
    color(0, 150, 0),   // Dark green
    color(0, 255, 100), // Light green
    color(50, 255, 50)  // Lighter green
  ];

  // Initialize columns of characters for Matrix rain effect
  for (let x = 0; x < width; x += columnSpacing) {
    columns.push(createColumn(x));
  }
  
 
  for (let i = 0; i < 50; i++) { // Reduced number of falling chars for smoother performance
    fallingChars.push({
      x: random(width),
      y: random(-800, 0),
      speed: random(2, 5),
      color: random(colorPalette),
      char: getRandomChar(),
      inPattern: false,
      targetX: null,
      targetY: null
    });
  }
}

function draw() {
  background(0, 180); 

  // Update and display each column for Matrix rain effect
  for (let column of columns) {
    updateColumn(column);
    displayColumn(column);
  }

  // Updates and display additional falling characters for patterns
  for (let char of fallingChars) {
    updateFallingChar(char);
    displayChar(char);
  }
}

// Control the gravity acceleration with mouse movement
function mouseMoved() {
  gravity = map(mouseX, 0, width, 0.1, 2.5); 
}

// Change the color of falling characters when the mouse is clicked
function mousePressed() {
  if (currentPatternChars.length > 0) {
    // Reset pattern characters to falling state
    for (let char of currentPatternChars) {
      char.inPattern = false;
      char.color = random(colorPalette);
    }
    currentPatternChars = [];
  } else {
    formCirclePattern();
  }
}

// Function to form a circular pattern
function formCirclePattern() {
  let centerX = width / 2;
  let centerY = height / 2;

  currentPatternChars = randomSubset(fallingChars, 30); // Reduced number for performance

  for (let i = 0; i < currentPatternChars.length; i++) {
    let char = currentPatternChars[i];
    let angle = map(i, 0, currentPatternChars.length, 0, TWO_PI);
    char.targetX = centerX + cos(angle) * radius;
    char.targetY = centerY + sin(angle) * radius;
    char.inPattern = true;
    char.color = color(255); // Set color to white for pattern
  }
}

// this snippet creates a new column of characters at a specific x position for Matrix rain
function createColumn(x) {
  let chars = [];
  let y = random(-1000, 0);
  for (let i = 0; i < 15; i++) { // Reduced number of characters per column
    chars.push({
      x: x,
      y: y - i * charSize,
      speed: random(2, 4),
      color: random(colorPalette),
      char: getRandomChar()
    });
  }
  return chars;
}

// Update characters in a column to create a continuous falling effect
function updateColumn(column) {
  for (let char of column) {
    char.y += char.speed * gravity; // Apply gravity to all characters in the column

    if (char.y > height) {
      char.y = -charSize * column.length;
      char.char = getRandomChar();
      char.color = random(colorPalette);
    }
  }
}

// Display each character with a fading trail effect for Matrix rain
function displayColumn(column) {
  for (let i = 0; i < column.length; i++) {
    let char = column[i];
    let alpha = map(i, 0, column.length, 255, 100); 
    fill(char.color.levels[0], char.color.levels[1], char.color.levels[2], alpha);
    text(char.char, char.x, char.y);
  }
}

// Updates the position of a falling character
function updateFallingChar(char) {
  if (char.inPattern) {
    // Move towards the target position for the pattern
    char.x = lerp(char.x, char.targetX, 0.1);
    char.y = lerp(char.y, char.targetY, 0.1);
  } else {
    char.y += char.speed * gravity; // Apply gravity to all fallingChars

    if (char.y > height) {
      char.y = random(-100, -50);
      char.x = random(width);
      char.char = getRandomChar();
      char.color = random(colorPalette);
    }
  }
}

// Display a falling character
function displayChar(char) {
  fill(char.color);
  text(char.char, char.x, char.y);
}

// Function to get a random character
function getRandomChar() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars.charAt(floor(random(chars.length)));
}

// Function to get a random subset of an array
function randomSubset(array, count) {
  let subset = [];
  while (subset.length < count && array.length > subset.length) {
    let randomIndex = floor(random(array.length));
    let item = array[randomIndex];
    if (!subset.includes(item)) subset.push(item);
  }
  return subset;
}
