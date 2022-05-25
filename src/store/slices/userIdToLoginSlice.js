import {createSlice} from '@reduxjs/toolkit'


const initialState = {}


const userIdToLoginSlice = createSlice({
    name: 'userIdToLogin',
    initialState,
    reducers: {
        add: (state, action) => ({
            ...state,
            ...action.payload
        }),
        addAll: (state, action) => ({
            ...state,
            ...action.payload.reduce((result, user) => ({...result, ...user}))
        }),
        clear: state => initialState,
    }
})


export const {
    add: addUserIdToLogin,
    addAll: addAllUserIdToLogin,
    clear: clearUserIdToLogin
} = userIdToLoginSlice.actions
export const userIdToLoginReducer = userIdToLoginSlice.reducer
