import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';
defaults.hide = false;
defaults.remove = false;
delete defaults.stack;

import galleryCardRender from '../templates/GalleryCard.hbs';

export default class {
  constructor(key, { perPage, formRef, galleryRef, nextBtnRef }) {
    this.APIURL = 'https://pixabay.com/api/';
    this._perPage = perPage;
    this.count = 1;
    this.searchQuery = '';
    this.key = key;
    this.formRef = formRef;
    this.galleryRef = galleryRef;
    this.nextBtnRef = nextBtnRef;
    this.getResult = this.getResult.bind(this);
    this.addResult = this.addResult.bind(this);
  }
  get perPage() {
    return this._perPage;
  }
  set perPage(perPage) {
    this._perPage = perPage;
  }
  get searchURL() {
    return (
      this.APIURL +
      '?key=' +
      this.key +
      '&image_type=photo&orientation=horizontal&per_page=' +
      this.perPage +
      '&q='
    );
  }
  startImagefinder() {
    this.formRef.addEventListener('submit', this.getResult);
  }
  getResult(event) {
    event.preventDefault();
    this.clearResult();
    this.searchQuery = event.currentTarget.elements.query.value.trim();
    if (this.searchQuery.length === 0) return;
    this.appendResult();
  }
  clearResult() {
    this.galleryRef.classList.remove('animated');
    this.galleryRef.innerHTML = '';
    this.count = 1;
    this.nextBtnRef.removeEventListener('click', this.addResult, {
      once: true,
    });
    this.removeError();
  }
  pushError(err) {
    error({
      text: `${err}`,
      type: 'error',
      addClass: 'error animate',
    });
    return err;
  }
  removeError() {
    const errorRef = document.querySelector('.error');
    if (errorRef) errorRef.remove();
  }
  async fetchResult(data) {
    const response = await fetch(
      this.searchURL + data + '&page=' + this.count,
    ).catch(err => {
      if (this.count > 1)
        return this.pushError('No more matches. Try new search');
      return this.pushError(err.message);
    });
    if (response.ok) {
      this.count += 1;
      return await response.json();
    }
    return false;
  }
  async appendResult() {
    this.animateAwait();
    this.nextBtnRef.classList.add('visually-hidden');
    const markup = await this.fetchResult(this.searchQuery);
    if (!markup) return this.animateAwait();
    if (markup.hits.length === 0) {
      this.animateAwait();
      return this.pushError('no matches found');
    }
    if (markup.hits.length <= this.perPage) {
      const imagelist = this.handleBarsIt(markup.hits);
      this.galleryRef.insertAdjacentHTML('beforeend', imagelist);
      this.enableListener();
      this.nextBtnRef.classList.remove('visually-hidden');
    }
    this.animateAwait();
  }
  handleBarsIt(data) {
    const imageList = galleryCardRender(data);
    return imageList;
  }
  async addResult() {
    const { y, width } = this.galleryRef.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    await this.appendResult();
    if (width < 700)
      window.scrollTo({ top: -y + screenHeight - 198, behavior: 'smooth' });
    else if (width < 1170)
      window.scrollTo({ top: -y + screenHeight - 160, behavior: 'smooth' });
    else window.scrollTo({ top: -y + screenHeight - 180, behavior: 'smooth' });
  }
  enableListener() {
    this.nextBtnRef.addEventListener('click', this.addResult, {
      once: true,
    });
  }
  animateAwait() {
    this.galleryRef.classList.toggle('animated');
    this.formRef.classList.toggle('animated');
  }
}
