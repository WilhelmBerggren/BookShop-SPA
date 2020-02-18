import ResourceManager, { Params } from '../services/ResourceManager.js';

export default class FormModel {
    resourceManager: ResourceManager;
    op: string;
    id: string;
    title: string;
    author: string;
    constructor(resourceManager: ResourceManager) {
        this.op = 'insert';
        this.id = '';
        this.title = '';
        this.author = '';

        this.resourceManager = resourceManager;
    }
    
    async submitForm(params: Params) {
        let res = await this.resourceManager.submitForm(params);
        return res;
    }
}