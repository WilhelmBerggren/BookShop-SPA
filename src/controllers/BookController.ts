import BookModel from '../models/BookModel';
import BookView from '../views/BookView';

export default class BookController {
    model: BookModel;
    view: BookView;
    constructor(model: BookModel, view: BookView) {
        this.model = model;
        this.view = view;
        
        document.addEventListener('input', (event) => {
            let input = event.target as HTMLInputElement;
            if(input.id == 'filter') {
                this.view.filter = input.value;
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