import {configureStore} from '@reduxjs/toolkit'
import {currentUserReducer} from './slices/currentUserSlice'
import {loadStore, saveStore} from '../utils/localStorage'


const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
    },
    preloadedState: loadStore()
})


store.subscribe(() => {
    saveStore({currentUser: store.getState().currentUser})
})


export default store
