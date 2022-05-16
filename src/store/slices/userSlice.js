import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: undefined,
    firstName: undefined,
    patronymic: undefined,
    lastName: undefined,
    login: undefined,
    super: undefined,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => action.payload,
        clear: state => initialState,
    }
})


export const {set: setUser, clear: clearUser} = userSlice.actions
export const userReducer = userSlice.reducer
