/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
let dashLen = 200,
  dashOffset = dashLen,
  speed = 4,
  txt = 'Hello World',
  x = 10,
  i = 0

ctx.font = '30px Arial'
ctx.lineWidth = 2
ctx.lineJoin = 'round'
ctx.globalAlpha = 0.5

ctx.strokeStyle = ctx.fillStyle = 'blue' 

;(function loop() {
  ctx.clearRect(x, 0, 60, 150)
  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed])
  dashOffset -= speed
  ctx.strokeText(txt[i], x, 90)

  if (dashOffset > 0) requestAnimationFrame(loop) //draws the first letter
  else {
    ctx.fillText(txt[i], x, 90) //draws the next letter
    dashOffset = dashLen //resets the gaps between the linestroke to length of the linestroke
    x += ctx.measureText(txt[i++]).width + 1 * ctx.lineWidth //stores the position of current letter + 2
    if (i < txt.length) requestAnimationFrame(loop)
  }
})()
