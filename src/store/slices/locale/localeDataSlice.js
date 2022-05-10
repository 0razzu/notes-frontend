import {createSlice} from '@reduxjs/toolkit'
import MESSAGES from '../../../i18n/messages'
import {DEFAULT_LOCALE} from './consts'
import {SET_LOCALE} from './actionTypes'


const initialState = {
    defaultLocale: DEFAULT_LOCALE,
    messages: MESSAGES[DEFAULT_LOCALE]
}


const localeDataSlice = createSlice({
    name: 'localeData',
    initialState,
    reducers: {},
    extraReducers: {
        [SET_LOCALE]: (state, action) => {
            state.messages = {...MESSAGES[DEFAULT_LOCALE], ...MESSAGES[action.payload]}
        }
    },
})


export const localeDataReducer = localeDataSlice.reducer
