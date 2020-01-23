//Conexión con HTML

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Variables Globales

const obstaclesArr = [];
const shootsArr = [];
const friction = 0.002;
let interval;
let frames = 0;
let score = 0;
let keys = [];
const shoots = [];

const imgs = {
  character1: "./imagenes/tierra100.png",
  character2: "./imagenes/Copia de Nave1.png",
  character3: "./imagenes/Copia de Nave1 2.png",
  character4: "./imagenes/Copia de Nave1 3.png",
  character: "./imagenes/Nave1.png",
  background: "./imagenes/universo.png",
  asteroide1: "./imagenes/0492.png",
  asteroide2: "./imagenes/b06ae99d174d7f3.png",
  rocket: "./imagenes/Captura de Pantalla 2020-01-21 a la(s) 18.44.09.png"
};

//Constructores

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = imgs.background;
    this.img.onload = () => {
      this.draw();
    };
    this.audio = new Audio();
    this.audio.src = "./imagenes/la-brisa_1.mp3";
    this.audio.loop = true;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "50px Avenir";
    ctx.fillStyle = "white";
  }
}

class Player {
  constructor(x, y, cwidth, cheight) {
    this.x = 500;
    this.y = 200;
    this.width = 230;
    this.height = 230;
    this.hp = 100;
    this.img = new Image();
    this.img.src = imgs.character1;
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  damage() {
    this.hp = this.hp - 20;
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width - 10 &&
      this.x + this.width > obstacle.x + 10 &&
      this.y < obstacle.y + obstacle.height - 20 &&
      this.y + this.height > obstacle.y + 10
    );
  }
}

class Ship {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 50;
    this.height = 50;
    this.hp = 500;
    this.vel = 0;
    this.img = new Image();
    this.img.src = imgs.character2;
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  accelerate() {
    this.y -= 50;
    this.img.src = imgs.character;
  }
  brake() {
    this.y += 50;
    this.img.src = imgs.character4;
  }
  turnLeft() {
    this.x -= 50;
    this.img.src = imgs.character3;
  }
  turnRight() {
    this.x += 50;
    this.img.src = imgs.character2;
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width - 10 &&
      this.x + this.width > obstacle.x + 10 &&
      this.y < obstacle.y + obstacle.height - 20 &&
      this.y + this.height > obstacle.y + 10
    );
  }
  shoot() {
    const w = new Rocket(this.x + this.width, this.y + this.height / 2 - 12);
    shoots.push(w);
  }
  damage1() {
    this.hp = this.hp - 40;
  }
}
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = 0;
    this.hp = 30;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = imgs.asteroide1;
    this.status = 1;
    this.speed = 1;
    this.velY = 0;
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.y++;
  }
  isTouching(Rocket) {
    return (
      this.x < Rocket.x + Rocket.width &&
      this.x + this.width > Rocket.x &&
      this.y < Rocket.y + Rocket.height &&
      this.y + this.height > Rocket.y
    );
  }
  damage1() {
    this.hp = this.hp - 40;
  }
}
class Rocket {
  constructor() {
    this.x = ship.x;
    this.y = ship.y;
    // this.vx = 0
    // this.vy = 0
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = imgs.rocket;
    //  this.img.onload = () => {
    //    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    //  }
  }
  draw() {
    this.x += 10;
    ctx.drawImage(this.img, this.x, this.y + 50, this.width, this.height);
  }
  //   shoot() {
  //   this.Ship += 50;
  //   this.img.src = imgs.rocket
  // }
}

const universe = new Background();
const player = new Player();
const ship = new Ship();
const rocket = new Rocket();

//Funciones

function generateObstacles() {
  let roca = 30;
  let randomWidth = Math.floor(Math.random() * canvas.width);
  if (frames % 50 === 0) {
    let obs1 = new Obstacle(randomWidth);
    obstaclesArr.push(obs1);
  }
}

function drawObstacles() {
  obstaclesArr.forEach(obstacle => {
    if (obstacle.status === 1) obstacle.draw();

    //Obstacle movimiento
    obstacle.velY;
    obstacle.y += obstacle.velY;
    obstacle.velY *= friction;
  });
}

function checkCollition() {
  obstaclesArr.forEach(obstacle => {
    if (
      (ship.isTouching(obstacle) && obstacle.status === 1) ||
      (player.isTouching(obstacle) && obstacle.status === 1)
    ) {
      gameOver();
      console.log("Colision de obstaculo con nave");
      console.log(obstacle, ship);
    }
  });
}

// shoots.forEach((obstacle, index) => {
//   if (obstacle.touchPlayer(obstacle)) {
//     shoots.splice(index, 1);
//     player.damage();
//   }
// });

// if (player.hp === 0) {
//   gameOver();
// }

function gameOver() {
  clearInterval(interval);
  console.log("GAME OOOOOVVVVVEEEEEER");
  gameOverMessague();
}

function gameOverMessague() {
  ctx.fillStyle = "#FF0000";
  ctx.font = "70px Voyager";
  ctx.fillText(`Game over X__X`, 150, canvas.height / 2);
}

function generateBullets(x, y) {
  shoots.forEach(shoot => shoot.draw());
}

function drawBullets() {
  shoots.forEach(shoot => shoot.draw());

  // shootsArr.forEach((shoot) => {
  //   if(shoot.status === 1) shoot.draw()

  //   //Obstacle movimiento
  //   shoot.velY--
  //   shoot.y += shoot.velY
  //   shoot.velY *= friction
  // })
}

function checkCollitionBullets() {
  shootsArr.forEach(shoot => {
    obstaclesArr.forEach(obstacle => {
      if (
        obstacle.isTouching(shoot) &&
        obstacle.status === 1 &&
        shoot.status === 1
      ) {
        obstacle.status = 0;
        shoot.status = 0;
        console.log("OBSTACLE DESTROYED!!!");
      }
    });
  });
}

function startGame() {
  if (interval) return;
  universe.audio.play();
  interval = setInterval(update, 1000 / 60);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  universe.draw();
  player.draw();
  ship.draw();
  //rocket.draw()
  //shoot.draw()
  generateObstacles();
  drawObstacles();
  checkCollition();
  drawBullets();
  checkCollitionBullets();
  drawLife();
  ctx.fillText(String(score), canvas.width - 100, 100);
}

function drawLife() {
  ctx.fillStyle = "gray";
  ctx.fillRect(25, 25, 30, 40);
  ctx.fillRect(30, 25, 30, 40);

  ctx.fillStyle = "white";
  ctx.fillRect(30, 30, (30 * player.hp) / 30, 30);
  ctx.fillRect(30, 30, (30 * ship.hp) / 30, 30);
}

//Escuchar eventos

document.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 39:
      return ship.turnRight();

    case 38:
      return ship.accelerate();

    case 37:
      return ship.turnLeft();

    case 40:
      return ship.brake();

    case 13:
      return startGame();

    case 32:
      return ship.shoot();
  }
});

/*document.querySelector('button').onclick = () => {
 //    if (canvas.webkitRequestFullScreen) {
 //      canvas.webkitRequestFullScreen()
 //    } else {
 //      canvas.mozRequestFullScreen()
 //    }
 //  }
 */

update();
