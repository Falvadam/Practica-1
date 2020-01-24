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
let timerText = 'Timer:'
let timer = 30
const final = "///Users/macbookpro/Desktop/ironhack/Juego/GameOver.html"

const imgs = {
  naveizq: "./imagenes/Copia de Nave_Enemiga-1 3.png",
  naveaba: "./imagenes/Copia de Nave_Enemiga-1 2.png",
  naveder: "./imagenes/Copia de Nave_Enemiga-1.png",
  nave2arr: "./imagenes/Nave_Enemiga-1.png",
  planeta50: "./imagenes/tierra 50%.png",
  planeta25: "./imagenes/tierra 25%.png",
  planeta0: "./imagenes/planeta-explotado-pixilart (1).png",
  character1: "./imagenes/tierra100.png",
  character2: "./imagenes/Copia de Nave1.png",
  character3: "./imagenes/Copia de Nave1 2.png",
  character4: "./imagenes/Copia de Nave1 3.png",
  character: "./imagenes/Nave1.png",
  background: "./imagenes/universo.png",
  asteroide1: "./imagenes/0492.png",
  asteroide2: "./imagenes/b06ae99d174d7f3.png",
  rocket: "./imagenes/Captura de Pantalla 2020-01-21 a la(s) 18.44.09.png",
  gameO: "./imagenes/DTSsNQDWkAAp0aE.jpg_large"
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
    this.draw();}
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
    this.x = 100;
    this.y = 200;
    this.width = 230;
    this.height = 230;
    this.hp = 500;
    this.img = new Image();
    this.img.src = imgs.character1
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  planetas(){
    if(this.hp == 500){
     this.img.src = imgs.character
    }if(this.hp == 400){
      this.img.src = imgs.planeta50
    }if(this.hp == 170){
      this.img.src = imgs.planeta25
    }if(this.hp == 50){
      this.img.src = imgs.planeta0
    }
    this.img.onload = () => {
      ctx.drawImage(this.img.src, this.x, this.y, this.width, this.height);
  }
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
    this.hp = 50;
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
}

class Ship1 {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 50;
    this.height = 50;
    this.hp = 50;
    this.vel = 0;
    this.img = new Image();
    this.img.src = imgs.nave2arr;
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  accelerate1() {
    this.y -= 50;
    this.img.src = imgs.nave2arr;
  }
  brake1() {
    this.y += 50;
    this.img.src = imgs.naveaba;
  }
  turnLeft1() {
    this.x -= 50;
    this.img.src = imgs.naveizq;
  }
  turnRight1() {
    this.x += 50;
    this.img.src = imgs.naveder;
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
    const a = new Rocket(this.x + this.width, this.y + this.height / 2 - 12);
    shoots.push(a);
  }
}


class Obstacle {
  constructor(y) {
    this.x = 1300;
    this.y = y;
    this.hp = 30;
    this.daño = 30;
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
    this.x--;
  }
  isTouching(Rocket) {
    return (
      this.x < Rocket.x + Rocket.width &&
      this.x + this.width > Rocket.x &&
      this.y < Rocket.y + Rocket.height &&
      this.y + this.height > Rocket.y
    );
  }
  }

class Rocket {
  constructor() {
    this.x = ship.x;
    this.y = ship.y;
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = imgs.rocket;
  }
  draw() {
    this.x += 10;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  isTouching(obstacle) {
    return (
      this.x < Rocket.x + Rocket.width &&
      this.x + this.width > Rocket.x &&
      this.y < Rocket.y + Rocket.height &&
      this.y + this.height > Rocket.y
    );
  }
}
const universe = new Background();
const player = new Player();
const ship = new Ship();
const ship1 = new Ship1();
const rocket = new Rocket();
//Funciones

function generateObstacles() {
  let roca = 30;
  let randomWidth = Math.floor(Math.random() * canvas.height);
  if (frames % 5 === 0) {
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
  obstaclesArr.forEach((obstacle,index) => {
    if (
      (ship.isTouching(obstacle) && obstacle.status === 1) ||
      (ship1.isTouching(obstacle) && obstacle.status === 1) ||
      (player.isTouching(obstacle) && obstacle.status === 1) ||
      (rocket.isTouching(obstacle) && obstacle.status === 1)  
      ) {obstaclesArr.splice(index, 1)
        player.hp -= 20
        if(player.hp === 0){
          gameOver()
        }

      console.log(player.hp)
      console.log("Colision de obstaculo con nave");
      console.log(obstacle, ship);
    }
    })
    shoots.forEach((shoot, i)=> {
      obstaclesArr.forEach((obstacle, j)  => {
        if (obstacle.isTouching(shoot)) 
        {shoots.splice(i, 1)
          obstaclesArr.splice(j, 1)
      
        }
      })
    })}

function drawSeconds() {
  timer.toString()
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(timer, 1050, 100, 300)
}

function drawTimer() {
     ctx.font = '30px Arial'
      ctx.fillStyle = 'white'
      ctx.fillText(timerText + timer, 950, 100, 300)
}

function checkstatustime() {
    timer -= 1
    console.log(timer)
    if (timer == 0) {
        return gameWin()
    }
    }


function gameOver() {
  clearInterval(interval);
  abrir_Popup()
}

function gameWin(){
clearInterval(interval)
abrir_Popup2()
}

// function gameOverMessague() {



function generateBullets(x, y) {
  shoots.forEach(shoot => shoot.draw());
}

function drawBullets() {
  shoots.forEach(shoot => shoot.draw());
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

var objeto_window_referencia1;
var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

function abrir_Popup() {
  objeto_window_referencia1 = window.open("./GameOver.html", "ThrillerSpace", configuracion_ventana);
}    


var objeto_window_referencia2;
var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

function abrir_Popup2() {
  objeto_window_referencia2 = window.open("./gameWin.html", "ThrillerSpace", configuracion_ventana);
}              

function startGame() {
  if (interval) return;
  universe.audio.play();
  interval = setInterval(update, 1000 / 60);
  intervals = setInterval(checkstatustime, 1000 )
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  universe.draw();
  drawTimer();
  player.draw();
  ship.draw();
  ship1.draw();
  // checkstatustime()
  generateObstacles();
  drawObstacles();
  checkCollition();
  drawBullets();
  checkCollitionBullets();
  drawLife();
}

function drawLife() {
  ctx.fillStyle = "gray";
  ctx.fillRect(15, 25, 200, 40);

  ctx.fillStyle = "white";
  ctx.fillRect(30, 30, (player.hp * 170) / 500, 30);
}

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
    
    case 68:
      return ship1.turnRight1();

    case 87:
      return ship1.accelerate1();

    case 65:
      return ship1.turnLeft1();

    case 83:
      return ship1.brake1();

    case 69:
      return ship1.shoot1();

  }
})
// document.querySelector('button').onclick = () => {
//      if (canvas.webkitRequestFullScreen) {
//       canvas.webkitRequestFullScreen()
//      } else {
//        canvas.mozRequestFullScreen()
//      }
//    }
 

update()
