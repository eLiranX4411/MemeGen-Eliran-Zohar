'use strict'

const MEME_STORAGE_KEY = 'memes'
const SAVE_MEME_STORAGE_KEY = 'saveMemesDB'

var gMeme = {
  selectedImgId: 1,
  selectedElementIdx: 0,
  elements: [
    {
      type: 'text',
      txt: 'Text Here',
      font: 'Arial',
      size: 40,
      strokeWidth: 5,
      color: 'white',
      x: 350,
      y: 50,
      isDrag: false,
    },
    {
      type: 'text',
      txt: 'Text 2 Here',
      font: 'Arial',
      size: 40,
      strokeWidth: 5,
      color: 'white',
      x: 350,
      y: 600,
      isDrag: false,
    },
  ],
}

var gKeywordSearchCountMap = {
  funny: 33,
  cute: 22,
  baby: 12,
  dogs: 4,
  cat: 4,
}

function getMeme() {
  return gMeme
}

function isElementClicked(clickedPos) {
  let linesLength = gMeme.elements.length
  gMeme.selectedElementIdx = (gMeme.selectedElementIdx + 1) % linesLength

  return gMeme.elements.some((element, idx) => {
    const distance = Math.sqrt((element.x - clickedPos.x) ** 2 + (element.y - clickedPos.y) ** 2)
    if (distance <= element.size) {
      gMeme.selectedElementIdx = idx

      return true
    }
    return false
  })
}

function setElementDrag(isDrag) {
  gMeme.elements[gMeme.selectedElementIdx].isDrag = isDrag
}

function moveElement(dx, dy) {
  const element = gMeme.elements[gMeme.selectedElementIdx]
  element.x += dx
  element.y += dy
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId

  _memeStorageSaving()
}

function setLineTxt(txt) {
  gMeme.elements[gMeme.selectedElementIdx].txt = txt

  _memeStorageSaving()
}

function addLine() {
  gMeme.elements.push({
    type: 'text',
    txt: 'Text Here',
    font: 'Arial',
    size: 40,
    strokeWidth: 5,
    color: 'white',
    x: 350,
    y: getRandomInt(100, 500),
    isDrag: false,
  })
  _memeStorageSaving()
}

function addSticker(sticker) {
  gMeme.elements.push({
    type: 'sticker',
    sticker: sticker,
    size: 40,
    x: 250,
    y: getRandomInt(100, 500),
    isDrag: false,
  })

  _memeStorageSaving()
}

function removeLine() {
  let linesLength = gMeme.elements.length
  gMeme.elements.splice(gMeme.selectedElementIdx, 1)

  if (gMeme.selectedElementIdx >= linesLength) {
    gMeme.selectedElementIdx = linesLength - 1
  }
  if (linesLength === 0) {
    gMeme.selectedElementIdx = 0
  }

  renderMeme()
}

function clearLines() {
  let linesLength = gMeme.elements.length
  gMeme.elements.splice(gMeme.selectedElementIdx, linesLength - 1)

  renderMeme()
}

function switchLines() {
  // let linesLength = gMeme.lines.length - 1
  // if (gMeme.selectedLineIdx < linesLength) {
  //   gMeme.selectedLineIdx++
  // } else {
  //   gMeme.selectedLineIdx--
  // }
  let linesLength = gMeme.elements.length
  gMeme.selectedElementIdx = (gMeme.selectedElementIdx + 1) % linesLength

  _memeStorageSaving()
}

function setLineColor(color) {
  gMeme.elements[gMeme.selectedElementIdx].color = color

  _memeStorageSaving()
}

function increaseFontSize(size = 5) {
  gMeme.elements[gMeme.selectedElementIdx].size += size

  _memeStorageSaving()
}

function changeFont(font) {
  gMeme.elements[gMeme.selectedElementIdx].font = font

  _memeStorageSaving()
}

function addStroke(stroke = 2) {
  gMeme.elements[gMeme.selectedElementIdx].strokeWidth += stroke

  _memeStorageSaving()
}

function decreaseFontSize(size = 5) {
  gMeme.elements[gMeme.selectedElementIdx].size -= size

  _memeStorageSaving()
}

function _memeStorageSaving() {
  saveToStorage(MEME_STORAGE_KEY, gMeme)
}

// -------------------------TRASHCAN-----------------------------
