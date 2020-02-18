import ResourceManager from '../services/ResourceManager.js';

export default class KeyModel {
    resourceManager: ResourceManager;
    key: string;
    constructor(resourceManager: ResourceManager) {
        this.key = '';
        this.resourceManager = resourceManager;
    }

    async getKey() {
        return await this.resourceManager.getKey().then((res) => {
            this.key = res;
            return res;
        });
    }
}