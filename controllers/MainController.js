import BookController from './BookController.js';
import FormController from './FormController.js';
import Utils from '../services/Utils.js';

export default class MainController {
    constructor(model, view) {
        this.model = model;
        model.addNotify(this);

        this.view = view;
        this.update();
        
        this.bookController = new BookController(model.bookModel, this.view.bookView);
        this.formController = new FormController(model.formModel, this.view.formView);
        
        document.addEventListener('submit', (event) => {
            event.preventDefault();
            let params = Object.fromEntries(new FormData(event.target).entries());
            this.model.formModel.submitForm(params).then(() => {
                this.bookController.refreshAndUpdate();
            });
        });

        document.querySelector('#refresh-key').addEventListener('click', async (event) => {
            localStorage.clear();
            await Utils.getKey().then(() => {
                this.bookController.refreshAndUpdate();
            });
        });

    }
    
    update() {
        this.view.display();
    }

    notify() {
        this.bookController.notify();
        this.formController.notify();
        this.update();
    }
}