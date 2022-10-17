import "./css/styles.css"
import {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import imgsMarkup from "./js/markup";
import ApiSearch from "./js/fetchImg";

let lightboxOptions = new SimpleLightbox('.gallery a', {
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});

const apiSearch = new ApiSearch();
const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

loadBtnRef.style.display = 'none'
loadBtnRef.addEventListener('click', onBtnLoad)
formRef.addEventListener('submit', onSubmit);

let totalHits = 0;

async function onSubmit(evt){
    evt.preventDefault();
    clearMarkup();
    if (evt.currentTarget.elements.searchQuery.value === '') {
        Notify.failure('Pleae write your query');
        return;
    }
    const searchString = evt.currentTarget.elements.searchQuery.value.trim();
    if (!searchString) {
        return
    }
    apiSearch.query = searchString;
    const images = await apiSearch.fetchImages()
    if (images.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    };
    totalHits = images.totalHits;
    Notify.success(`Hooray! We found ${totalHits} images.`);
    totalHits -= images.hits.length
    const markup = imgsMarkup(images.hits)
    pushMarkup(markup)
    toglleBtnLoad(totalHits)
    lightboxOptions.refresh();
    
};

async function onBtnLoad(){
    const images = await apiSearch.fetchImages()
    totalHits -= images.hits.length
    const markup = imgsMarkup(images.hits)
    pushMarkup(markup)
    if (totalHits === 0 || totalHits < 0) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    toglleBtnLoad(totalHits)
    lightboxOptions.refresh();
}


function clearMarkup(){
    galleryRef.innerHTML = '';
};

function pushMarkup(markup){
    galleryRef.insertAdjacentHTML('beforeend', markup);
};

function toglleBtnLoad(hitsValue){
    if (hitsValue === 0 || hitsValue < 0) {
        loadBtnRef.style.display = 'none'
    } else{
        loadBtnRef.style.display = 'block'
    }
}

// function markupForImages(e){
//     return e.map(img => {
//         return `
// <div class="photo-card">
//     <img src="" alt="" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//         <b>Likes</b>
//         </p>
//         <p class="info-item">
//         <b>Views</b>
//         </p>
//         <p class="info-item">
//         <b>Comments</b>
//         </p>
//         <p class="info-item">
//         <b>Downloads</b>
//         </p>
//     </div>
// </div>`
//     })
//     .join("")
// }