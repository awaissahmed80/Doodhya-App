import { createSlice } from '@reduxjs/toolkit'
import { billApi } from '../api'

const billSlice = createSlice({
    name: 'bills',
    initialState: { bills: [], bill: null, total : 0},   
    reducers: {       
        clear: (state ) => {        
            state.bills = []    
            state.bill = null          
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            billApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {                
                state.bills = payload.bills
            }
        )
        builder.addMatcher(
            billApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {                
                state.bills.push(payload.bill)                               
            }
        )        
    }
})

export default billSlice.reducer
