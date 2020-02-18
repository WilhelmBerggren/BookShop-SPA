import BookView from './BookView.js';
import FormView from './FormView.js';

export default class MainView {
    constructor(model) {
        this.model = model;
        this.bookView = new BookView(model.bookModel);
        this.formView = new FormView(model.formModel);
    }

    display() {
        this.bookView.display();
        this.formView.display();
    }
}