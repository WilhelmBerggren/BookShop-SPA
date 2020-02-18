export default class LogBoxModel {
    constructor(resourceManager) {
        this.resourceManager = resourceManager;
        this.attempts = [];
    }

    addAttempt(attempt) {
        console.log("LogBoxModel addAttempt: ", attempt);
        if(attempt)
            this.attempts.push(attempt);
        else
            this.attempts.push('Error: undefined attempt');
    }

    getAttempts() {
        return this.resourceManager.attempts;
    }
}