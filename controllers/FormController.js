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
        
        document.addEventListener('submit', (event) => {
            event.preventDefault();
            let params = Object.fromEntries(new FormData(event.target).entries());
            this.model.submitForm(params);
            this.model.notify();
        });
    }
    
    update() {
        this.view.display();
    }

    notify() {
        this.update();
    }
}