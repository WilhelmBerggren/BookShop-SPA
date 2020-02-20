import * as React from 'react';
import { useState } from 'react';

export const Key = (props: {myKey: string, refreshKey: () => void}) => {
    return <div className="card">
        <h1> Key </h1>
        <button onClick={props.refreshKey}>Refresh</button>
        <p> {props.myKey || 'no key'} </p>
    </div>
}