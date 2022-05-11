const fetchFromAPI = (method, path, body) => {
    let params = {
        method,
        'Accept': 'application/json',
        credentials: 'include'
    }

    if (body)
        params = {
            ...params,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }

    return fetch(process.env.REACT_APP_API + path, params)
        .then(response => response.json())
        .then(response => throwIfErrors(response))
}


const throwIfErrors = response => {
    if (response.errors)
        throw response
}


export default fetchFromAPI
export const POST = 'POST'
export const PUT = 'PUT'
export const GET = 'GET'
export const DELETE = 'DELETE'
