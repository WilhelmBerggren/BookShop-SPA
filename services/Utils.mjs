const Utils = {
    getBooks: async () => {
        return await Utils.persistentFetch('getBooks', {key: await Utils.getKey(), op: 'select'}).then(json => json.data);
    },

    persistentFetch: async (name, params) => {
        let url = new URL('https://www.forverkliga.se/JavaScript/api/crud.php');
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
        let n = 0;
        while(n < 10) {
            n++;
            let json = await fetch(url).then(res => res.json());
            if (json.status == "success") {
                json.attempts = (`Fetched in ${(10 - n)} tries`);
                Utils.logRequest(name, json.attempts);
                return json;
            }
        }
        Utils.logRequest(name, 'Failed to fetch');
        return {attempts: 'Failed to fetch'};
    },

    getKey: async () => {
        if(window.localStorage.getItem('key') == null) {
            await Utils.persistentFetch('getKey', {'requestKey': true}).then((k) => {
                window.localStorage.setItem('key', k.key)
            });
        }
        let key = window.localStorage.getItem('key');
        document.querySelector('#key').innerHTML = `<p>${key}</p>`;
        return key;
    },

    submitForm: async (params) => {
        params.key = await Utils.getKey();
        return await Utils.persistentFetch('submitForm', params);
    },

    logRequest: (name, message) => {
        document.querySelector('#attempts').innerHTML += `<p>${name}: ${message}</p>`;
    }
}

export default Utils;