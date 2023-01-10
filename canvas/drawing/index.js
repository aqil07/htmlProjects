/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
const showName = document.getElementById('showName')
const eyes = document.querySelectorAll('.eyes')
const imageEl = new Image(50, 50)
imageEl.src = 'the_it_crowd_trio_sofa.jpg'

let text = 'THE IT CROWD'
let textArr = text.split('')
canvas.width = innerWidth
canvas.height = innerHeight / 2
const ctx = canvas.getContext('2d', {
  willReadFrequently: true,
})
//holds elements that builds features
let faceArr = []
let specsArr = []
let MossHairArr = []

imageEl.addEventListener('load', function () {
  let imgData
  ctx.drawImage(imageEl, 0, 0)
  // for(let i =0; i<=50;i++){
  //   imgData = ctx.getImageData(i,i,10,10)

  // }
  imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log(imgData)
  let tmp = imgData.data
  for (let i = 0; i < tmp.length; i += 4) {
    const tot = tmp[i] + tmp[i+1] + tmp[i+2]
    const avgTot = tot /3
    tmp[i] = avgTot
    tmp[i+=5] = avgTot
    tmp[i+=9] = avgTot
  }
  imgData.data = tmp
  ctx.putImageData(imgData,0,0)
  // console.log(imgData.data);
  // let tmp = imgData.data.slice(0,4)
  // console.log(tmp);
  // imgData.data.forEach((e)=>{
  // ctx.putImageData(tmp,100,100)
  // })
})

//typewriter effect
//each action returns a promise
/**
 *
 * @param {*string to type} str
 * @param {*element to append string type effect to} el
 * @param {*type effect speed} delay
 * @param {* whether to type or delete} action
 * @returns
 */
async function typeEffect(str, el, delay = 100, action = 'type') {
  let letters = str.split('')
  let counter = 0
  if (action == 'type') {
    //wait for the promise from the timer below
    //update the element content with the letters from the array
    while (counter < letters.length) {
      await typeBreak(delay)
      el.innerHTML += letters[counter]
      counter++
    }
    return new Promise((resolve, rej) => {
      setInterval(resolve, 1000)
    })
  }

  if (action == 'delete') {
    while (letters.length > 0) {
      //wait for the timer promise
      //remove each element from the letters array
      /*
        Element content = The join() method creates and 
        returns a new string by concatenating all of the elements in an array
      */
      await typeBreak(delay)
      letters.pop()
      el.innerHTML = letters.join('')
    }
    // return
    return new Promise((resolve, rej) => {
      setInterval(resolve, 1000)
    })
  }
}

//type and delete function that awaits promises from  above type effect action calls
async function typeDelete() {
  await typeEffect(text, showName, 100, 'type')
  await typeEffect(text, showName, 100, 'delete')
  await typeEffect(text, showName, 100, 'type')
}

//timer that returns a promise
function typeBreak(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

//generic component
class Component {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

//initializer function
function init() {
  //reset face array
  faceArr = []
  specsArr = []
  MossHairArr = []

  //Moss
  const faceMultiDim = [
    [285, 90, 65, 80],
    [300, 170, 35, 10],
    [305, 180, 25, 10],
  ]
  const specsMultiDim = [
    [275, 118, 78, 8],
    [282, 125, 10, 15],
    [282, 138, 30, 8],
    [312, 125, 10, 15],
    [343, 125, 10, 15],
    [322, 138, 31, 8],
  ]
  const hairMultiDim = [
    [260, 60, 140, 10],
    [250, 70, 150, 10],
    [250, 80, 150, 10],
    [250, 90, 35, 10],
    [260, 100, 25, 10],
    [270, 110, 15, 10],
    [275, 120, 10, 10],
    [300, 20, 10, 50],
    [310, 10, 10, 90],
    [320, 11, 10, 91],
    [330, 18, 10, 93],
    [340, 18, 10, 96],
    [350, 25, 10, 96],
    [360, 35, 10, 76],
    [370, 40, 10, 66],
    [380, 50, 10, 50],
  ]

  //starting values
  let x
  let y
  let w
  let h

  let counter = 0
  let total = faceMultiDim.length + specsMultiDim.length + hairMultiDim.length
  //change values in the loop when certain intervals hit
  //face
  for (let i = counter; i < total; i++) {
    if (i < faceMultiDim.length) {
      ;[x, y, w, h] = faceMultiDim[i]
      if ([x, y, w, h]) {
        x = [x][0]
        y = [y][0]
        w = [w][0]
        h = [h][0]
      }
      faceArr.push(new Component(x, y, w, h, '#C4A484'))
      if (i == faceMultiDim.length - 1) {
        counter = 0
      }
    }
    if (i < specsMultiDim.length) {
      ;[x, y, w, h] = specsMultiDim[i]

      if ([x, y, w, h]) {
        x = [x][0]
        y = [y][0]
        w = [w][0]
        h = [h][0]
      }

      specsArr.push(new Component(x, y, w, h, '#333'))
      if (i == specsMultiDim.length - 1) {
        counter = 0
      }
    }

    if (i < hairMultiDim.length) {
      ;[x, y, w, h] = hairMultiDim[i]

      if ([x, y, w, h]) {
        x = [x][0]
        y = [y][0]
        w = [w][0]
        h = [h][0]
      }

      MossHairArr.push(new Component(x, y, w, h, '#111'))
      //reset loop counter
      if (i == hairMultiDim.length - 1) {
        counter = 0
      }
    }
  }

  animate()
  typeDelete()
}

//animation
async function animate() {
  let timer = 0
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  let maxTimer = timer

  for (
    let i = 0;
    i <= faceArr.length + specsArr.length + MossHairArr.length;
    i++
  ) {
    //controls animation speed
    timer += 50 // (Math.random() * i) / 0.0999
    // setTimeout(() => {
    //   faceArr.slice(i, i + 1).map((e) => {
    //     e.draw()
    //   })
    //   specsArr.slice(i, i + 1).map((e) => {
    //     e.draw()
    //   })
    //   MossHairArr.slice(i, i + 1).map((e) => {
    //     e.draw()
    //   })

    // }, timer)
  }

  // timer -=1
}

//triggers
init()
