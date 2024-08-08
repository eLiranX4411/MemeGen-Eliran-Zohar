'use strict'

const gQueryOptions = {
  filterBy: { keyword: '' },
}

function onInit() {
  renderGallery()
  showGalleryScreen()
  closeEditorScreen()
  closeSavedScreen()
  initKeywords()
}

function renderGallery() {
  var elImgs = document.querySelector('.imgs-container')
  var strHtml = getImgs(gQueryOptions)
    .map((img) => `<img src="${img.url}" alt="404" onclick="onImgSelect(${img.id})" />`)
    .join('')

  elImgs.innerHTML = strHtml
}

function onImgSelect(imgId) {
  setImg(imgId)
  showEditorScreen()
  renderMeme()
}

function onSetFilterBy(keyword) {
  gQueryOptions.filterBy.keyword = keyword
  renderGallery()
}

function onClickOnKeyword(keyword) {
  increaseKeywordPopularity(keyword)

  const elKeyword = document.querySelector(`[data-keyword="${keyword}"]`)
  const newFontSize = 1 + getKeywordPopularity(keyword) * 0.1
  elKeyword.style.fontSize = `${newFontSize}rem`

  renderGallery()
}

function initKeywords() {
  const keywordItems = document.querySelectorAll('.keyword-item')
  keywordItems.forEach((el) => {
    const keyword = el.dataset.keyword
    const newFontSize = 1 + getKeywordPopularity(keyword) * 0.1
    el.style.fontSize = `${newFontSize}rem`
  })
}

// -------------------------Screen Elements-----------------------------

function showGalleryScreen() {
  const elGallery = document.querySelector('.gallery-container')
  const elAbout = document.querySelector('.about-main-container')
  const elAboutKids = document.querySelector(`.gallery-container,
    .gallery-container.about-container`)
  const elKeyBar = document.querySelector('.keywords-bar-container')

  const elSavedContainer = document.querySelector('.saved-container')
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  elGallery.classList.add('dsp-grid')
  elAbout.classList.add('dsp-none')

  elSavedContainer.classList.add('dsp-none')
  elSavedImgsContainer.classList.add('dsp-none')

  elAboutKids.classList.add('dsp-grid')
  elKeyBar.style.display = 'flex'
}

function showEditorScreen() {
  const elGallery = document.querySelector('.gallery-container')
  const elSavedContainer = document.querySelector('.saved-container')
  const elKeyBar = document.querySelector('.keywords-bar-container')
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  elGallery.classList.add(`dsp-none`)
  elGallery.classList.remove(`dsp-grid`)

  elSavedContainer.classList.add('dsp-none')

  const elEditor = document.querySelector('.editor-container')
  elEditor.classList.remove(`dsp-none`)
  elEditor.classList.add(`dsp-grid`)

  elSavedImgsContainer.classList.add('dsp-none')

  elKeyBar.style.display = 'none'
}

function closeEditorScreen() {
  const elEditor = document.querySelector('.editor-container')
  elEditor.classList.add(`dsp-none`)
  elEditor.classList.remove(`dsp-grid`)
}

function showAboutScreen() {
  const elAbout = document.querySelector('.about-main-container')
  const elAboutKids = document.querySelector(`.gallery-container,
.gallery-container.about-container`)
  const elKeyBar = document.querySelector('.keywords-bar-container')
  const elEditor = document.querySelector('.editor-container')

  const elSavedContainer = document.querySelector('.saved-container')
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  elAbout.classList.remove('dsp-none')

  elSavedContainer.classList.add('dsp-none')
  elSavedImgsContainer.classList.add('dsp-none')

  elEditor.classList.remove(`dsp-grid`)
  elEditor.classList.add(`dsp-none`)
  elEditor.classList.remove(`dsp-grid`)

  elAboutKids.classList.add('dsp-none')
  elAboutKids.classList.remove('dsp-grid')

  elKeyBar.style.display = 'none'
}

function showSavedScreen() {
  const elSavedContainer = document.querySelector('.saved-container')
  elSavedContainer.classList.add('dsp-grid')
  const elAbout = document.querySelector('.about-main-container')

  const elGallery = document.querySelector(`.gallery-container,
.gallery-container.about-container`)
  const elKeyBar = document.querySelector('.keywords-bar-container')
  const elEditor = document.querySelector('.editor-container')

  elEditor.classList.add(`dsp-none`)
  elEditor.classList.remove(`dsp-grid`)

  elAbout.classList.add('dsp-none')

  elGallery.classList.add('dsp-none')
  elGallery.classList.remove('dsp-grid')

  elKeyBar.style.display = 'none'
}

function closeSavedScreen() {
  const elSavedContainer = document.querySelector('.saved-container')
  const elSavedImgsContainer = document.querySelector('.saved-imgs')

  elSavedContainer.classList.remove(`dsp-grid`)
  elSavedContainer.classList.add(`dsp-none`)
  elSavedImgsContainer.classList.add(`dsp-none`)
}

// -------------------------Hamburger Menu-----------------------------

document.addEventListener('DOMContentLoaded', () => {
  const elHamburgerMenu = document.querySelector('.hamburger-menu')
  const elLinksContainer = document.querySelector('.links-container')
  const elOverlay = document.querySelector('.overlay')

  function toggleMenu() {
    elLinksContainer.classList.toggle('active')
    elOverlay.classList.toggle('active')
  }

  elHamburgerMenu.addEventListener('click', toggleMenu)
  elOverlay.addEventListener('click', toggleMenu)
})

// -------------------------TRASHCAN-----------------------------
