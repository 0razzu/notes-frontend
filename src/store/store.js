import {configureStore} from '@reduxjs/toolkit'
import {currentUserReducer} from './slices/currentUserSlice'
import {loadStore, saveStore} from './localStorage'
import {localeCodeReducer} from './slices/locale/localeCodeSlice'
import {localeDataReducer} from './slices/locale/localeDataSlice'
import {setLocale} from './slices/locale/actionCreators'
import {errorsReducer} from './slices/errorsSlice'
import {pageIdReducer} from './slices/pageIdSlice'


const store = configureStore({
    reducer: {
        pageId: pageIdReducer,
        currentUser: currentUserReducer,
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
        currentUser: state.currentUser,
        localeCode: state.localeCode,
    })
})


export default store
