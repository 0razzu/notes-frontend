import {configureStore} from '@reduxjs/toolkit'
import {currentUserReducer} from './slices/currentUserSlice'
import {loadStore, saveStore} from '../utils/localStorage'
import {localeCodeReducer} from './slices/locale/localeCodeSlice'
import {localeDataReducer} from './slices/locale/localeDataSlice'
import {setLocale} from './slices/locale/actionCreators'


const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        localeCode: localeCodeReducer,
        localeData: localeDataReducer,
    },
    preloadedState: loadStore()
})


store.dispatch(setLocale(store.getState().localeCode))


store.subscribe(() => {
    const state = store.getState()

    saveStore({
        currentUser: state.currentUser,
        localeCode: state.localeCode,
    })
})


export default store
