import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: undefined,
    firstName: undefined,
    patronymic: undefined,
    lastName: undefined,
    login: undefined
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => {
            const payload = action.payload

            state.id = payload.id
            state.firstName = payload.firstName
            state.patronymic = payload.patronymic
            state.lastName = payload.lastName
            state.login = payload.login
        },

        clear: state => initialState,
    }
})


export const {set: setUser, clear: clearUser} = userSlice.actions
export const userReducer = userSlice.reducer
