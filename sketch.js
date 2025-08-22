let capture;
let started = false;
let vidAspect = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // wait until camera starts
  // Move click handler setup inside setup so we can use once option
  const btn = document.getElementById('startBtn');
  btn.addEventListener('click', startCamera, { once: true });
}

function startCamera() {
  capture = createCapture({
    video: { facingMode: { ideal: 'environment' } },
    audio: false
  }, () => {
    // metadata may not be ready immediately; poll until dimensions known
    const checkDims = () => {
      if (capture.width && capture.height) {
        vidAspect = capture.width / capture.height;
      } else {
        setTimeout(checkDims, 50);
      }
    };
    checkDims();
    started = true;
    loop();
  });
  capture.hide();
  document.getElementById('startBtn').style.display = 'none';
}

function draw() {
  background(0);
  if (!started || !capture) return;
  const vw = capture.width || 1;
  const vh = capture.height || 1;
  // aspect-preserving fit (letterbox)
  const scale = Math.min(width / vw, height / vh);
  const drawW = vw * scale;
  const drawH = vh * scale;
  const dx = (width - drawW) / 2;
  const dy = (height - drawH) / 2;
  image(capture, dx, dy, drawW, drawH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
