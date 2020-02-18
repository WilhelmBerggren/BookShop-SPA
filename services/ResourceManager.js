export default class ResourceManager {
    constructor() {
        this.listeners = [];
        this.attempts = [];
        this.key = this.getKey();
    }

    async notify() {
        this.listeners.forEach((listener) => listener.update());
    }

    async addListener(listener) {
        this.listeners.push(listener);
    }

    async getBooks() {
        return await this.persistentFetch(
            'getBooks', {
                key: await this.getKey(), 
                op: 'select'
            });
    }

    async persistentFetch(name, params) {
        let url = new URL('https://www.forverkliga.se/JavaScript/api/crud.php');
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
        let n = 0;
        while(n < 10) {
            n++;
            let json = await fetch(url).then(res => res.json());
            if (json.status == "success") {
                json.attempt = (`${name}: Fetched in ${(10 - n)} tries`);
                this.attempts.push(json.attempt);
                this.notify();
                return json;
            }
        }
        this.attempts.push({attempt: 'Failed to fetch'});
        this.notify();
        return {attempt: 'Failed to fetch'};
    }

    async getKey() {
        if(window.localStorage.getItem('key') == null) {
            return await this.refreshKey();
        }
        return window.localStorage.getItem('key');
    }

    async refreshKey() {
        return await this.persistentFetch('getKey', {'requestKey': true}).then((k) => {
            window.localStorage.setItem('key', k.key);
            this.notify();
            return k.key;
        });
    }

    async submitForm(params) {
        params.key = await this.getKey();
        return await this.persistentFetch('submitForm', params);
    }
}