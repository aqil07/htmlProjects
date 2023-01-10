/** @type {HTMLCanvasElement} */
//get canvas element
const canvas = document.getElementById('canvas')
//canvas contxt 2d
const ctx = canvas.getContext('2d')
//set canvas to window dimensions
canvas.width = innerWidth
canvas.height = innerHeight

//particle variables
let particles = []
const particleCount = (canvas.height * canvas.width) / 900
let mouseInput = {
  x: null,
  y: null,
  size: (canvas.height / 100) * (canvas.width / 100),
}

window.addEventListener('DOMContentLoaded', () => {
  mouseInput.x = undefined
  mouseInput.y = undefined
})

window.addEventListener('mousemove', (e) => {
  mouseInput.x = e.clientX
  mouseInput.y = e.clientY
})

//object on canvas
//particle
class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x
    this.y = y
    this.dirX = dirX
    this.dirY = dirY
    this.size = size
    this.color = color
  }

  //draws shape on the canvas
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
  update() {
    //handles the particle position when it gets to the canvas sides
    //changes the particle direction on X and Y axes
    if (this.x > canvas.width || this.x < 0) {
      this.dirX = -this.dirX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY = -this.dirY
    }
    //collision detection
    let dx = mouseInput.x - this.x
    let dy = mouseInput.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < mouseInput.size + this.size) {
      if (mouseInput.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10
      }
      if (mouseInput.x > this.x && this.x > this.size * 10) {
        // this.x -=0
      }
      if (mouseInput.y < this.y && this.y < canvas.height - this.size * 10) {
        // this.y += 10
      }
      if (mouseInput.y > this.y && this.y > this.size * 10) {
        // this.y -= 10
      }
    }
    this.x += this.dirX
    this.y += this.dirY

    this.draw()
  }
}

function connect() {
  for (let x = 0; x < particles.length; x++) {
    for (let z = x; z < particles.length; z++) {
      // distance = Math.sqrt(dx * dx + dy * dy)
      let pDist =
        (particles[x].x - particles[z].x) * (particles[x].x - particles[z].x) +
        (particles[x].y - particles[z].y) * (particles[x].y - particles[z].y)
      if (pDist < (canvas.width / 5) * (canvas.height /7)) {
        ctx.lineWidth = 0.5
        ctx.strokeStyle = '#111'
        ctx.beginPath()
        ctx.moveTo(particles[x].x, particles[x].y)
        ctx.lineTo(particles[z].x, particles[z].y)
        ctx.stroke()
      }
    }
  }
}

//initializer
function init() {
  //reset array incase it is not empty
  particles = []

  for (let i = 0; i < particleCount; i++) {
    let size = Math.random() * 5 + 1
    let dirX = Math.random() * 5 - 2.5
    let dirY = Math.random() * 5 - 2.5
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    let color = 'red'
    particles.push(new Particle(x, y, dirX, dirY, size, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  for (let p = 0; p < particleCount; p++) {
    particles[p].update()
  }
  // connect()
}

window.addEventListener('mouseout', () => {
  mouseInput.x = undefined
  mouseInput.y = undefined
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  mouseInput.size = (canvas.height / 80) * (canvas.width / 80)
  init()
})

init()
animate()
