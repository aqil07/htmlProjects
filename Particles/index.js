/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//particles settings
let particlesArr = []
let maxParticles = (canvas.height * canvas.width) / 999

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
}

// console.log(ctx);
window.addEventListener('mousemove', (e) => {
  mouse.y = e.clientY
  mouse.x = e.clientX
})

//Particle object
class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x
    this.y = y
    this.dirX = dirX
    this.dirY = dirY
    this.size = size
    this.color = color
  }

  draw() {
    //draw circle particle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = 'white'
    ctx.fill()
    // ctx.stroke()
  }
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dirX = -this.dirX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY = -this.dirY
    }

    //check collision detection
    //mouse pos / particle pos
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10
      }
    }
    this.x += this.dirX
    this.y += this.dirY
    //draw particle
    this.draw()
  }
}

//kickstarter
function init() {
  particlesArr = []
  for (let i = 0; i <= maxParticles; i++) {
    let size = 50
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    let dirx = Math.random() * 5 - 2.5
    let diry = Math.random() * 5 - 2.5
    let color = 'white'

    particlesArr.push(new Particle(x, y, dirx, diry, size, color))
  }
}

//animate
function animate() {
  //control animation update speed
  // requestAnimationFrame(() => {
  //   setTimeout(animate, 10)
  // })
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < maxParticles; i++) {
    // particlesArr[i].draw()
    particlesArr[i].update()
  }
}

//reset canvas size depending on window size
window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  mouse.radius = (canvas.width / 80) * (canvas.height / 80)
  init()
})
window.addEventListener('mouseout', () => {
  mouse.x = undefined
  mouse.y = undefined
})
init()
animate()
