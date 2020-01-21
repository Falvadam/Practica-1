 const canvas = document.querySelector('canvas')
 const ctx = canvas.getContext('2d')
 const obstacles = []
 let interval
 let frames = 0
 let score = 0
 
 const imgs = {
   character1: './imagenes/tierra 100%.png',
   character: './imagenes/Nave1.png',
   background: './imagenes/universo.png',
   asteroide1: './imagenes/0492.png',
   asteroide2: './imagenes/b06ae99d174d7f3.png'
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
     ctx.drawImage(
       this.img,
       this.x + this.width,
       this.y,
       this.width,
       this.height
     )
     ctx.font = '50px Avenir'
     ctx.fillStyle = 'white'
   }
 }

 class character1{
    constructor() {
        this.x = 500
        this.y = 800
        this.width = 80
        this.height = 200
        this.img = new Image()
        this.img.src = imgs.character1
        this.img.onload = () => {
          this.draw()
        }
      }
      draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(
          this.img,
          this.x + this.width,
          this.y,
          this.width,
          this.height
        )
      }
    }

    
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
 
 class Character {
   constructor(x, y) {
     this.x = x
     this.y = y
     this.width = 100
     this.height = 100
     this.sx = 0
     this.sy = 0
     this.img = new Image()
     this.img.src = imgs.character
     this.img.onload = () => {
       this.draw()
     }
   }
   draw() {
     if (this.sx >= 2040) this.sx = 0
     ctx.drawImage(
       this.img,
       this.sx,
       this.sy,
       340,
       238,
       this.x,
       this.y,
       this.width,
       this.height
     )
   }
   goRight() {
     if (this.x > canvas.width - 100) return
     this.x += 10
     this.move()
   }
   goLeft() {
     this.x -= 10
     this.move()
   }
   goUp() {
     this.y -= 10
     this.move()
   }
   goDown() {
     this.y += 10
     this.move()
   }
   move() {
     this.sx += 340
   }
   isTouching(obstacle) {
     return (
       this.x < obstacle.x + obstacle.width &&
       this.x + this.width > obstacle.x &&
       this.y < obstacle.y + obstacle.height &&
       this.y + this.height > obstacle.y
     )
   }
 }
 
 const nave = new Character(0, canvas.height - 200)
 const universe = new Background()
 
 function startGame() {
   if (interval) return
   universe.audio.play()
   interval = setInterval(update, 1000 / 60)
 }
 
 function generateObstacles() {
   let img, rnd
   if (frames % 100 === 0) {
     rnd = Math.random() * canvas.height
     if (Math.random() >= 0.5) img = imgs.asteroide2
     else img = imgs.asteroide1
     obstacles.push(new Obstacle(canvas.width + 100, rnd, img))
   }
 }
 
 function drawObstacles() {
   generateObstacles()
   obstacles.forEach(obstacle => obstacle.draw())
 }
 
 function checkCollitions() {
   obstacles.forEach((obstacle, idx) => {
     if (nave.isTouching(obstacle)) {
       if (obstacle.img.src === imgs.asteroide2) score += 10
       else score -= 20
       return obstacles.splice(idx, 1)
     }
   })
 }
 
 function update() {
   frames++
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   universe.draw()
   nave.draw()
   drawObstacles()
   checkCollitions()
   ctx.fillText(String(score), canvas.width - 100, 100)
 }
 
 document.addEventListener('keydown', ({ keyCode }) => {
   switch (keyCode) {
     case 39:
       return nave.goRight()
 
     case 38:
       return nave.goUp()
 
     case 37:
       return nave.goLeft()
 
     case 40:
       return nave.goDown()
 
     case 13:
       return startGame()
   }
 })
 
 document.querySelector('button').onclick = () => {
   if (canvas.webkitRequestFullScreen) {
     canvas.webkitRequestFullScreen()
   } else {
     canvas.mozRequestFullScreen()
   }
 }