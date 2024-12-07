import images from './imagesData.json';
import { createGalleryCardsTemplate } from './render-functions';
import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('.js-gallery');
galleryEl.innerHTML = createGalleryCardsTemplate(images);

new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
