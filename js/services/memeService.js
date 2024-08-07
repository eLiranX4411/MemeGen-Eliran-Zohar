'use strict'

const MEME_STORAGE_KEY = 'memes'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
  { id: 2, url: 'img/2.jpg', keywords: ['love', 'dogs'] },
  { id: 3, url: 'img/3.jpg', keywords: ['cute', 'babies'] },
  { id: 4, url: 'img/4.jpg', keywords: ['sleepy', 'cat'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
  { id: 6, url: 'img/6.jpg', keywords: ['interesting', 'long hair man'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
  { id: 8, url: 'img/8.jpg', keywords: ['dreamy', 'man with hat'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'kid'] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
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

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function isElementClicked(clickedPos) {
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
  gMeme.elements[gMeme.selectedLineIdx].txt = txt

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
  gMeme.elements.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.selectedLineIdx >= linesLength) {
    gMeme.selectedLineIdx = linesLength - 1
  }
  if (linesLength === 0) {
    gMeme.selectedLineIdx = 0
  }

  renderMeme()
}

function clearLines() {
  let linesLength = gMeme.elements.length
  gMeme.elements.splice(gMeme.selectedLineIdx, linesLength - 1)

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
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % linesLength

  _memeStorageSaving()
}

function setLineColor(color) {
  gMeme.elements[gMeme.selectedLineIdx].color = color

  _memeStorageSaving()
}

function increaseFontSize(size = 5) {
  gMeme.elements[gMeme.selectedLineIdx].size += size

  _memeStorageSaving()
}

function changeFont(font) {
  gMeme.elements[gMeme.selectedLineIdx].font = font

  _memeStorageSaving()
}

function addStroke(stroke = 2) {
  gMeme.elements[gMeme.selectedLineIdx].strokeWidth += stroke

  _memeStorageSaving()
}

function decreaseFontSize(size = 5) {
  gMeme.elements[gMeme.selectedLineIdx].size -= size

  _memeStorageSaving()
}

function getImgById(id) {
  return gImgs.find((img) => img.id === id)
}

function _memeStorageSaving() {
  saveToStorage(MEME_STORAGE_KEY, gMeme)
}

// -------------------------TRASHCAN-----------------------------
