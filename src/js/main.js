import SmartImagefinder from './SearchAPIClass';
import * as basicLightbox from 'basiclightbox';

const key = '19116097-91cfda2f798a07cacf5b2db64';
const refs = {
  perPage: 12,
  formRef: document.querySelector('.search-form'),
  galleryRef: document.querySelector('.gallery'),
  nextBtnRef: document.querySelector('.button-next'),
};

const perPageInputRef = document.querySelector('#perpage');

const myImagefinder = new SmartImagefinder(key, refs);
myImagefinder.startImagefinder();

perPageInputRef.addEventListener('input', perPageInputSet);

function perPageInputSet(event) {
  myImagefinder.removeError();
  const value = Math.floor(event.target.value);
  if (value > 2 && value < 201) {
    myImagefinder.perPage = value;
  } else {
    myImagefinder.pushError('Enter number from 3 to 200');
  }
}

refs.galleryRef.addEventListener('click', openLightBox);

function openLightBox(event) {
  const set = { src: event.target.dataset.src, alt: event.target.alt };
  openImage(set);
}
function openImage({ src, alt }) {
  const instance = basicLightbox.create(`
  <div class="full-image-container">
  <img src="${src}" alt="${alt}" />
  <a class="download" href="${src}" download="${
    alt.split(',')[0]
  }" target="_blank" /><i class="material-icons">cloud_download</i></a>
  </div>
`);
  instance.show();
}
