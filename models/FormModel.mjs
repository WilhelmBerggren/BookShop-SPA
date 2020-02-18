import Utils from '../services/Utils.mjs';

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
        this.params = params;
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