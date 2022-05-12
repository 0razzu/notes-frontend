import {createSlice} from '@reduxjs/toolkit'


const initialState = []


const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        add: (state, action) => {
            state.push(...action.payload)
        },

        clear: state => initialState,
    }
})


export const {add: addErrors, clear: clearErrors} = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer
