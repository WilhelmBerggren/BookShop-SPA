'use strict';

handleOpChange();
displayBooks();

document.querySelector('#get-key').addEventListener('click', refreshKey);
document.querySelector('#get-books').addEventListener('click', displayBooks);
document.querySelector('#op').addEventListener('change', handleOpChange);
document.querySelector('#filter').addEventListener('input', displayBooks);
document.querySelector('#book-form').addEventListener('submit', submitForm);

async function refreshKey() {
    window.localStorage.removeItem('key');
    return await getKey().then(() => displayBooks());
}

async function getKey() {
    let key = window.localStorage.getItem('key');
    if(key == null) {
        await persistentFetch('?requestKey').then((res) => {
            console.log("setting key to: ", res.key);
            window.localStorage.setItem('key', res.key);
        });
    }
    
    key = window.localStorage.getItem('key');
    document.querySelector('#key').innerHTML = `<p>Key: ${key || 'not set'}</p>`
    return key;
}

function handleOpChange() {
    let value = document.querySelector('#op').value;
    const setDisplay = (id, value) => document.querySelector(id).style.display = value;

    if(value == 'insert') {
        setDisplay('#id', 'none');
        setDisplay('#title', '');
        setDisplay('#author', '');
    }
    else if(value == 'delete') {
        setDisplay('#id', '');
        setDisplay('#title', 'none');
        setDisplay('#author', 'none');
    }
    else if(value == 'update') {
        setDisplay('#id', '');
        setDisplay('#title', '');
        setDisplay('#author', '');
    }
}

async function submitForm(event) {
    event.preventDefault();
    const val = (id) => document.querySelector(id).value;
    const params = (key, op, id, title, author) => `?key=${key}&op=${op}&id=${id}&title=${title}&author=${author}`

    await getKey().then(key => 
        persistentFetch(params(key, val('#op'), val('#id'), val('#title'), val('#author'))))
        .then(() => displayBooks());
}

async function displayBooks() {
    let f = document.querySelector('#filter').value;
    let filter = (book) => Object.values(book).some(val => ('' + val).includes(f));

    await getKey().then((key) => {
        console.log("key: ", key);
        persistentFetch(`?key=${key}&op=select`).then((res) => {
            document.querySelector('#books').innerHTML = res.data.filter(filter).map((book) => `
            <div class='card'>
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>ID: ${book.id}</p>
                <p>Updated: ${book.updated}</p>
            </div>
        `).join('');
        });
    });
}

async function persistentFetch(params, n = 10) {
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php' + params;
    if(n <= 0) return {data: []};
    let json = await fetch(url).then(res => res.json());
    if (json.status == "success") {
        console.log(json);
        document.querySelector('#attempts').innerHTML += `<p>GET (${n}): ${params}</p>`;
        return json;
    } 
    else return persistentFetch(params, n-1);
}