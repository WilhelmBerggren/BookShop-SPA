export default class BookController {
    constructor(model, view) {
        this.model = model;
        this.model.addNotify(this);

        this.view = view;
        
        document.querySelector('#filter').addEventListener('input', (event) => {
            this.view.filter = event.target.value;
            this.update();
        });

        document.querySelector('#refresh-books').addEventListener('click', () => {
            this.refreshAndUpdate();
        })

        this.refreshAndUpdate();
    }
    
    update() {
        this.view.display();
    }

    async refreshAndUpdate() {
        await this.model.getBooks().then(() => this.update());
    }

    notify() {
        this.update();
    }
}