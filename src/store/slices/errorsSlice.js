import {createSlice} from '@reduxjs/toolkit'


const initialState = []


const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        add: (state, action) => {
            const error = action.payload

            if (!state.map(e => e.code).includes(error.code))
                state.push(error)
        },

        clear: state => initialState,
    }
})


export const {add: addError, clear: clearErrors} = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer
