import { createSlice } from '@reduxjs/toolkit'
import { customerApi } from '../api'

const customerSlice = createSlice({
    name: 'customers',
    initialState: { customers: []},   
    reducers: {       
        clear: (state ) => {        
            state.customers = []              
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            customerApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {
                state.customers = payload.customers
            }
        )               
        builder.addMatcher(
            customerApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {
                state.customers = [payload.customer, ...state.customers ]
            }
        )               
        builder.addMatcher(
            customerApi.endpoints.update.matchFulfilled,
            (state, { payload }) => {
                let all_items = [...state.customers]
                let index = all_items.findIndex(x => x?._id === payload?.customer?._id)
                if(index > -1){
                    all_items[index] = payload.customer
                }
                state.customers = all_items
            }
        )               
    }
})

export default customerSlice.reducer
