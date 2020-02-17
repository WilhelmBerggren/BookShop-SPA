import BooksController from './BookController.js/index.js';

import FormController from './FormController.js';

export default class MainController {
    constructor(model, view) {
        this.model = model;
        model.addNotify(this);

        this.view = view;
        this.update();
        
        this.booksController = new BooksController(model.booksModel, this.view.booksView);
        this.formController = new FormController(model.formModel, this.view.formView);
    }
    
    update() {
        this.view.display();
    }

    notify() {
        console.log("MainController was notified");
        this.booksController.notify();
        this.formController.notify();
        this.update();
    }
}