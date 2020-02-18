export default class BooksView {
    constructor(model) {
        this.model = model;
        this.filter = '';
    }

    display() {
        let books = this.filterBooks();
        document.querySelector('#books').innerHTML = books.map((book) => /*html*/`
            <div class='card'>
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>ID: ${book.id}</p>
                <p>Updated: ${book.updated}</p>
            </div>
            `).join('');
    }
    
    filterBooks() {
        return this.model.books.filter((book) => {
            let keys = Object.values(book);
            let some = keys.some((val) => (''+val).includes(this.filter));
            return some;
        });
    }
}