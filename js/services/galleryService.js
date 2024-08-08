'use strict'

const GALLERY_STORAGE_KEY = 'gallery'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
  { id: 2, url: 'img/2.jpg', keywords: ['love', 'dogs'] },
  { id: 3, url: 'img/3.jpg', keywords: ['cute', 'babies'] },
  { id: 4, url: 'img/4.jpg', keywords: ['sleepy', 'cat'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
  { id: 6, url: 'img/6.jpg', keywords: ['interesting', 'long hair man'] },
  { id: 7, url: 'img/7.jpg', keywords: ['cute', 'baby'] },
  { id: 8, url: 'img/8.jpg', keywords: ['dreamy', 'man with hat'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'kid'] },
]

var gKeywordPopularity = {
  funny: 3,
  dogs: 1.5,
  baby: 2.5,
  cute: 2.5,
  cat: 1.5,
}

function getImgs(options = {}) {
  const filterBy = options.filterBy
  var imgs = gImgs
  imgs = _filter(imgs, filterBy)

  return imgs
}

function getImgById(id) {
  return gImgs.find((img) => img.id === id)
}

function _filter(imgs, filterBy) {
  if (filterBy && filterBy.keyword) {
    imgs = imgs.filter((img) => img.keywords.some((keyword) => keyword.toLowerCase().includes(filterBy.keyword.toLowerCase())))
  }
  return imgs
}

function increaseKeywordPopularity(keyword) {
  return gKeywordPopularity[keyword]++
}

function clearFilterBy() {
  gQueryOptions.filterBy.keyword = ''
  document.querySelector('#keywordSearch').value = ''
  renderGallery()
}

function _galleryStorageSaving() {
  saveToStorage(GALLERY_STORAGE_KEY, gImgs)
}
