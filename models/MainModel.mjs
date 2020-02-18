import BookModel from './BookModel.mjs';
import FormModel from './FormModel.mjs';

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