import Utils from '../services/Utils.js';

export default class BooksModel {
    constructor() {
        this.notifyList = [];
        this.books = [];
    }

    async getBooks() {
        await Utils.getBooks().then((res) => {
            this.books = res;
        });
    }

    addNotify(listener) {
        this.notifyList.push(listener);
    }

    notify() {
        this.notifyList.forEach((listener) => listener.notify());
    }
}