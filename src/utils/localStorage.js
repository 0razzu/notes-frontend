const loadStore = () => {
    try {
        const serializedStore = localStorage.getItem('store')

        return serializedStore === null?
            undefined :
            JSON.parse(serializedStore)
    } catch (e) {
        return undefined
    }
}


const saveStore = (store) => {
    try {
        localStorage.setItem('store', JSON.stringify(store))
    } catch (e) {
    }
}


export {loadStore, saveStore}
