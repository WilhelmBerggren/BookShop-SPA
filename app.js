'use strict';

async function getKey() {
    if(window.localStorage.getItem('key') == 'null') {
        await persistentFetch('?requestKey').then((k) => {
            window.localStorage.setItem('key', k.key);
            return k.key;
        });
    }
    return window.localStorage.getItem('key');
}

const bookForm = document.querySelector('#bookForm');
bookForm.onsubmit = async (e) => {
    e.preventDefault();

    let op = bookForm.op.value;
    let id = bookForm.id.value;
    let title = bookForm.title.value;
    let author = bookForm.author.value;
    
    persistentFetch(`?key=${await getKey()}&op=${op}&title=${title}&author=${author}&id=${id}`);
}

async function persistentFetch(queryParams) {
    let jsonRes = {status: "error"}
    let attempts = 0;
    while(jsonRes.status !== "success") {
        attempts++;
        const response = await fetch('https://www.forverkliga.se/JavaScript/api/crud.php' + queryParams);
        jsonRes = await response.json();
    }
    document.querySelector('#attempts').innerHTML = attempts;
    return jsonRes;
}

displayBooks();

async function displayBooks() {

    let bookTemplate = (book) => `
        <div class="tile is-child box">
            <p> ${book.author} </p>
            <p class="title"> ${book.title} </p>
            <p> ${book.updated} </p>
            <p> ${book.id} </p>
        </div>
    `
    await persistentFetch(`?key=${await getKey()}&op=select`).then(res => {
        if(res.status == "success") {
            let bookSection = document.querySelector('#books');
            bookSection.innerHTML = '';
            for(let book of res.data) {
                let d = document.createElement('div');
                d.innerHTML = bookTemplate(book);
                bookSection.appendChild(d);
            }
        }
    });
}