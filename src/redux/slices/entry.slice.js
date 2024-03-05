import { createSlice } from '@reduxjs/toolkit'
import { entryApi } from '../api'

const entrySlice = createSlice({
    name: 'entries',
    initialState: { orders: [], order: null, unbilled: [], total : 0},   
    reducers: {       
        clear: (state ) => {        
            state.orders = []    
            state.order = null          
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            entryApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {                
                state.orders = payload.orders
            }
        )
        builder.addMatcher(
            entryApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {                
                let all_orders = [...state.orders]
                let index = all_orders.findIndex(x => x?._id === payload?.id)                
                if(index > -1){                    
                    all_orders[index].entries.push(payload.entry)
                    all_orders[index].customer.balance = payload?.balance || 0
                    state.orders = all_orders
                }                                
            }
        )                                  
        builder.addMatcher(
            entryApi.endpoints.unbilled.matchFulfilled,
            (state, { payload }) => {                
                state.unbilled = payload.unbilled
            }
        )
    }
})

export default entrySlice.reducer
