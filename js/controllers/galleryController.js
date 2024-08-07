'use strict'

const gQueryOptions = {
  filterBy: { keyword: '' },
  sortBy: {},
}

function onInit() {
  renderGallery()
  showGalleryScreen()
  closeEditorScreen()
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

// -------------------------Screen Elements-----------------------------

function showGalleryScreen() {
  const elGallery = document.querySelector('.gallery-container')
  const elAbout = document.querySelector('.about-main-container')
  const elAboutKids = document.querySelector(`.gallery-container,
    .gallery-container.about-container`)
  const elKeyBar = document.querySelector('.keywords-bar-container')

  elGallery.classList.add('dsp-grid')
  elAbout.classList.add('dsp-none')

  elAboutKids.classList.add('dsp-grid')
  elKeyBar.classList.add('dsp-flex')
}

function showEditorScreen() {
  const elGallery = document.querySelector('.gallery-container')
  elGallery.classList.add(`dsp-none`)
  elGallery.classList.remove(`dsp-grid`)

  const elEditor = document.querySelector('.editor-container')
  elEditor.classList.remove(`dsp-none`)
  elEditor.classList.add(`dsp-grid`)
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

  elAbout.classList.remove('dsp-none')

  elEditor.classList.add(`dsp-none`)
  elEditor.classList.remove(`dsp-grid`)

  elAboutKids.classList.add('dsp-none')
  elAboutKids.classList.remove('dsp-grid')

  elKeyBar.classList.add('dsp-none')
  elKeyBar.classList.remove('dsp-flex')

  console.log(elKeyBar)
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
