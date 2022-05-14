import {createSlice} from '@reduxjs/toolkit'


const initialState = null


const pageIdSlice = createSlice({
    name: 'pageId',
    initialState,
    reducers: {
        set: (state, action) => action.payload,
        clear: state => initialState,
    }
})


export const {set: setPageId, clear: clearPageId} = pageIdSlice.actions
export const pageIdReducer = pageIdSlice.reducer
