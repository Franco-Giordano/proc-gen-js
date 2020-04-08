var canvasW = 700;
var canvasH = canvasW;

var cellAmntW = 100;
var cellAmntH = 100;

var cellW = canvasW / cellAmntW;
var cellH = canvasH / cellAmntH;

var scaling = 0.1;
var timeScale = 0.025;

var drawEnabled = true;

var ballX = cellW * 0.5;
var ballY = cellH * 0.5;

var speed = cellW;

var totalFrames = 150;

var noiseMatrix = new Array(cellAmntW * cellAmntH * totalFrames);


function setup() {
  let c = createCanvas(canvasW, canvasH);

  frameRate(30);

  fill(255, 0, 0);

  textSize(32);
  text("Generating noise...", 10, 30);

  generateNoiseMatrix();
  
  strokeWeight(0.5);
  stroke(0,100)

  createLoop({gif:true, duration:5});

}

function generateNoiseMatrix() {


  for (tOff = 0; tOff < totalFrames; tOff++) {
    for (i = 0; i < cellAmntW; i++) {
      for (j = 0; j < cellAmntH; j++) {
        noiseMatrix[tOff * cellAmntW * cellAmntH + j * cellAmntW + i] = noise(scaling * i + tOff * timeScale, scaling * j + tOff * timeScale);
      }
    }
  }

  tOff=0;
}

function draw() {
  background(10);

  if (keyIsDown(32)) {
    drawEnabled = !drawEnabled;
  }


  let i, j, rnd;


  for (i = 0; i < cellAmntW; i++) {
    for (j = 0; j < cellAmntH; j++) {
      rnd = noiseMatrix[tOff * cellAmntW * cellAmntH + j * cellAmntW + i];
      if (rnd < 0.45) {
        fill(0, 0, 160); //agua
      } else if (rnd >= 0.45 && rnd <0.5) {
        fill(102, 51, 0); // tierra oscura
      }
      else {
        fill(153, 102, 51); // tierra
      }
      rect(cellW * i, cellH * j, cellW, cellH);
    }
  }


  if (!drawEnabled)
    return;

  tOff += 1;

  tOff %= totalFrames;


}
