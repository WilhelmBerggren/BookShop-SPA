'use strict';

window.onload = () => {
    console.log("loaded");
    handleOpChange();
    displayBooks();
    
    document.querySelector('#get-key').addEventListener('click', refreshKey);
    document.querySelector('#get-books').addEventListener('click', displayBooks);
    document.querySelector('#op').addEventListener('change', handleOpChange);
    document.querySelector('#filter').addEventListener('input', displayBooks);
    document.querySelector('#book-form').addEventListener('submit', submitForm);
};

function renderTable(books) {
    document.querySelector('#books').innerHTML = /*html*/`<table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Updated</th>
        </tr>
        ${books.map(book => /*html*/`<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.updated}</td>
        </tr>`).join('')}
    </table>`
}

async function refreshKey() {
    window.localStorage.removeItem('key');
    return await getKey().then(() => displayBooks());
}

async function getKey() {
    let key = window.localStorage.getItem('key');
    if(key == null) {
        await fetchAndLog('?requestKey').then((res) => {
            window.localStorage.setItem('key', res.key);
        });
    }
    
    key = window.localStorage.getItem('key');
    document.querySelector('#key').innerHTML = key || 'not set';
    return key;
}

function handleOpChange() {
    let value = document.querySelector('#op').value;
    const setDisplay = (id, value) => document.querySelector(id).style.display = value;
    
    //display all
    ['#id', '#title', '#author'].map(id => setDisplay(id, ''));
    
    if(value == 'insert') {
        setDisplay('#id', 'none');
    }
    else if(value == 'delete') {
        setDisplay('#title', 'none');
        setDisplay('#author', 'none');
    }
}

async function submitForm(event) {
    event.preventDefault();
    const val = (id) => document.getElementById(id).value;
    const params = (key, op, id, title, author) => `?key=${key}&op=${op}&id=${id}&title=${title}&author=${author}`

    await getKey().then(key => 
        fetchAndLog(params(key, val('op'), val('id'), val('title'), val('author'))))
        .then(() => displayBooks());
}

async function displayBooks() {
    let f = document.querySelector('#filter').value;
    let filter = (book) => Object.values(book).some(val => ('' + val).includes(f));

    await getKey().then((key) => {
        fetchAndLog(`?key=${key}&op=select`).then((res) => {
            if(res.data) renderTable(res.data.filter(filter));
        });
    });
}

async function fetchAndLog(params) {
    let row = (ar) => /*html*/`<tr>${ar.map(item => `<td>${item}</td>`).join('')}</tr>`;
    return await persistentFetch(params).then(res => {
        document.querySelector('#attempts').innerHTML += row([res.attempts, (res.message || params)]);
        return res;
    });
}

async function persistentFetch(params, n = 10) {
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php' + params;
    while(n > 0) {
        n--;
        let json = await fetch(url).then(res => res.json());
        if (json.status == "success") {
            json.attempts = 10 - n;
            return json;
        }
    }
    return {attempts: n, message: "Max attempts reached"};
}