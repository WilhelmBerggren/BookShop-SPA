import BookModel from './BookModel.js';
import FormModel from './FormModel.js';
import LogBoxModel from './LogBoxModel.js';
import KeyModel from './KeyModel.js';
import ResourceManager from '../services/ResourceManager.js';

export default class MainModel {
    resourceManager: ResourceManager;
    keyModel: KeyModel;
    formModel: FormModel;
    bookModel: BookModel;
    logBoxModel: LogBoxModel;
    constructor() {
        this.resourceManager = new ResourceManager();

        this.keyModel = new KeyModel(this.resourceManager);
        this.formModel = new FormModel(this.resourceManager);
        this.bookModel = new BookModel(this.resourceManager);
        this.logBoxModel = new LogBoxModel(this.resourceManager);
    }
}