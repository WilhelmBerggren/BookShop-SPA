import Utils from '../services/Utils.mjs';

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