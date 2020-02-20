import * as React from 'react';
import { useState, useEffect } from 'react';
import { Params } from '../services/FetchUtil';

export const Form = (props: {handleSubmit: (params: Params) => void}) => {
    const [op, setOp] = useState('insert');
    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    let changeOp = (event: React.ChangeEvent<HTMLSelectElement>) => { setOp(event.target.value) };
    let changeId = (event: React.ChangeEvent<HTMLInputElement>) => { setId(event.target.value) }
    let changeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => { setAuthor(event.target.value) }
    let changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value) }
  
    return <section className="card">
        <div id="book-form-container">
            <h1> Form </h1>
            <div className="cards card">
                <form id="bookForm" onSubmit={(event) => {
                    event.preventDefault();
                    props.handleSubmit({op, id, author, title})}}>
                    <div className="row">
                        <h3> Action </h3>
                        <select name="op" id="op" onChange={changeOp}>
                            <option value="insert">Insert</option>
                            <option value="update">Update</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
                    {(op == 'update' || op == 'delete') && <div className="row">
                        <h3> ID </h3>
                        <input name='id' placeholder={'id'} type='text' onChange={changeId}/>
                    </div>
                    }
                    {(op == 'insert' || op == 'update') && <div className="row">
                        <h3> Title </h3>
                        <input name='title' placeholder={'title'} type='text' onChange={changeTitle}/>
                    </div>}
                    {(op == 'insert' || op == 'update') &&  <div className="row">
                        <h3> Author </h3>
                        <input name='author' placeholder={'author'} type='text' onChange={changeAuthor}/>
                    </div>}
                    <div className="row">
                        <h3> Submit </h3>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    </section>
}