'use strict';

displayBooks();

async function submitForm (event) {
    event.preventDefault();
    await myFetch(Object.fromEntries(new FormData(event.target).entries()));
    displayBooks();
}

async function displayBooks() {
    await myFetch({op: 'select'}).then(res => {
        document.querySelector('#books').innerHTML = res.data.reduce((acc, book) => 
            acc + `<div class='box'><p>${book.author}</p><p>${book.title}</p><p>${book.id}</p></div>`
        , '');
    });
}

async function myFetch(params) {
    params.key = await getKey();
    let url = new URL('https://www.forverkliga.se/JavaScript/api/crud.php');
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return await persistentFetch(url);
}

async function persistentFetch(url, n = 10) {
    document.querySelector('#attempts').innerHTML = 11 - n;
    if(n <= 0) return {};
    let json = await fetch(url).then(res => res.json());
    return (json.status == "success") ? json : persistentFetch(url, n-1);
}

async function getKey() {
    if(window.localStorage.getItem('key') == null) {
        await myFetch({'requestKey': true}).then((k) => 
            window.localStorage.setItem('key', k.key)
        );
    }    
    return window.localStorage.getItem('key');
}