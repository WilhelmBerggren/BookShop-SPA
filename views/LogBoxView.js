export default class FormView {
    constructor(model) {
        this.model = model;
    }

    async display() {
        return /*html*/`
            <h1> Submission Attempts </h1>
            <p id="attempts"></p>
            ${this.model.getAttempts().map((attempt) => /*html*/`
                <p>${attempt}</p>
            `).join('')}
        `
    }
}