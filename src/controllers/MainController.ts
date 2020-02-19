import BookController from './BookController';
import FormController from './FormController';
import LogBoxController from './LogBoxController';
import KeyController from './KeyController';
import MainModel from '../models/MainModel';
import MainView from '../views/MainView';

export default class MainController {
    model: MainModel;
    view: MainView;
    bookController: BookController;
    formController: FormController;
    logBoxController: LogBoxController;
    keyController: KeyController;
    constructor(model: MainModel, view: MainView) {
        this.model = model;
        this.view = view;
        
        this.model.resourceManager.addListener(this);
        
        this.bookController = new BookController(model.bookModel, this.view.bookView);
        this.formController = new FormController(model.formModel, this.view.formView);
        this.logBoxController = new LogBoxController(model.logBoxModel, this.view.logBoxView);
        this.keyController = new KeyController(model.keyModel, this.view.keyView);
        
        document.addEventListener('click', async (event) => {
            let input = event.target as HTMLInputElement;

            if(input.id == '#refresh-key') {
                await this.model.resourceManager.refreshKey();
            }
            if(input.id == 'refresh-books') {
                await this.bookController.refreshAndUpdate();
            }
        });
    }
    
    async update() {
        document.querySelector('#main').innerHTML = await this.view.display();
    }
}