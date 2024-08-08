'use strict'

function saveCanvasMemeToStorage() {
  const imgData = gElCanvas.toDataURL('image/png')

  let savedMemes = loadFromStorage(MEME_STORAGE_KEY)

  console.log('Loaded savedMemes:', savedMemes)

  if (!Array.isArray(savedMemes)) {
    savedMemes = []
  }

  const memeToSave = {
    imgData: imgData,
    memeData: gMeme,
  }

  console.log('Before saving, savedMemes:', savedMemes)

  savedMemes.push(memeToSave)

  console.log('After saving, savedMemes:', savedMemes)

  saveToStorage(MEME_STORAGE_KEY, savedMemes)
}

// function saveCanvasMemeToStorage() {
//     const imgData = gElCanvas.toDataURL('image/png')

//     let savedMemes = loadFromStorage(MEME_STORAGE_KEY) || []
//     console.log('Loaded savedMemes:', savedMemes)

//     if (!Array.isArray(savedMemes)) {
//       savedMemes = []
//     }
//     const memeToSave = {
//       imgData: imgData,
//       memeData: gMeme,
//     }

//     console.log('Before saving, savedMemes:', savedMemes)

//     savedMemes.push(memeToSave)

//     console.log('After saving, savedMemes:', savedMemes)

//     saveToStorage(MEME_STORAGE_KEY, savedMemes)
//   }
