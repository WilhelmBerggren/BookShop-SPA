import ResourceManager from '../services/ResourceManager';

export default class LogBoxModel {
    resourceManager: ResourceManager;
    attempts: string[];
    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
        this.attempts = [];
    }

    addAttempt(attempt: string) {
        if(attempt)
            this.attempts.push(attempt);
        else
            this.attempts.push('Error: undefined attempt');
    }

    getAttempts() {
        return this.resourceManager.attempts;
    }
}