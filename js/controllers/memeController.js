'use strict'

//TODO:
// Share facebook, Saved format

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

    meme.elements.forEach((element, idx) => {
      if (element.type === 'text') {
        gCtx.font = `${element.size}px ${element.font}`
        gCtx.fillStyle = element.color
        gCtx.textAlign = 'center'

        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = element.strokeWidth
        gCtx.strokeText(element.txt, element.x, element.y)

        gCtx.fillText(element.txt, element.x, element.y)

        if (idx === meme.selectedElementIdx) {
          const textMetrics = gCtx.measureText(element.txt)
          const textHeight = element.size

          gCtx.strokeStyle = 'red'
          gCtx.lineWidth = 3
          gCtx.strokeRect(element.x - textMetrics.width / 2 - 40, element.y - textHeight, textMetrics.width + 80, textHeight + 30)
        }
      } else if (element.type === 'sticker') {
        gCtx.font = `${element.size}px Arial`
        gCtx.fillText(element.sticker, element.x, element.y)
      }
    })
  }
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isElementClicked(pos)) return

  setElementDrag(true)
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
  if (!getMeme().elements[gMeme.selectedElementIdx].isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y

  moveElement(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setElementDrag(false)
  gElCanvas.style.cursor = 'grab'
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

function onAddSticker(sticker) {
  addSticker(sticker)
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

function onChangeFont(font) {
  changeFont(font)
  renderMeme()
}

function onAddStroke() {
  addStroke()
  renderMeme()
}

function onClearCanvas() {
  clearLines()
  renderMeme()
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR

    //* If the response is ok, call the onSuccess callback function,
    //* that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

// -------------------------TRASHCAN-----------------------------
