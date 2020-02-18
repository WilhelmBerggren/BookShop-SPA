export default class BookView {
    constructor(model) {
        this.model = model;
        this.filter = '';
    }

    async display() {
        return /*html*/`
        <div class="card">
            <h1> Books </h1>
            <input type="text" id="filter" placeholder="filter" value="${this.filter}"">
            <button id="refresh-books">Refresh</button>
            <div class="cards">
                ${this.model.books.filter(this.bookFilter(this.filter)).map((book) => /*html*/`     
                    <div class='card'>
                        <p>Title: ${book.title}</p>
                        <p>Author: ${book.author}</p>
                        <p>ID: ${book.id}</p>
                        <p>Updated: ${book.updated}</p>
                    </div>
                    `).join('')}
            </div>
        </div>
        `
    }
    
    bookFilter(filter) {
        return (book) => {
            let keys = Object.values(book);
            return keys.some((val) => (''+val).includes(filter));
        }
    }
}