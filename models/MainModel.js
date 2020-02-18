import BookModel from './BookModel.js';
import FormModel from './FormModel.js';

export default class MainModel {
    constructor() {
        this.notifyList = [];

        this.formModel = new FormModel();
        this.formModel.addNotify(this);
        
        this.bookModel = new BookModel();
        this.bookModel.addNotify(this);
    }

    addNotify(listener) {
        this.notifyList.push(listener);
    }

    notify() {
        this.notifyList.forEach((listener) => listener.notify());
    }
}