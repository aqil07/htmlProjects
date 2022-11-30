let gamePiece
let obstructrion1

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

class game {
  constructor() {
    this.start = function () {
      ctx.width = '500px'
      ctx.height = '300px'
    }
    this.refresh = setInterval(updateGame, 20)
    this.clear = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    this.stop = function () {
      clearInterval(this.refresh)
    }

    window.addEventListener('keydown', (e) => {
      this.keys = this.keys || []
      this.keys[e.key] = true
    })
    window.addEventListener('keyup', (e) => {
      this.keys = this.keys || []
      this.keys[e.key] = false
    })
  }
}

class component {
  constructor(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.update = function () {
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
}

gamePiece = new component(20, 20, 'red', 0, 0)
obstructrion1 = new component(20, 100, 'yellow', 270, 10)
const g = new game()

function resetGlobals() {
  gamePiece = new component(20, 20, 'red', 0, 0)
  obstructrion1 = new component(20, 100, 'yellow', 270, 10)
}

function start() {
  g.start()
  g.refresh
  g.clear()

  //   updateGame()
}

window.addEventListener('load',start)

function gameOver() {
  alert('You crashed')
  // g.stop()
  canvas.removeEventListener('keydown', (e) => {
    console.log('removed', e)
  })
  canvas.removeEventListener('keyup', (e) => {
    console.log('removed', e)
  })
  //reset globals
  resetGlobals()

  let res = prompt('Play agin?', 'yes')
  // console.log(res)
  if (res == 'yes') {
    // start()
    g.refresh
  }else{
    g.stop()
    alert('Thanks for playing. Come again :)')
  }
}

function updateGame() {
  g.clear()
  //   gamePiece.x += 1
  if (g.keys && g.keys['ArrowUp']) {
    gamePiece.y -= 1
  }
  if (g.keys && g.keys['ArrowDown']) {
    gamePiece.y += 1
  }
  if (g.keys && g.keys['ArrowRight']) {
    gamePiece.x += 1
  }
  if (g.keys && g.keys['ArrowLeft']) {
    gamePiece.x -= 1
  }
  obstructrion1.x -= 0.5
  if (obstructrion1.x == gamePiece.x) {
    gameOver()
  }

  //update adds to canvas
  obstructrion1.update()
  gamePiece.update()
  //   g.refresh
}
