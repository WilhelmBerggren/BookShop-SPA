export default class KeyView {
    constructor(model) {
        this.model = model;
    }

    async display() {
        return /*html*/`
            <h1> Key </h1>
            <button id="refresh-key">Refresh</button>
            <p> ${await this.model.getKey()} </p>
        `
    }
}