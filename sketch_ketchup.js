//variable for the img of the bottle
var bottle;
//variable for the img of the top of the bottle
var bottleTop;
//variable for the img of the opening part of the top
var bottleTopOpen;
//array that contains all the drops of ketchup created when pouring it
var allTheDrops = [];

function setup() {
  frameRate(12);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ellipseMode(CENTER);

  //creating an img element for each section of the ketchup bottle
  bottle = createImg("./assets/bottle.svg", "bottle");
  bottleTop = createImg("./assets/top.svg", "top");
  bottleTopOpen = createImg("./assets/top_open.svg", "top open");
}

function draw() {
  background("RosyBrown");
  //setting height and width of the image for the main part of the bottle according to the window height. These two sizes will be used as units of measure for the size of the other elements too
  var bottleHeight = height * 0.6;
  var bottleWidth = bottleHeight * 0.6;

  //styling and positioning the images
  bottle.style("height", bottleHeight + "px");
  bottleTop.style("width", bottleWidth * 0.8 + "px");
  bottleTopOpen.style("width", bottleWidth * 0.8 + "px");
  //setting a transform-origin to the upper part of the top to rotate it around a choosen corner
  bottleTopOpen.style("transform-origin", "3% 40%");
  bottle.position(width / 2 - bottleWidth / 2, height - bottleHeight - 10);
  bottleTop.position(width / 2 - (bottleWidth * 0.8) / 2, height / 4 - 10);
  bottleTopOpen.position(width / 2 - (bottleWidth * 0.8) / 2, height / 4 - 10);

  //displaying and moving all the existing drops of ketchup
  for (var i = 0; i < allTheDrops.length; i++) {
    allTheDrops[i].display();
    allTheDrops[i].drop();
  }

  //opening the top when the smartphone is flipped
  if (rotationZ > 130 && rotationZ < 220) {
    openTop();
  }
}

// prevent dragging the screen
function touchMoved() {
  return false;
}

//sending a request permission to detect the device orientation on ios
function touchEnded(event) {
  DeviceOrientationEvent.requestPermission();
}

//resizes the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//opens the top if it isn't already open
function openTop() {
  if (bottleTopOpen.hasClass("topOpen") === false) {
    bottleTopOpen.toggleClass("topOpen");
  }
}

//creates a new drop with slightly random size and x-position, then adds it in allTheDrops array
function pour() {
  if (bottleTopOpen.hasClass("topOpen") === true) {
    var ketchupDrop = new KetchupDrop((height / 30) * random(1, 1.5), random(0, 4));
    allTheDrops.push(ketchupDrop);
  }
}

//calls the pour function when the device is shaken
function deviceShaken() {
  pour();
}

//constructor for the ketchup drop object
function KetchupDrop(_size _xOffset) {
  this.x = width / 2 -2 + _xOffset;
  this.y = height / 3;
  this.size = _size;
  this.display = function() {
    noStroke();
    fill(144, 18, 13);
    ellipse(this.x, this.y, _size);
  };
  this.drop = function() {
    this.y -= 15;
  };
}
