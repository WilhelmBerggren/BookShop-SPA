import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form } from './Form';
import { IBook, Books } from './Books';
import { fetchKey, fetchBooks, submitForm, BookAPIResponse } from '../services/FetchUtil'
import { Params } from '../services/FetchUtil';
import { Key } from './Key';
import { LogBox, LogBoxParams } from './LogBox';

export const Main = () => {
    const [attempts, setAttempts] = useState<Array<LogBoxParams>>([]);
    const [key, setKey] = useState(window.localStorage.getItem('key') || '');
    const [books, setBooks] = useState<Array<IBook>>([]);

    const refreshKey = () => { fetchKey().then(res => {
        setAttempts(attempts.concat(attemptFromResponse('fetchKey', res)));
        setKey(res.response.key);
    })};

    const refreshBooks = () => { fetchBooks(key).then(res => {
        setAttempts(attempts.concat(attemptFromResponse('fetchBooks', res)));
        setBooks(res.response.data);
    })};
    
    const submitTheForm = (params: Params) => submitForm({'key': key, ...params}).then(res => {
        setAttempts(attempts.concat(attemptFromResponse('submitForm', res)));
        refreshBooks();
    });
    
    if(!key) refreshKey();
    if(!books) refreshBooks();

    useEffect(() => window.localStorage.setItem('key', key), [key]);
    useEffect(() => refreshBooks(), [key]);

    return <div>
            <Form handleSubmit={(params: Params) => submitTheForm(params)}/>
        <section className="cards">
            <Key myKey={key} refreshKey={refreshKey}/>
            <LogBox attempts={attempts}/>
        </section>
        <Books books={books} refreshBooks={refreshBooks}/>
    </div>
}

const attemptFromResponse = (
    origin: string, 
    res: { attempts: number, response: BookAPIResponse}
) => { return {
    origin: origin, 
    response: res.response,
    attempts: res.attempts
}}