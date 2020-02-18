import { Book } from "../models/BookModel";

export default class ResourceManager {
    listeners: any[];
    attempts: any[];
    key: string;
    constructor() {
        this.listeners = [];
        this.attempts = [];
        this.key = '';
        this.getKey();
    }

    async notify() {
        this.listeners.forEach((listener) => listener.update());
    }

    async addListener(listener) {
        this.listeners.push(listener);
    }

    async getBooks(): Promise<Book[]> {
        return await this.persistentFetch(
            'getBooks', {
                op: 'select',
                key: await this.getKey(), 
            }).then((res) => res.data);
    }

    async persistentFetch(name: string, params: Params, requestKey = false): Promise<any> {
        let url = new URL('https://www.forverkliga.se/JavaScript/api/crud.php');
        if(requestKey == true) {
            url.searchParams.append('requestKey', 'true');
        }
        else {
            if(params.op)
                url.searchParams.append('op', params.op);
            if(params.id)
                url.searchParams.append('id', params.id);
            if(params.title)
                url.searchParams.append('title', params.title);
            if(params.author)
                url.searchParams.append('author', params.author);
            if(params.key)
                url.searchParams.append('key', params.key);
        }
        let n = 0;
        while(n < 10) {
            n++;
            let res = await fetch(url.toString()).then(res => res.json());
            if (res.status == "success") {
                this.attempts.push(`${name}: Fetched in ${(10 - n)} tries`);
                this.notify();
                return res;
            }
        }
        this.attempts.push(`${name}: Failed to fetch`);
        this.notify();
        let res = new Response();
        res['attempt'] = 'Failed to fetch';
        return res;
    }

    async getKey(): Promise<string> {
        if(window.localStorage.getItem('key') == null) {
            this.key = await this.refreshKey();
            return this.key;
        }
        return window.localStorage.getItem('key');
    }

    async refreshKey() : Promise<string> {
        return await this.persistentFetch('getKey', null, true).then((k) => {
            window.localStorage.setItem('key', k);
            this.notify();
            return k.key;
        });
    }

    async submitForm(params: Params) {
        params.key = await this.getKey();
        return await this.persistentFetch('submitForm', params);
    }
}

export interface Params {
    op?: string;
    id?: string;
    title?: string;
    author?: string;
    key?: string;
}