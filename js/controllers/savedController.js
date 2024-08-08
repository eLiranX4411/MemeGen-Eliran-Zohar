'use strict'

function onInitSavedMemes() {
  renderSavedMemes()
}

function renderSavedMemes() {
  const savedMemes = loadFromStorage(MEME_STORAGE_KEY) || []
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  const imgsHtml = savedMemes
    .map((meme, idx) => {
      return `<img src="${meme.imgData}" alt="Saved Meme ${idx}" />`
    })
    .join('')

  elSavedImgsContainer.innerHTML = imgsHtml
}

// function loadSavedMemes() {
//   const savedMemes = loadFromStorage(MEME_STORAGE_KEY) || []
//   const elSavedImgs = document.querySelector('.saved-imgs')

//   const strHtml = savedMemes
//     .map((meme, idx) => {
//       return `<img src="${meme.imgData}" alt="Meme ${idx}" onclick="onSelectSavedMeme(${idx})" />`
//     })
//     .join('')

//   elSavedImgs.innerHTML = strHtml
// }

// function onSelectSavedMeme(idx) {
//   const savedMemes = loadFromStorage(MEME_STORAGE_KEY) || []
//   gMeme = savedMemes[idx].memeData
//   renderMeme()
// }
