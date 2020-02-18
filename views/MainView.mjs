import BookView from './BookView.mjs';
import FormView from './FormView.mjs';

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