export default class BookModel {
    constructor(resourceManager) {
        this.resourceManager = resourceManager;
        this.books = [];
        this.getBooks();
    }

    async getBooks() {
        return await this.resourceManager.getBooks().then((res) => {
            this.books = res.data;

            return res;
        });
    }
}