import { IBook } from "../components/Books";


async function persistentFetch(
    params: Params, 
    n=10,
    prevResponse: BookAPIResponse = null)
    : Promise<{attempts: number, response: BookAPIResponse}> {
    if(n < 1) {
        return Promise.resolve({attempts: 10, response: prevResponse});
    }

    let url = paramsToUrl(params, 'https://www.forverkliga.se/JavaScript/api/crud.php');
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.status == 'success') {
                return {attempts: 10-n, response: res}
            }
            else {
                return persistentFetch(params, n-1, prevResponse=res);
            }
        });
}

const fetchKey = async () => {
    return await persistentFetch({requestKey: true});
}

const fetchBooks = async (key: string) => {
    return await persistentFetch({ op: 'select', key: key});
}

const submitForm = async (params: Params) => {
    return await persistentFetch(params);
}

const paramsToUrl = (params: Params, host: string) => {
    let url = new URL(host);
    if(params.requestKey) {
        url.searchParams.append('requestKey', 'true');
        return url.toString();
    }
    if(params.op)
        url.searchParams.append('op', params.op);
    if(params.id)
        url.searchParams.append('id', params.id);
    if(params.title)
        url.searchParams.append('title', params.title);
    if(params.author)
        url.searchParams.append('author', params.author);
    if(params.key)
        url.searchParams.append('key', params.key);
    return url.toString();
}

export interface BookAPIResponse {
    status: string,
    data?: IBook[],
    id?: string,
    message?: string,
    key?: string
}

export interface Params {
    op?: string;
    id?: string;
    title?: string;
    author?: string;
    key?: string;
    requestKey?: boolean;
}

export { persistentFetch, submitForm, fetchBooks, fetchKey }