// const InfiniteScroll = require('infinite-scroll');

import SmartImagefinder from './SearchAPIClass';

const key = '19116097-91cfda2f798a07cacf5b2db64';
const refs = {
  formRef: document.querySelector('.search-form'),
  galleryRef: document.querySelector('.gallery'),
  nextBtnRef: document.querySelector('.button-next'),
};

import * as basicLightbox from 'basiclightbox';

const myImagefinder = new SmartImagefinder(key, refs);
myImagefinder.startImagefinder();

refs.galleryRef.addEventListener('click', openLightBox);

function openLightBox(event) {
  const set = { src: event.target.dataset.src, alt: event.target.alt };
  openImage(set);
}
function openImage({ src, alt }) {
  const instance = basicLightbox.create(`
	<img class="photo-card__image"
            src="${src}" alt="${alt}" />
`);
  instance.show();
}
