export default class FormController {
    constructor(model, view) {
        this.model = model;

        this.view = view;
        
        document.addEventListener('change', (event) => {
            if(event.target && event.target.id == 'op') {
                this.model.params.op = event.target.value;
                this.model.resourceManager.notify();
            }
        });
        
        document.addEventListener('submit', async (event) => {
            event.preventDefault();
            let params = Object.fromEntries(new FormData(event.target).entries());
            await this.model.submitForm(params).then(() => {
                this.model.resourceManager.notify();
            });
        });
    }
    
    update() {
        this.view.display();
    }
}