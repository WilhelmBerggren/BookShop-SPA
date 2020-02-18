export default class FormController {
    constructor(model, view) {
        this.model = model;
        model.addNotify(this);

        this.view = view;
        this.update();
        
        document.addEventListener('change', (event) => {
            if(event.target && event.target.id == 'op') {
                this.model.params.op = event.target.value;
                this.model.notify();
            }
        });
    }
    
    update() {
        this.view.display();
    }

    notify() {
        this.update();
    }
}