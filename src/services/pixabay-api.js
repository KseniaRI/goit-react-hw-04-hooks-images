const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '27355574-70cda2d549cbba697ae43a74b';

export class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchImages(){
       return fetch(`${BASE_URL}/?q=${this.searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`)
            .then(responce => {
                if (responce.ok) {
                    return responce.json();
                }
                return Promise.reject(new Error(`Something went wrong. There are no ${this.searchQuery} images`));
            });
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
} 

