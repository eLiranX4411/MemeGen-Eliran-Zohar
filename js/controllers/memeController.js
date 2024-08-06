'use strict'

var gCtx
var gElCanvas
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

document.addEventListener('DOMContentLoaded', () => {
  renderMeme()
  addListeners()
})

function renderMeme() {
  gElCanvas = document.querySelector('.canvas-board')
  const gCtx = gElCanvas.getContext('2d')

  const meme = getMeme()
  const img = new Image()
  const selectedImg = getImgById(meme.selectedImgId)

  img.src = selectedImg.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line, idx) => {
      gCtx.font = `${line.size}px Arial`
      gCtx.fillStyle = line.color
      gCtx.textAlign = 'center'

      gCtx.fillText(line.txt, line.x, line.y)

      // If the line is the selected one, draw a border around it
      if (idx === meme.selectedLineIdx) {
        const textMetrics = gCtx.measureText(line.txt)
        const textHeight = line.size

        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.strokeRect(line.x - textMetrics.width / 2 - 10, line.y - textHeight, textMetrics.width + 20, textHeight + 10)
      }
    })
  }
}

function onDown(ev) {
  //* Get the ev pos from mouse or touch
  const pos = getEvPos(ev)

  if (!isLineClicked(pos)) return

  setLineDrag(true)
  //* Save the pos we start from
  gStartPos = pos
  const elCanvas = document.querySelector('.canvas-board')
  const elLineInput = document.querySelector('#canvasText')
  elCanvas.style.cursor = 'grabbing'
  elLineInput.value = ''
}

function onMove(ev) {
  if (!getMeme().lines[gMeme.selectedLineIdx].isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y

  moveLine(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  const elCanvas = document.querySelector('.canvas-board')
  elCanvas.style.cursor = 'grab'
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    //* Prevent triggering the mouse screen dragging event
    ev.preventDefault()
    //* Gets the first touch point
    ev = ev.changedTouches[0]
    //* Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onChangeLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
}

function onRemoveLine(idx) {
  removeLine(idx)
}

function onSwitchLine() {
  const elTxtInput = document.querySelector('#canvasText')
  elTxtInput.value = ''

  switchLines()
  renderMeme()
}

function onChangeColorTxt(color) {
  setLineColor(color)
  renderMeme()
}

function onIncreaseFontSize() {
  increaseFontSize()
  renderMeme()
}

function onDecreaseFontSize() {
  decreaseFontSize()
  renderMeme()
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

// -------------------------TRASHCAN-----------------------------