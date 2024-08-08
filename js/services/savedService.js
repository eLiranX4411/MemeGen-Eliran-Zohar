'use strict'

function saveCanvasMemeToStorage() {
  const imgData = gElCanvas.toDataURL('image/png')

  let savedMemes = loadFromStorage(MEME_STORAGE_KEY)

  if (!Array.isArray(savedMemes)) {
    savedMemes = []
  }

  const memeToSave = {
    imgData: imgData,
    memeData: gMeme,
  }

  savedMemes.push(memeToSave)

  saveToStorage(MEME_STORAGE_KEY, savedMemes)
}
