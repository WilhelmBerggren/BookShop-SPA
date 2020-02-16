'use strict';

handleOpChange();
displayBooks();

document.querySelector('#op').addEventListener('change', handleOpChange);
document.querySelector('#bookForm').addEventListener('submit', submitForm);

function handleOpChange() {
    const fields = {
        id: '#id-row', 
        title: '#title-row', 
        author: '#author-row'
    }
    const opHides = {
        insert: [fields.id], 
        update: [], 
        delete: [fields.title, fields.author]
    }
    const setDisplay = (id, value) => document.querySelector(id).style.display = value;
    Object.values(fields).map((row) => setDisplay(row, ''));
    opHides[document.querySelector('#op').value].map((row) => setDisplay(row, 'none'));
}

async function submitForm(event) {
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
    if(n <= 0) return {data: []};
    let json = await fetch(url).then(res => res.json());
    if (json.status == "success") {
        document.querySelector('#attempts').innerHTML += `<p>${11 - n}</p>`;
        return json;
    } 
    else return persistentFetch(url, n-1);
}

async function getKey(refreshKey = false) {
    if(window.localStorage.getItem('key') == null || refreshKey == true) {
        await myFetch({'requestKey': true}, false).then((k) => 
            window.localStorage.setItem('key', k.key)
        );
    }
    let key = window.localStorage.getItem('key');
    document.querySelector('#key').innerHTML = key;
    return key;
}