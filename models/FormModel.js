import Utils from '../services/Utils.js';

export default class FormModel {
    constructor() {
        this.notifyList = [];
        this.params = {
            op : 'insert',
            id : '',
            title : '',
            author : ''
        }
    }
    
    async submitForm(params) {
        for(let [key, value] of Object.entries(params)) {
            if(value) {
                this.params.key = value;
            }
        }
        await Utils.submitForm(params);
        this.notify();
    }

    addNotify(listener) {
        this.notifyList.push(listener);
    }

    notify() {
        this.notifyList.forEach((listener) => listener.notify());
    }
}