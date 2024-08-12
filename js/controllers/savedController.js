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

function onSaveClick() {
  const elSavedContainer = document.querySelector('.save-msg-container')
  const elSavedMessage = document.querySelector('.save-msg')
  elSavedMessage.innerText = 'Saved'
  elSavedContainer.display = 'flex'
  elSavedContainer.style.backgroundColor = 'var(--clr-primary3)'
  setTimeout(() => {
    elSavedMessage.innerText = ''
    elSavedContainer.display = 'none'
    elSavedContainer.style.backgroundColor = 'var(--clr-primary2)'
  }, 3000)
}
