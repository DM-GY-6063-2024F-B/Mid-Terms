let cloudScales = [];
let cloudNumbers = [];
let positionX = [];
let positionY = [];
let bubbleX = [];
let bubbleY = [];
let thunderStates =[];
let time1;
let whaleX;
let whaleY;
let myFont;

function preload(){
  whale = loadImage("https://raw.githubusercontent.com/shuyang-DM-GY-6063-2024Fall-B/MidTerm/main/whale.png")
  myFont = loadFont('https://raw.githubusercontent.com/shuyang-DM-GY-6063-2024Fall-B/MidTerm/main/LexendBold.ttf');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  textFont(myFont);
  textSize((64*windowWidth)/1080)


  for (let id = 0; id < 6; id++) {
    let cloudNumber = int(random(6, 7)); 
    let cloudScaleArray = []; 
    positionX[id] = random(0, width);
    positionY[id] = random(0, 200);
    thunderStates[id] = false;
    for (let j = 0; j < cloudNumber; j++) {
        let cloudScale = random(40, 60);
        cloudScaleArray.push(cloudScale);
    }
    cloudScales[id] = cloudScaleArray; 
    cloudNumbers[id] = cloudNumber;
  }

  for(let idx = 0;idx < 40;idx++){
    bubbleX[idx] = random(-400,450);
    bubbleY[idx] = random(80,130);
  }
}


function clouds(x, y, time, scales, number) {
  push();
  noStroke()
  translate(x, y);
  let gap = 0;

  for (let i = 0; i < number; i++) {
    let movement = sin(time + i*100) * 10; 
    let scale = scales[i];
    gap += scale * 0.6;
    if(i == number/2-1 || i == number/2 ||  i == number/2 + 1 ){
      ellipse(gap, movement, scale*1.5 + movement * 0.2,scale*1.2+ movement * 0.2);
    }   
    else{
      ellipse(gap, movement, scale+ movement * 0.2,scale*0.8+ movement * 0.2);
    }
  }
  pop();
}

function waterWave(x,y,wave,length,height,time,color){
  push()
  fill(color)
  translate(x,y)
  beginShape()
  vertex(0,height)
  for(let a =0; a<length*4; a++  ){
    vertex(a+sin(time), wave*sin(a*1.5)*sin(time));
  }
  vertex(length,height)
  endShape()
  pop()
  }

function thunder(x,y,width,length,scale,time){
  push()
  translate(x,y);
  rotate(10)
  noStroke()
  fill('white')
  beginShape();
  vertex(0,0);
  vertex(-width,length);
  time = map(sin(time*50),-1,1,0,1);
  let distance = dist(0,length,scale,length-scale);
  vertex(-width,length);
  vertex(0,length);
  vertex(-width,2*length);
  vertex(distance*time,length-distance*time);
  vertex(-width+distance*time,length-distance*time);
  vertex(0,0);
  endShape()
  pop()
}

  function ship(x,y,a,time){
    // shape of hull
    push();
    fill('black')
    translate(x,y);
    if(dist(250,0,whaleX-x,height/2-y) < 100){
      rotate(sin(time*10)*6)
    }
    else{
      rotate(sin(time*10)*3)
    }
    beginShape();
    vertex(-a*2,0);
    vertex(a*21,0);
    vertex(a*17,a*5);
    vertex(6*a,a*5);
    vertex(a*3,a);
    vertex(0,a);
    vertex(-a*2,0);
    endShape();

    // shape of mast

    fill('black');
    rect(14*a,-10*a,a*0.6,10*a);
    for(let i= 0; i<3;i++){
      let posy =i*3*a-9*a;
      let posx = 12*a-i*a*1.2
      fill('black');
      rect(posx,posy,4.6*a,a*0.3)
      fill('#ebe7dd');  

      beginShape()  
      vertex(posx,posy+a*0.3)  
      for( let pixel = 0; pixel< (2*a); pixel++){
        let distance = map(sin((180*pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx,posy+0.3*a+pixel);
      }
      vertex(posx+4.6*a,posy+a*2.3)  
      vertex(posx+4.6*a,posy+a*0.3)  


      for (let pixel = 2*a; pixel > 0; pixel--) {
        let distance = map(sin((180 * pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx+4.6*a,posy+ 0.3*a+pixel);
      }
      vertex(posx,posy+a*0.3)
      endShape()  
      a =a+2
    }
    a = a-3
    fill('black');
    rect(9*a,-10*a,a*0.6,10*a);
    for(let i= 0; i<3;i++){
      let posy =i*3*a-9*a;
      let posx = 7*a-i*a*0.8
      fill('black');
      rect(posx,posy,4.6*a,a*0.3)
      fill('#f5f5f2');  

      beginShape()  
      vertex(posx,posy+a*0.3)  
      for( let pixel = 0; pixel< (2*a); pixel++){
        let distance = map(sin((180*pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx,posy+0.3*a+pixel);
      }
      vertex(posx+4.6*a,posy+a*2.3)  
      vertex(posx+4.6*a,posy+a*0.3)  


      for (let pixel = 2*a; pixel > 0; pixel--) {
        let distance = map(sin((180 * pixel)/(2*a)),0,1,0,0.3*a);
        vertex(-distance*abs(sin(time*5))+posx+4.6*a,posy+ 0.3*a+pixel);
      }
      vertex(posx,posy+a*0.3)
      endShape()  
      a =a+2
    }
    pop();
  }

function bubble(posx,posy,x,y,r,time){
  push();
  translate(posx,posy);
  for(idx = 0; idx< 200;idx++){
    bubbleAlpha = map(sin(time*15+idx*10),-1,1,0,233)
    fill(233+22*sin(idx*5),244+11*sin(idx*5),255,bubbleAlpha);
    ellipse(x[idx],y[idx],r+sin(idx*1+time*10)*5)
  }
  pop()
}

function draw() {

  background('#2e3147');
  if(thunderStates[0]){
    background('#595e87');
  }

  time1 = millis() / 100; 

  for (let id = 0; id < 6; id++) {
    fill(97, 99+id*5, 133+id*5)
    
    if (thunderStates[id]) {
      thunder(positionX[id]+100, positionY[id]+10, 30, 100, 5, time1);
      fill(163+id*5, 167+id*5, 227+id*5)
    }
    clouds(positionX[id], positionY[id], time1, cloudScales[id], cloudNumbers[id]);
  }

  waterWave(-width+(time1*10)%width,height-250,10,width*2,height,time1*10,'#1b1e54')

  ship(width/3,height-250,20,time1)
  imageMode(CENTER)
  waterWave(-1.5*width+(time1*10)%width,height-200,10,width*2,height,time1*10,'#2c3366')
  push()
  whaleY = map(mouseY,0,height,height-150,height-80)
  whaleX = mouseX+100
  translate(whaleX,whaleY)
  rotation = map(whaleY,height-150,height-80,0,15)
  rotate(sin(time1*10)+20-rotation)
  image(whale,0,0,whale.width/2,whale.height/1.5);
  bubble(0,0,bubbleX,bubbleY,10,time1);
  pop()

  waterWave(-1.6*width+(time1*10)%width,height-150,10,width*2,height,time1*10,'#284578');
  fill(255)
  text("Moby.Dick",100,200)
}

function mousePressed(){
  // thunder will occur
  for (let id = 0; id < 6; id++) {
    thunderStates[id] = true;
    
  }
  setTimeout(function() {
    for (let id = 0; id < 6; id++) {
      thunderStates[id] = false;
    }
  }, 500);
  
}

