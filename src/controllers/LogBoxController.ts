import LogBoxModel from '../models/LogBoxModel.js';
import LogBoxView from '../views/LogBoxView.js';

export default class LogBoxController {
    model: LogBoxModel;
    view: LogBoxView;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    update() {
        this.view.display();
    }

    addAttemptAndUpdate(attempt) {
        console.log("LogBoxController addAttempt: ", attempt);
        this.model.addAttempt(attempt);
        this.update();
    }
}