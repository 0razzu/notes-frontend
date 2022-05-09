import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    firstName: localStorage.getItem('currentUser/firstName'),
    patronymic: localStorage.getItem('currentUser/patronymic'),
    lastName: localStorage.getItem('currentUser/lastName'),
    login: localStorage.getItem('currentUser/login')
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

        clear: state => initialState
    }
})


export const {set: setCurrentUser, clear: clearCurrentUser} = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
