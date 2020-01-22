 const canvas = document.querySelector('canvas')
 const ctx = canvas.getContext('2d')
 const obstacles = []
 const shoots = [];

 let interval
 let frames = 0
 let score = 0
 let keys = [];
 
 
 const imgs = {
   character1: './imagenes/tierra100.png',
   character2: './imagenes/Copia de Nave1.png',
   character3: './imagenes/Copia de Nave1 2.png',
   character4: './imagenes/Copia de Nave1 3.png',
   character: './imagenes/Nave1.png',
   background: './imagenes/universo.png',
   asteroide1: './imagenes/0492.png',
   asteroide2: './imagenes/b06ae99d174d7f3.png',
   disparo: './imagenes/Captura de Pantalla 2020-01-21 a la(s) 18.44.09.png'
 }
 
 class Background {
   constructor() {
     this.x = 0
     this.y = 0
     this.width = canvas.width
     this.height = canvas.height
     this.img = new Image()
     this.img.src = imgs.background
     this.img.onload = () => {
       this.draw()
     }
     this.audio = new Audio()
     this.audio.src = './imagenes/la-brisa_1.mp3'
     this.audio.loop = true
   }
   draw() {
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
     ctx.font = '50px Avenir'
     ctx.fillStyle = 'white'
   }
 }
 
 class Player{
     constructor(x,y,cwidth,cheight){
     this.x = 500
     this.y = 200
     this.width = 230
     this.height = 230
     this.hp = 500
     this.img = new Image()
     this.img.src = imgs.character1
     this.img.onload = () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
     }
    }
    draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
 }
 damage() {
  this.hp = this.hp - 35
}


}

class Disparos {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 70;
      this.height = 15;
      this.img = new Image();
      this.img.src = imgs.disparo
      this.img.onload = () => {
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
      }
    }
  draw() {
      this.x += 10;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  fire() { 
    this.x += 10;
    this.img.src = imgs.disparo
}
} 

class Ship{
    constructor(){
        this.x = 100
        this.y = 100
        this.width = 50
        this.height = 50
        this.vel = 0
        this.img = new Image()
        this.img.src = imgs.character
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    accelerate() {
            this.y -= 50;
            this.img.src = imgs.character
        
    }
    brake() {
            this.y += 50;  
            this.img.src = imgs.character4
    }
    turnLeft() {
        this.x -= 50;
        this.img.src = imgs.character3
    }
    turnRight() {
        this.x += 50;
        this.img.src = imgs.character2
    }    
}

 class Obstacle {
   constructor(x, y, imgSrc) {
     this.x = x
     this.y = y
     this.width = 50
     this.height = 50
     this.img = new Image()
     this.img.src = imgSrc
   }
   draw() {
     this.x--
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
   }
 }
 
 const universe = new Background()
 const player = new Player()
 const ship = new Ship()
 const shoot = new Disparos()

 function startGame() {
   if (interval) return
   universe.audio.play()
   interval = setInterval(update, 1000 / 60)
 }
 
 function generateObstacles() {
    let img, rnd
    if (frames % 100 === 0) {
      rnd = Math.random() * canvas.height
      if (Math.random() >= 0.5) img = imgs.asteroide1
      else img = imgs.asteroide2
      obstacles.push(new Obstacle(canvas.width + 100, rnd, img))
    }
  }
  
  function drawObstacles() {
    generateObstacles()
    obstacles.forEach(obstacle => obstacle.draw())
  }
 
  function checkCollitions() {
    obstacles.forEach((obstacle, idx) => {
      if (ship.isTouching(obstacle)) {
        if (obstacle.img.src === imgs.asteroide1) score += 10
        else score -= 20
        return obstacles.splice(idx, 1)
      }
    })
  }
 
  function drawShoots() {
    shoots.forEach(shoot => shoot.draw());
  }
 
 function update() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   universe.draw()
   player.draw()
   ship.draw()
   shoot.draw()
   drawObstacles()
   //checkCollitions()
   ctx.fillText(String(score), canvas.width - 100, 100)
 }

 
function drawLife() {
  ctx.fillStyle = 'gray'
  ctx.fillRect(25, 25, 350, 40);
  ctx.fillRect(canvas.width - 375, 25, 350, 40);
  // ctx.drawImage()
  ctx.fillStyle = 'white'
  ctx.fillRect(30, 30, (340 * character.hp) / 250, 30);
  ctx.fillRect(canvas.width - 370, 30, (340 * boot.hp) / 250, 30);
}


 document.addEventListener('keydown', ({ keyCode }) => {
   switch (keyCode) {
     case 39:
       return ship.turnRight()
 
     case 38:
       return ship.accelerate()
 
     case 37:
       return ship.turnLeft()
 
     case 40:
       return ship.brake()
 
     case 13:
       return startGame()

     case 32:
       return fire()
    }
 })

 
/*document.querySelector('button').onclick = () => {
//    if (canvas.webkitRequestFullScreen) {
//      canvas.webkitRequestFullScreen()
//    } else {
//      canvas.mozRequestFullScreen()
//    }
//  }
*/
