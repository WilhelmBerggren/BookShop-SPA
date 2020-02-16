'use strict';

displayBooks();

async function submitForm (event) {
    event.preventDefault();
    await myFetch(Object.fromEntries(new FormData(event.target).entries()));
    displayBooks();
}

async function displayBooks() {
    await myFetch({op: 'select'}).then(res => {
        document.querySelector('#books').innerHTML = res.data.map((book) => `
            <div class='card'>
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>ID: ${book.id}</p>
                <p>Updated: ${book.updated}</p>
            </div>
        `).join('');
    });
}

async function myFetch(params, useKey = true) {
    if(useKey) params.key = await getKey();
    let url = new URL('https://www.forverkliga.se/JavaScript/api/crud.php');
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return await persistentFetch(url);
}

async function persistentFetch(url, n = 10) {
    document.querySelector('#attempts').innerHTML = 11 - n;
    if(n <= 0) return {};
    let json = await fetch(url)
        .then(res => res.json())
        .catch(e => {throw e});
    return (json.status == "success") ? json : persistentFetch(url, n-1);
}

async function getKey(refreshKey = false) {
    if(window.localStorage.getItem('key') == null || refreshKey == true) {
        console.log("Getting new key...");
        await myFetch({'requestKey': true}, false).then((k) => 
            window.localStorage.setItem('key', k.key)
        );
    }
    let key = window.localStorage.getItem('key');
    document.querySelector('#key').innerHTML = key;
    return key;
}