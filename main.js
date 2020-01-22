 const canvas = document.querySelector('canvas')
 const ctx = canvas.getContext('2d')
 const obstacles = []
 
 let interval
 let frames = 0
 let score = 0
 let keys = [];
 let bullets = [];
 
 const imgs = {
   character1: './imagenes/tierra100.png',
   character2: './imagenes/Copia de Nave1.png',
   character3: './imagenes/Copia de Nave1 2.png',
   character4: './imagenes/Copia de Nave1 3.png',
   character: './imagenes/Nave1.png',
   background: './imagenes/universo.png',
   asteroide1: './imagenes/0492.png',
   asteroide2: './imagenes/b06ae99d174d7f3.png',
   bala: './imagenes/Captura de Pantalla 2020-01-21 a la(s) 18.44.09.png'
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
     this.hp = 1000
     this.img = new Image()
     this.img.src = imgs.character1
     this.img.onload = () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
     }
    }
    draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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

/*class Disparos{
  constructor(){
    this.x = 20
    this.y = 20
    this.width = 20
    this.height = 20
    this.img = new Image()
    this.img.src = imgs.bala
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  draw()
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}
}
*/


 class Obstacle {
   constructor(x, y, imgSrc) {
     this.x = x
     this.y = y
     this.width = 100
     this.height = 100
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
 //const bala = new Disparos()

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
      if (nyan.isTouching(obstacle)) {
        if (obstacle.img.src === imgs.taco) score += 10
        else score -= 20
        return obstacles.splice(idx, 1)
      }
    })
  }
 
 
 function update() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   universe.draw()
   player.draw()
   ship.draw()
   bala.draw()
   drawObstacles()
   checkCollitions()
   ctx.fillText(String(score), canvas.width - 100, 100)
 }

 /*function fire(){
     bullets.push({
       x: character.x - 20, 
       y: character.y - 20,
       width: 20,
       height: 20
     })
     
 }

 /*function dibujarDisparo(){
   ctx.save();
   ctx.fillStyle = "white"
   for(let i in bullets){
     let disparos = bullets[i]
     ctx.fillRect(bullets.x, bullets.y, disparos.width, disparos.height)
   }
   ctx.restore() 
  }
*/
 
 
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
 
//  document.querySelector('button').onclick = () => {
//    if (canvas.webkitRequestFullScreen) {
//      canvas.webkitRequestFullScreen()
//    } else {
//      canvas.mozRequestFullScreen()
//    }
//  }



 update()
 