'use strict'

function onInitSavedMemes() {
  renderSavedMemes()
}

function renderSavedMemes() {
  const savedMemes = loadFromStorage(SAVE_MEME_STORAGE_KEY) || []
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  const imgsHtml = savedMemes
    .map((meme, idx) => {
      return `<img src="${meme.imgData}" alt="Saved Meme ${idx}" />`
    })
    .join('')

  elSavedImgsContainer.innerHTML = imgsHtml
}
