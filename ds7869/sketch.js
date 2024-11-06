let player;
let enemies = [];
let blood = [];
let blood2 = [];
let isSlashing = false;
let K = -10;
const enemyCount = 10;
const attackRange = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
  player = {
    x: width / 2,
    y: height / 2,
    size: 50,
    speed: 12,
  };

  for (let i = 0; i < enemyCount; i++) {
    enemies.push({
      x: random(width),
      y: random(height),
      w: 70,
      h: 70,
      speedX: random(-3, 3),
      speedY: random(-3, 3),
      splited: 0,
      r: 0,
      e: 20,
    });
  }
}

function draw() {
  background(255, 208, 0);

  for (let i = 0; i < blood.length; i++) {
    push();
    fill(207, 4, 4);
    ellipse(blood[i].x, blood[i].y, blood[i].s);
    pop();
  }

  for (let i = 0; i < blood2.length; i++) {
    push();
    fill(207, 4, 4);
    ellipse(blood2[i].x, blood2[i].y, blood2[i].s);
    pop();
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    Enemy(enemies[i]);
  }
  for (let i = 0; i < blood.length; i++) {}
  Player();
  push();
  fill(0);
  rect(windowWidth / 2, windowHeight / 16, windowWidth, windowHeight / 8);
  rect(
    windowWidth / 2,
    (windowHeight * 15) / 16,
    windowWidth,
    windowHeight / 8
  );
  pop();
  //film rect
}
function Player() {
  if (keyIsDown(87) && player.y > 0) {
    player.y -= player.speed;
  } // W
  if (keyIsDown(83) && player.y < height - player.size) {
    player.y += player.speed;
  } // S
  if (keyIsDown(65) && player.x > 0) {
    player.x -= player.speed;
  } // A
  if (keyIsDown(68) && player.x < width - player.size) {
    player.x += player.speed;
  } // D

  push();
  fill(255, 246, 199);
  rect(
    player.x,
    player.y - player.size / 3,
    (player.size * 5) / 4,
    player.size
  );
  pop();

  push();
  fill(255, 219, 161);
  rect(player.x, player.y - player.size / 2, player.size, player.size / 2);
  pop();

  push();
  fill(255, 179, 0);
  rect(player.x, player.y, player.size, (player.size * 8) / 9);
  pop();
  push();
  fill(0);
  rect(player.x, player.y, player.size / 7, (player.size * 8) / 9);
  pop();

  push();
  fill(240, 200);
  arc(player.x, player.y, 200, 40, -10, K);
  pop();

  if (isSlashing) {
    K += 25;
    if (K > 190) {
      K = -10;
      isSlashing = false;
    }
  }
}

function Enemy(enemy) {
  enemy.x += enemy.speedX;
  enemy.y += enemy.speedY;

  if (enemy.x < 0 || enemy.x > width) enemy.speedX *= -1;
  if (enemy.y < 0 || enemy.y > height) enemy.speedY *= -1;
  fill(0);
  push();
  translate(enemy.x, enemy.y);
  rotate(enemy.r);
  rect(0, 0, enemy.w, enemy.h);
  //body
  fill(255);
  rect(enemy.w / 4, -enemy.h / 4, enemy.e, enemy.e / 4);
  rect(-enemy.w / 4, -enemy.h / 4, enemy.e, enemy.e / 4);
  //eye
  pop();
}

function keyPressed() {
  if (key === " ") {
    isSlashing = true;
    for (let i = enemies.length - 1; i >= 0; i--) {
      let distance = dist(player.x, player.y, enemies[i].x, enemies[i].y);
      if (distance <= 100 && enemies[i].splited < 2) {
        let enemy = enemies[i];

        let part1 = {
          x: enemy.x,
          y: enemy.y - enemy.h / 3,
          w: enemy.w,
          h: enemy.h / 2,
          speedX: 0,
          speedY: 0,
          splited: enemy.splited + 1,
          r: random(random(-100, -50), random(50, 100)),
          e: 0,
        };

        let part2 = {
          x: enemy.x,
          y: enemy.y + enemy.h / 3,
          w: enemy.w,
          h: enemy.h / 2,
          speedX: 0,
          speedY: 0,
          splited: enemy.splited + 1,
          r: random(-20, 20),
          e: 0,
        };
        if (enemy.splited == 0) {
          enemies.push({
            x: random(width),
            y: random(windowHeight / 16),
            w: 70,
            h: 70,
            speedX: random(-3, 3),
            speedY: random(-3, 3),
            splited: 0,
            r: 0,
            e: 20,
          });
        }

        for (let i = 0; i < 30; i++) {
          blood.push({
            x: enemy.x + random(-50, 50),
            y: enemy.y + random(-20, 20),
            s: random(1, 3),
          });
        }
        for (let i = 0; i < 10; i++) {
          blood2.push({
            x: enemy.x + random(-20, 20),
            y: enemy.y + random(-20, 20),
            s: random(10, 15),
          });
        }

        enemies.splice(i, 1);
        enemies.push(part1, part2);
      }
    }
  }
}
