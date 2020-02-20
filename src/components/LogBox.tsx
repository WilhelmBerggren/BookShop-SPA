import * as React from 'react';
import { BookAPIResponse } from '../services/FetchUtil';

export interface LogBoxParams {
    origin: string;
    response: BookAPIResponse;
    attempts: number;
}

export const LogBox = (props: {attempts: LogBoxParams[]}) => {
    return <div className="card">
        <h1> Submission Attempts </h1>
        <p id="attempts"></p>
        {props.attempts.map((attempt) => <p>{attempt.origin}: {attempt.attempts}</p>)}
    </div>
}