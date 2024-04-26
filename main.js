// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function calculateGravity(mass1, mass2, distance) {
  const G = 6674 * Math.pow(10, -11);
  return (G * mass1 * mass2) / (distance * distance);
}

class Body {
  constructor(x, y, velX, velY, color, size, mass) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.mass = mass;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // if (this.x + this.size >= width) {
    //   this.velX = -Math.abs(this.velX);
    // }

    // if (this.x - this.size <= 0) {
    //   this.velX = Math.abs(this.velX);
    // }

    // if (this.y + this.size >= height) {
    //   this.velY = -Math.abs(this.velY);
    // }

    // if (this.y - this.size <= 0) {
    //   this.velY = Math.abs(this.velY);
    // }

    this.x += this.velX;
    this.y += this.velY;
  }

  applyForce(forceX, forceY) {
    this.velX += (forceX / this.mass);
    this.velY += (forceY / this.mass);
  }

  applyGravity() {
    for (const body of balls) {
      if (!(this === body)) {
        const dx = this.x - body.x;
        const dy = this.y - body.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = calculateGravity(this.mass, body.mass, distance);

        const forceX = -force * (dx / distance);
        const forceY = -force * (dy / distance);
        this.applyForce(forceX, forceY);
      }
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}


let balls = []

// while (balls.length < 2) {
//   const size = random(10, 20);
//   const ball = new Body(
//     // ball position always drawn at least one ball width
//     // away from the edge of the canvas, to avoid drawing errors
//     random(0 + size, width - size),
//     random(0 + size, height - size),
//     random(-0.1, 0.1),
//     random(-0.1, 0.1),
//     // 0,
//     // 0,
//     randomRGB(),
//     size,
//     size * Math.pow(10, 9)
//   );

//   balls.push(ball);
// }


function tick() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.applyGravity();
    ball.collisionDetect();
  }
}


document.addEventListener("keydown", e => {
  if (e.key == "Enter") {
    requestAnimationFrame(tick);   
  }
})

document.addEventListener("click", e => {
  const size = random(10, 20);
  const ball = new Body(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    e.x,
    e.y,
    0,
    0,
    randomRGB(),
    size * 10,
    size * Math.pow(10, 11)
  );

  balls.push(ball);
  requestAnimationFrame(tick);
})

document.addEventListener("contextmenu", e => {
  const size = random(1, 5);
  const ball = new Body(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    e.x,
    e.y,
    random(-13, 13),
    random(-13, 13),
    randomRGB(),
    size,
    size * Math.pow(10, 8)
  );

  balls.push(ball);
  requestAnimationFrame(tick);
})
