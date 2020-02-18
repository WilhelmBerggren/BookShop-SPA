export default class FormModel {
    constructor(resourceManager) {
        this.params = {
            op : 'insert',
            id : '',
            title : '',
            author : ''
        }
        this.resourceManager = resourceManager;
    }
    
    async submitForm(params) {
        for(let [key, value] of Object.entries(params)) {
            if(value) {
                this.params.key = value;
            }
        }
        let res = await this.resourceManager.submitForm(params);
        return res;
    }
}