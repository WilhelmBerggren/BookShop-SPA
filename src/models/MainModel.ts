import BookModel from './BookModel';
import FormModel from './FormModel';
import LogBoxModel from './LogBoxModel';
import KeyModel from './KeyModel';
import ResourceManager from '../services/ResourceManager';

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