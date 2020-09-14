let colorPicker;
let speedSel;

// define variables
var waveLength1 = 126;
var waveLength2 = 36;
var count = 0;
var amplitude = 200;
var speed = 30;
var strokeSize = 30;
var buttonText = "STOP";

//setup
function setup() {
	frameRate(speed);
  // create canvas
  createCanvas(700, 700);
	background(255,255,255);
  // create header
  header = createElement('h1','Click on NEW to start a new drawing!');
	
	// create button for stop/resume
  button2 = createButton(buttonText);
  button2.position(30,30);
  button2.size(100,80);
	button2.style('font-size', '15px');
	button2.style('font-weight','bold');
  button2.mousePressed(pauseOrUnpause);
	button2.attribute('disabled','true');
	
  // create button for new drawing
  button1 = createButton('NEW');
  button1.position(150,30);
  button1.size(100,80);
	button1.style('font-size', '15px');
	button1.style('font-weight','bold');
  button1.mousePressed(newLissajousCurve);
	
  //create colorPicker for background
  colorPicker1 = createColorPicker('white');
  colorPicker1.position(610, 50);
	
	//create colorPicker for Lissajous Curve
  colorPicker2 = createColorPicker('black');
  colorPicker2.position(610, 80);
	
	//create slider for size
  slider = createSlider(10,30,15);
  slider.position(580,110);
  slider.style('width','80px');
	
	//create speed select
	speedSel = createSelect();
	speedSel.option('SLOW');
	speedSel.option('NORMAL');
	speedSel.option('FAST');
	speedSel.selected('NORMAL');
	speedSel.style('width', '80px');
	speedSel.position(580,135);
	speedSel.changed(changeSpeed);
}

function draw() {
	//instructions
  translate(400, 10);
	textSize(15);
	text('Customize your NEXT Lissajous Curve!', 10, 30);
	translate(70, 27);
	text('Background color:', 10, 30);
	translate(13, 27);
	text('Animation color:', 10, 30);
	translate(5, 27);
	text('stroke size:', 10, 30);
	translate(30, 27);
	text('speed:', 10, 30);
	
  header.position(100,300);
  noStroke();
		
  //draw lissajous curve
	translate(-168,310);
	angle1 = count / waveLength1 * TWO_PI;
	angle2 = count / waveLength2 * TWO_PI;
	var x1 = sin(angle1) * amplitude;
	var y1 = sin(angle2) * amplitude;
	
  ellipse (x1,y1,strokeSize,strokeSize);

	count++;
}

//function for stop/resume button
function pauseOrUnpause() {
	if(frameRate() == 0) {
		frameRate(speed);
		buttonText = "STOP";
	} else {
		frameRate(0);
		buttonText = "RESUME";
	}
	button2 = createButton(buttonText);
  button2.position(30,30);
  button2.size(100,80);
	button2.style('font-size', '15px');
	button2.style('font-weight','bold');
  button2.mousePressed(pauseOrUnpause);
	button2.style('background-color', colorPicker2.color());
	button2.style('color', colorPicker1.color());
}

//function for new button
function newLissajousCurve() {
	header.html('');
  clear();
  background(colorPicker1.color());
	fill(colorPicker2.color());
	button1.style('background-color', colorPicker2.color());
	button1.style('color', colorPicker1.color());
	button2.style('background-color', colorPicker2.color());
	button2.style('color', colorPicker1.color());
	speedSel.style('background-color', colorPicker1.color());
	speedSel.style('color', colorPicker2.color());
	waveLength1 = random(80, 160);
  waveLength2 = random(30, 60); 
	frameRate(speed);
	strokeSize = slider.value();
	button2.removeAttribute('disabled');
}

//function for speed slider
function changeSpeed(){
	let item = speedSel.selected();
	if (item ==  'SLOW'){
			speed = 10;
	}
	if (item == 'NORMAL'){
			speed = 30;
	}
	if (item == 'FAST'){
		  speed = 60;
	}
}