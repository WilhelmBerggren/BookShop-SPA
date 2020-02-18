export default class KeyModel {
    constructor(resourceManager) {
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