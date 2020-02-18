import BookController from './BookController.js';
import FormController from './FormController.js';
import LogBoxController from './KeyController.js';
import KeyController from './KeyController.js';

export default class MainController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.update();

        this.model.resourceManager.addListener(this);

        this.bookController = new BookController(model.bookModel, this.view.bookView);
        this.formController = new FormController(model.formModel, this.view.formView);
        this.logBoxController = new LogBoxController(model.logBoxModel, this.view.logBoxView);
        this.keyBoxController = new KeyController(model.keyModel, this.view.keyView);

        document.addEventListener('click', async (event) => {
            if(event.target.id == '#refresh-key') {
                await this.model.resourceManager.refreshKey();
            }
            if(event.target.id == 'refresh-books') {
                await this.bookController.refreshAndUpdate();
            }
        });
    }
    
    async update() {
        document.querySelector('#main').innerHTML = await this.view.display();
    }
}