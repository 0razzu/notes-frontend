import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    name: undefined,
    asIs: true,
}


const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setId: (state, action) => ({
            name: action.payload,
            asIs: false,
        }),
        setName: (state, action) => ({
            name: action.payload,
            asIs: true,
        }),
        clear: state => initialState,
    }
})


export const {setId: setPageId, setName: setPageName, clear: clearPage} = pageSlice.actions
export const pageReducer = pageSlice.reducer
