'use strict'

function saveCanvasMemeToStorage() {
  const imgData = gElCanvas.toDataURL('image/png')

  console.log(loadFromStorage(SAVE_MEME_STORAGE_KEY))
  let savedMemes = loadFromStorage(SAVE_MEME_STORAGE_KEY) || []
  console.log(savedMemes)

  const memeToSave = {
    imgData: imgData,
    memeData: gMeme,
  }

  savedMemes.push(memeToSave)

  saveToStorage(SAVE_MEME_STORAGE_KEY, savedMemes)
}
