import BookModel, { Book } from '../models/BookModel';

export default class BookView {
    model: BookModel;
    filter: string;
    constructor(model: BookModel) {
        this.model = model;
        this.filter = '';
    }

    async display() {
        console.log("BookView Updating to: ", this.model.books);
        return /*html*/`
        <div class="cards">
            <div class="card">
                <h1> Books </h1>
                <input type="text" id="filter" placeholder="filter" value="${this.filter}"">
                <button id="refresh-books">Refresh</button>
                <div class="cards">
                    ${this.filterBooks(this.filter).map((book) => /*html*/`     
                        <div class='card'>
                            <p>Title: ${book.title}</p>
                            <p>Author: ${book.author}</p>
                            <p>ID: ${book.id}</p>
                            <p>Updated: ${book.updated}</p>
                        </div>
                        `).join('')}
                </div>
            </div>
        </div>
        `
    }
    
    filterBooks(filter: string): Book[] {
        console.log("BookView Filtering: ", filter);
        let books: Book[] = [];
        if(this.model.books) {
            this.model.books.forEach((book: Book) => {
                if([book.id, book.title, book.author, book.updated].some((val: string) => (''+val).includes(filter))) {
                    books.push(book);
                }
            })
        }
        return books;
    }
}