export default function imgsMarkup(e){
    return e
    .map(images => {
        return `
        <div class="photo-card">
            <a href="${images.largeImageURL}" class="card-link">
                <img class="card-image" src="${images.webformatURL}" alt="${images.tags}" loading="lazy"
                width="300" height="210"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <br>${images.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <br>${images.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <br>${images.comments}
                </p>    
                <p class="info-item">
                    <b>Downloads</b>
                    <br>${images.downloads}
                </p>
            </div>
        </div>`
    })
    .join('')
};

