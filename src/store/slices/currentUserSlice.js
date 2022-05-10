import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    firstName: undefined,
    patronymic: undefined,
    lastName: undefined,
    login: undefined
}


const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        set: (state, action) => {
            const payload = action.payload

            state.firstName = payload.firstName
            state.patronymic = payload.patronymic
            state.lastName = payload.lastName
            state.login = payload.login
        },

        clear: state => initialState,
    }
})


export const {set: setCurrentUser, clear: clearCurrentUser} = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
