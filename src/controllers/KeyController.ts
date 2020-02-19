import KeyModel from '../models/KeyModel';
import KeyView from '../views/KeyView';

export default class KeyController {
    model: KeyModel;
    view: KeyView;
    constructor(model: KeyModel, view: KeyView) {
        this.model = model;
        this.view = view;
    }
    
    update() {
        this.view.display();
    }
}