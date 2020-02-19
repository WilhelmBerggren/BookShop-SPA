import LogBoxModel from '../models/LogBoxModel';

export default class LogBoxView {
    model: LogBoxModel;
    constructor(model: LogBoxModel) {
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