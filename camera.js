let capture;
let started = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // wait until camera starts
}

function draw() {
  if (started && capture) {
    // draw the camera feed to cover canvas
    image(capture, 0, 0, width, height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.getElementById("startBtn").addEventListener("click", () => {
  // start camera on user gesture (needed on iOS Safari)
  capture = createCapture({
    video: { facingMode: { ideal: "environment" } },
    audio: false
  }, () => {
    started = true;
    loop();
  });
  capture.hide(); // hide default <video> element
  document.getElementById("startBtn").style.display = "none";
});
