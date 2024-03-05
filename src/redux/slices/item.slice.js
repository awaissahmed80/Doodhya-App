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
        builder.addMatcher(
            itemApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {
                state.items = [payload.item, ...state.items ]
            }
        )               
        builder.addMatcher(
            itemApi.endpoints.update.matchFulfilled,
            (state, { payload }) => {
                let all_items = [...state.items]
                let index = all_items.findIndex(x => x?._id === payload?.item?._id)
                if(index > -1){
                    all_items[index] = payload.item
                }
                state.items = all_items
            }
        )               
    }
})

export default itemSlice.reducer
