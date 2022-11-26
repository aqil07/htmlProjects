/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('root')
//canvas context
let ctx = canvas.getContext('2d')
//radius of the circle
let radius = canvas.height / 2
//set circle in the center of the canvas
ctx.translate(radius / 0.77, radius / 0.96)
//resize the radius to fit smaller inside the canvas
radius = radius * 0.9
setInterval(draw, 1000)
// draw()

//draw clock
function draw() {
  drawFace(ctx, radius)
  clockNumbers(ctx, radius)
  getTime(ctx, radius)
}

function drawFace(context, radius) {
  //variable to draw colors for the clock-face
  let gradient

  //start drawing
  context.beginPath()
  //circle
  context.arc(0, 0, radius, 0, 2 * Math.PI)
  //inside color
  context.fillStyle = 'white'
  //apply above
  context.fill()

  //radial gradient for inside circle
  gradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
  //colors for inside, mid and outer of circle
  gradient.addColorStop(0, '#111')
  gradient.addColorStop(0.5, '#fff')
  gradient.addColorStop(1, 'red')
  context.strokeStyle = gradient
  context.lineWidth = radius * 0.1
  context.stroke()

  //start drawing
  context.beginPath()
  //circle
  context.arc(0, 0, radius, 0, 2 * Math.PI)
  //inside color
  context.fillStyle = 'blue'
  //apply above
  context.fill()
}

//handles numbers on the clock and their positioning and styling
function clockNumbers(context, radius) {
  let angle, num
  context.font = radius * 0.15 + 'px arial'
  context.textBaseline = 'middle'
  context.fillStyle = 'white'
  context.textAlign = 'center'

  //loop set to iterate until 12
  /**
   * Each number gets converted to a string
   * Gets positioning on the canvas
   * Then gets rotated
   */
  let end = 13
  for (num = 1; num < end; num++) {
    angle = (num * Math.PI) / 6
    context.rotate(angle)
    context.translate(0, -radius * 0.85)
    context.rotate(-angle)
    context.fillText(num.toString(), 0, 0)
    context.rotate(angle)
    context.translate(0, radius * 0.85)
    context.rotate(-angle)
  }
}
/**
 * gets time
 * converts the hours,minutes and seconds into angles to render the lines drawn
 */
function getTime(context, radius) {
  let time = new Date()
  let hour = time.getHours()
  let min = time.getMinutes()
  let sec = time.getSeconds()

  hour = hour % 12
  hour =
    (hour * Math.PI) / 6 +
    (min * Math.PI) / (6 * 60) +
    (sec * Math.PI) / (360 * 60)
  drawHands(context, hour, radius * 0.5, radius * 0.07, '#ffff')

  min = (min * Math.PI) / 30 + (sec * Math.PI) / (30 * 60)
  drawHands(context, min, radius * 0.5, radius * 0.07, '#111')

  sec = (sec * Math.PI) / 30
  drawHands(context, sec, radius * 0.5, radius * 0.07, 'red')
}

//draws lines to point to numbers on clock
function drawHands(context, pos, leng, wid, color) {
  context.beginPath()
  context.lineWidth = wid
  context.lineCap = 'round'
  context.moveTo(0, 0)
  context.rotate(pos)
  context.lineTo(0, -leng)
  context.strokeStyle = color
  context.stroke()
  ctx.rotate(-pos)
}
