import { createSlice } from '@reduxjs/toolkit'
import { orderApi } from '../api'

const orderSlice = createSlice({
    name: 'orders',
    initialState: { orders: [], order: null, total : 0},   
    reducers: {       
        clear: (state ) => {        
            state.orders = []    
            state.order = null          
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            orderApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {                
                state.orders = payload.orders
            }
        )               
        builder.addMatcher(
            orderApi.endpoints.getAll.matchFulfilled,
            (state, { payload }) => {                
                state.orders = payload.orders
                state.total = payload.total
            }
        )               
        builder.addMatcher(
            orderApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {
                state.orders.push(payload.order)
            }
        )               
        builder.addMatcher(
            orderApi.endpoints.getDetails.matchFulfilled,
            (state, { payload }) => {
                state.order = payload.order
            }
        )
        builder.addMatcher(
            orderApi.endpoints.updateStatus.matchFulfilled,
            (state, { payload }) => {
                state.order.status = payload.status                
                let index = state?.orders?.findIndex(x => x?._id === payload?.id)
                if(index > -1){
                    state.orders[index].status = payload.status
                }
            }
        )               
        builder.addMatcher(
            orderApi.endpoints.updateDriver.matchFulfilled,
            (state, { payload }) => {
                state.order.driver = payload.driver                
                let index = state?.orders?.findIndex(x => x?._id === payload?.id)
                console.log("Index", index)
                if(index > -1){
                    state.orders[index].driver = payload.driver
                }
            }
        )               
    }
})

export default orderSlice.reducer
