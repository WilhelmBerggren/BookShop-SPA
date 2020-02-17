export default class BooksController {
    constructor(model, view) {
        this.model = model;
        this.model.getBooks();
        this.model.addNotify(this);

        this.view = view;
        
        this.update();

        document.querySelector('#filter').addEventListener('input', (event) => {
            this.view.filter = event.target.value;
            this.view.display();
        });
    }
    
    async update() {
        this.view.display();
    }

    notify() {
        this.update();
    }
}