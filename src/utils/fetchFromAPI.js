const fetchFromAPI = (method, path, body) => {
    let params = {
        method,
        'Accept': 'application/json',
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
}


export default fetchFromAPI
