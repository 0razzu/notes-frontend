import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from './slices/userSlice'
import {loadStore, saveStore} from './localStorage'
import {localeCodeReducer} from './slices/locale/localeCodeSlice'
import {localeDataReducer} from './slices/locale/localeDataSlice'
import {setLocale} from './slices/locale/actionCreators'
import {errorsReducer} from './slices/errorsSlice'
import {pageReducer} from './slices/pageSlice'


const store = configureStore({
    reducer: {
        page: pageReducer,
        user: userReducer,
        localeCode: localeCodeReducer,
        localeData: localeDataReducer,
        errors: errorsReducer,
    },
    preloadedState: loadStore()
})


store.dispatch(setLocale(store.getState().localeCode))


store.subscribe(() => {
    const state = store.getState()

    saveStore({
        user: state.user,
        localeCode: state.localeCode,
    })
})


export default store
