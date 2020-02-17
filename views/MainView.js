import BooksView from '../views/booksView.js';
import FormView from './formView.js';

export default class MainView {
    constructor(model) {
        this.model = model;
        this.booksView = new BooksView(model.booksModel);
        this.formView = new FormView(model.formModel);
    }

    display() {
        this.booksView.display();
        this.formView.display();
    }
}