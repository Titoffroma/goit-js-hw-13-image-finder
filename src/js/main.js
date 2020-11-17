// const InfiniteScroll = require('infinite-scroll');

import SmartImagefinder from './SearchAPIClass';

const key = '19116097-91cfda2f798a07cacf5b2db64';
const refs = {
  formRef: document.querySelector('.search-form'),
  galleryRef: document.querySelector('.gallery'),
  nextBtnRef: document.querySelector('.button-next'),
};

const myImagefinder = new SmartImagefinder(key, refs);
myImagefinder.startImagefinder();
