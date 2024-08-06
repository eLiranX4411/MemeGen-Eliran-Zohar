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
  lines: [
    {
      txt: 'Text Here',
      size: 40,
      color: 'white',
      x: 350,
      y: 50,
      isDrag: false,
    },
    {
      txt: 'Text 2 Here',
      size: 40,
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

function isLineClicked(clickedPos) {
  return gMeme.lines.some((line, idx) => {
    const distance = Math.sqrt((line.x - clickedPos.x) ** 2 + (line.y - clickedPos.y) ** 2)
    if (distance <= line.size) {
      gMeme.selectedLineIdx = idx
      return true
    }
    return false
  })
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

//* Move the line in a delta, diff from the pervious pos
function moveLine(dx, dy) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.x += dx
  line.y += dy
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId

  _memeStorageSaving()
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt

  _memeStorageSaving()
}

function addLine() {
  gMeme.lines.push({
    txt: 'Text Here',
    size: 40,
    color: 'white',
    x: 250,
    y: getRandomInt(100, 500),
  })

  _memeStorageSaving()
}

function removeLine() {
  let linesLength = gMeme.lines.length
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.selectedLineIdx >= linesLength) {
    gMeme.selectedLineIdx = linesLength - 1
  }
  if (linesLength === 0) {
    gMeme.selectedLineIdx = 0
  }

  renderMeme()
}

function switchLines() {
  // let linesLength = gMeme.lines.length - 1
  // if (gMeme.selectedLineIdx < linesLength) {
  //   gMeme.selectedLineIdx++
  // } else {
  //   gMeme.selectedLineIdx--
  // }
  let linesLength = gMeme.lines.length
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % linesLength
}

function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color

  _memeStorageSaving()
}

function increaseFontSize(size = 5) {
  gMeme.lines[gMeme.selectedLineIdx].size += size

  _memeStorageSaving()
}

function decreaseFontSize(size = 5) {
  gMeme.lines[gMeme.selectedLineIdx].size -= size

  _memeStorageSaving()
}

function getImgById(id) {
  return gImgs.find((img) => img.id === id)
}

function _memeStorageSaving() {
  saveToStorage(MEME_STORAGE_KEY, gMeme)
}

// -------------------------TRASHCAN-----------------------------
