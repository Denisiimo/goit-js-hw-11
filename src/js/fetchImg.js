import { Notify } from "notiflix";
import axios from "axios";

const API = "30664619-432d7f9c7cea243d5449f8e14"

const options = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40
};

export default class ApiSearch{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    };
    async fetchImages(){
        try{
            const url = `https://pixabay.com/api/?key=${API}&q=${this.searchQuery}&page=${this.page}`;
            const response = await axios.get(url, {options});
            await this.pageCount();
            return response.data;
        } catch(error){
            Notify.failure(`Oops, something went wrong;(`)
        };
    };
    async pageCount(){
        this.page += 1; 
    };
    async resetPage(){
        this.page = 1;
    };
    get query(){
        return this.searchQuery;
    };
    set query(newQuery){
        this.searchQuery = newQuery;
    };
};