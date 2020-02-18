import BookView from '../views/BookView.js';
import FormView from '../views/FormView.js';

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