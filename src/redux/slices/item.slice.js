import { createSlice } from '@reduxjs/toolkit'
import { itemApi } from '../api'

const itemSlice = createSlice({
    name: 'items',
    initialState: { items: []},   
    reducers: {       
        clear: (state ) => {        
            state.items = []              
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            itemApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {
                state.items = payload.items
            }
        )               
    }
})

export default itemSlice.reducer
