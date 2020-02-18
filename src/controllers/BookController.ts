import BookModel from '../models/BookModel';
import BookView from '../views/BookView.js';

export default class BookController {
    model: BookModel;
    view: BookView;
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        document.addEventListener('input', (event) => {
            if(event.target['id'] == 'filter') {
                this.view.filter = event.target['value'];
                this.model.resourceManager.notify();
            }
        });
    }
    
    async update() {
        return await this.view.display();
    }

    async refreshAndUpdate() {
        return await this.model.getBooks().then((res) => this.update());
    }
}