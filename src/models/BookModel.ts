import ResourceManager from '../services/ResourceManager.js';

export default class BookModel {
    resourceManager: ResourceManager;
    books: Book[];
    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
        this.books = [];
        this.getBooks();
    }

    async getBooks() {
        return await this.resourceManager.getBooks().then((books : Book[]) => {
            this.books = books;

            return books;
        });
    }
}

export interface Book {
    id: string,
    author: string,
    title: string,
    updated: string
}