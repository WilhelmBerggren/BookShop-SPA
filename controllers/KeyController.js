export default class KeyController {
    constructor(model, view) {
        this.model = model;

        this.view = view;
    }
    
    update() {
        this.view.display();
    }
}