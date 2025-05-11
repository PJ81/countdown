class Coord {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

const canvas = document.createElement("canvas");
canvas.id = "myCanvas";
canvas.width = 1400;
canvas.height = 900;
const ctx = canvas.getContext("2d");
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.font = "30px 'Press Start 2P'";
ctx.fillStyle = `hsl(${130}, 100%, 50%)`;

document.body.appendChild(canvas);

const random = (i = 1, a) => {
  if (!a) return Math.random() * i;
  return Math.random() * (a - i) + i;
};

const positions = [];
const coords = [];
const targetDate = new Date("2025-07-12T16:30:00");
const blockSize = 20;
const stp = 8 * blockSize;
const topY = 140;
const bottomY = 460;
const spacingX = 17 * blockSize + blockSize;
const charNow = [0, 0, 0, 0, 0, 0, 0, 0];
const charNext = [0, 0, 0, 0, 0, 0, 0, 0];
const digits = [
  // '0'
  [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  // '1'
  [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
  ],
  // '2'
  [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
  ],
  // '3'
  [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  // '4'
  [
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1],
  ],
  // '5'
  [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  // '6'
  [
    [0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  // '7'
  [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0],
  ],
  // '8'
  [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  // '9'
  [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0],
  ],
];

let startX = canvas.width / 2 - 15 * blockSize / 2;
positions.push(new Coord(startX, topY));
positions.push(new Coord(startX + stp, topY));

startX = canvas.width / 2 - 51 * blockSize / 2;
for (let g = 0; g < 3; g++) {
  const baseX = startX + g * spacingX;
  positions.push(new Coord(baseX, bottomY));
  positions.push(new Coord(baseX + stp, bottomY));
}

for (let z = 0; z < 10; z++) {
  coords.push(getDigitCoords(z));
}

let dt,
  timer = 0,
  lastTime = 0,
  days = 0,
  minutes = 0,
  hours = 0,
  seconds = 0;

animate();

function easeInOutCubic(t) {
  return t < 0.5 ?
    4 * t * t * t :
    1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateDigits(from, to, t) {
  const result = [];
  const easedT = easeInOutCubic(t);

  for (let i = 0; i < 47; i++) {
    const x = from[i].x + (to[i].x - from[i].x) * easedT;
    const y = from[i].y + (to[i].y - from[i].y) * easedT;
    result.push(new Coord(x, y));
  }

  return result;
}

function getDigitCoords(digitIndex) {
  const grid = digits[digitIndex];
  const crds = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        crds.push(new Coord(x, y));
      }
    }
  }

  while (crds.length < 47) {
    crds.push({
      ...crds[crds.length % crds.length]
    });
  }

  crds.sort((a, b) => {
    return random(-1, 1)
  });

  return crds;
}

function drawDigit(digit, posX, posY) {
  const draw = (digit, posX, posY) => {
    const grid = digits[digit];

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 1) {
          ctx.fillRect(posX + x * blockSize, posY + y * blockSize, blockSize, blockSize);
        }
      }
    }
  }

  for (let z = 0; z < digit.length; z++) {
    draw(parseInt(digit.charAt(z)), posX + 7 * blockSize * z + z * blockSize, posY);
  }
}

function drawDigitInterpolation(posX, posY, t, a, b) {
  const grid = interpolateDigits(coords[a], coords[b], t);

  grid.forEach(c => {
    ctx.fillRect(c.x * blockSize + posX, c.y * blockSize + posY, blockSize, blockSize);
  });
}

function doCRT() {
  const b = .5;
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      imageData.data[i] *= b;
      imageData.data[i + 1] *= b;
      imageData.data[i + 2] *= b;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function countdown(dt) {
  const pad = (num) => num.toString().padStart(2, '0');

  if ((timer += dt) >= 1) {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if (diff < 0) diff = 0;

    seconds = Math.floor(diff / 1000) % 60;
    minutes = Math.floor(diff / (1000 * 60)) % 60;
    hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    timer = 0;

    for (let i = 0; i < 8; i++)
      charNow[i] = charNext[i];

    const d = pad(days) + pad(hours) + pad(minutes) + pad(seconds);
    for (let i = 0; i < 8; i++)
      charNext[i] = d[i];
  }

  for (let i = 0; i < 8; i++) {
    const pos = positions[i];
    drawDigitInterpolation(pos.x, pos.y, timer, charNow[i], charNext[i]);
  }

  ctx.fillText("DAYS", (canvas.width >> 1) + 2, 370);
  ctx.fillText("HOURS", (canvas.width >> 1) - 358, 690);
  ctx.fillText("MINUTES", (canvas.width >> 1) + 2, 690);
  ctx.fillText("SECONDS", (canvas.width >> 1) + 362, 690);

  doCRT();
}

function animate(time = 0) {
  dt = Math.min((time - lastTime) / 1000, .25);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  countdown(dt);
  lastTime = time;
  requestAnimationFrame(animate);
}