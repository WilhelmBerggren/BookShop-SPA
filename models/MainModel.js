import BooksModel from './BookModel.js/index.js';
import FormModel from './FormModel.js';

export default class MainModel {
    constructor() {
        this.notifyList = [];

        this.formModel = new FormModel();
        this.formModel.addNotify(this);
        
        this.booksModel = new BooksModel();
        this.booksModel.addNotify(this);
    }

    addNotify(listener) {
        this.notifyList.push(listener);
    }

    notify() {
        this.notifyList.forEach((listener) => listener.notify());
    }
}