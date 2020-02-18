export default class LogBoxController {
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