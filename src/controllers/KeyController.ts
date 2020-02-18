import KeyModel from '../models/KeyModel.js';
import KeyView from '../views/KeyView.js';

export default class KeyController {
    model: KeyModel;
    view: KeyView;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    update() {
        this.view.display();
    }
}