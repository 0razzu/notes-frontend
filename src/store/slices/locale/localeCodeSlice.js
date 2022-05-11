import {createSlice} from '@reduxjs/toolkit'
import {DEFAULT_LOCALE} from './consts'
import {SET_LOCALE} from './actionTypes'


const localeCodeSlice = createSlice({
    name: 'localeCode',
    initialState: DEFAULT_LOCALE,
    extraReducers: {
        [SET_LOCALE]: (state, action) => action.payload,
    }
})


export const localeCodeReducer = localeCodeSlice.reducer
