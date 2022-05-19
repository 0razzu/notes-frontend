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
            body: JSON.stringify(body),
        }

    return fetch(process.env.REACT_APP_API + path, params)
        .then(response => response.json())
        .then(response => throwIfErrors(response))
}


const throwIfErrors = response => {
    if (response.errors)
        throw response

    return response
}


const stringifyParams = params => {
    let paramStr = '?'

    for (const key in params) {
        const value = params[key]

        if (value !== undefined)
            paramStr += `${key}=${value}&`
    }

    return paramStr.slice(0, -1)
}


const fetcherCreator = method => (path, body) => fetchFromAPI(method, path, body)


export const postToAPI = fetcherCreator('POST')
export const putToAPI = fetcherCreator('PUT')
export const getFromAPI = fetcherCreator('GET')
export const deleteFromAPI = fetcherCreator('DELETE')
export {stringifyParams}
