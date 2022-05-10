const STORE_PREFIX = `s-`


const loadStore = () => {
    const serializedStore = {}

    try {
        for (const key in localStorage)
            if (key.startsWith(STORE_PREFIX))
                serializedStore[key.replace(STORE_PREFIX, '')] = JSON.parse(localStorage[key])
    } catch (e) {
    }

    return serializedStore
}


const saveStore = (store) => {
    try {
        for (const storeKey in store)
            localStorage.setItem(`${STORE_PREFIX}${storeKey}`, JSON.stringify(store[storeKey]))
    } catch (e) {
    }
}


export {loadStore, saveStore}
