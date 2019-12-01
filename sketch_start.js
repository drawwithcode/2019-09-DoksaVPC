//variable for the start button
var startButton;

function setup() {
  frameRate(12);
  createCanvas(windowWidth, windowHeight);

  //creating the button
  startButton = createButton("DONE");
}

function draw() {
  background("RosyBrown");

  //drawing welcome text
  textAlign(CENTER);
  textSize(20);
  text("Please, be sure you turned OFF", width / 2, height / 3.8);
  text("the auto-rotate setting of your device", width / 2, height / 3);
  text("before starting.", width / 2, height / 2.5);

  //setting the button's position and on touch event
  startButton.position(width / 2 - 100, height / 2);
  startButton.touchEnded(startGame);
}

// prevent dragging the screen
function touchMoved() {
  return false;
}

//sending a request permission to detect the device orientation on ios
function touchStarted(event) {
  DeviceOrientationEvent.requestPermission();
}

//opens the game's page
function startGame() {
  window.open("ketchup.html", "_self");
}

//resizes the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
