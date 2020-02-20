import * as React from 'react';
import { useState, useEffect } from 'react';

const Book = (props: {book: IBook}) => <div className='card'>
    <p>Title: {props.book.title}</p>
    <p>Author: {props.book.author}</p>
    <p>ID: {props.book.id}</p>
    <p>Updated: {props.book.updated}</p>
</div> 

export const Books = (props: {books: IBook[], refreshBooks: () => void}) => {
    const [filter, setFilter] = useState('');
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);
    const inBook = (book: IBook) => {
        return [book.id, book.author, book.title, book.updated].some((val) => (String(val).includes(filter)));
    }

    return <section className="cards">
        <div className="card">
            <h1> Books </h1>
            <input type="text" id="filter" placeholder="filter" onInput={handleInput}/>
            <button onClick={props.refreshBooks}>Refresh</button>
            <div className="cards">
                {props.books.filter(inBook).map((book) => <Book book={book}/>)}
            </div>
        </div>
    </section>
}

export interface IBook {
    id: string,
    author: string,
    title: string,
    updated: string
}