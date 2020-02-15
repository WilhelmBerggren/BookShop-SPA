const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';

var key = window.localStorage.getItem('key');
console.log(key);
if(key == null) {
    fetch(baseUrl + '?requestKey')
    .then(res => res.json())
    .then(json => key = json.key)
    .then(() => window.localStorage.setItem('key', key))
    .catch(e => console.log("Error: " + e));
}

/*submitBook({
    title: 'testing',
    author: 'memememe',
    op: 'insert'
});*/

const bookForm = document.querySelector('#bookForm');
bookForm.onsubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(bookForm);
    let obj = {}
    for(let [key, value] of data) {
        obj[key] = value;
    }
    obj.op = 'insert';
    console.log(obj);
    let response = submitBook(obj);
    console.log(response);
    //displayBooks();
}

function submitBook(book) {
    doFetch('POST', book)
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then((json) => {
        console.log(json);
    });
}

displayBooks();

async function getBooks() {
    //return await JSON.parse("{\"status\":\"success\",\"data\":[{\"id\":83939,\"title\":\"qwop\",\"author\":\"asdf2\",\"updated\":\"2020-02-15 11:14:38\"},{\"id\":83940,\"title\":\"test\",\"author\":\"me\",\"updated\":\"2020-02-15 11:22:03\"},{\"id\":83941,\"title\":\"testing\",\"author\":\"memememe\",\"updated\":\"2020-02-15 11:24:30\"}]}");
    let res =  await doFetch('GET', {op: 'select'})
    .then(res => {
        console.log(res);
        return res.json()
    });
    console.log(JSON.stringify(res));
    return res;
}

async function doFetch(method = '', params = {}) {
    let url = new URL(baseUrl);
    url.searchParams.set('key', key);
    for(let [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }
    console.log('fetching: ' + url);
    const response = await fetch(url, {
        method: method
    })
    .catch(e => console.log("Error: " + e));
    return response;
}

function displayBooks() {

    let bookTemplate = (book) => `
    <div class="tile is-child box">
            <p> ${book.author} </p>
            <p class="title"> ${book.title} </p>
            <p> ${book.updated} </p>
    </div>
    `
    getBooks().then(res => {
        console.log(res);
        document.querySelector('#books').innerHTML = '';
        if(res.status == "success") {
            for(let book of res.data) {
                console.log(book);
                const b = document.createElement('div');
                b.innerHTML = bookTemplate(book);
                b.classList.add('column');
                b.classList.add('book');
                document.querySelector('#books').appendChild(b);
            }
        }
    });
}