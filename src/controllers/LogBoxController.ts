import LogBoxModel from '../models/LogBoxModel';
import LogBoxView from '../views/LogBoxView';

export default class LogBoxController {
    model: LogBoxModel;
    view: LogBoxView;
    constructor(model: LogBoxModel, view: LogBoxView) {
        this.model = model;
        this.view = view;
    }
    
    update() {
        this.view.display();
    }
}