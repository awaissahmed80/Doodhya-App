import { createSlice } from '@reduxjs/toolkit'
import { driverApi } from '../api'

const driverSlice = createSlice({
    name: 'drivers',
    initialState: { drivers: []},   
    reducers: {       
        clear: (state ) => {        
            state.drivers = []              
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            driverApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {
                state.drivers = payload.drivers
            }
        )               
        builder.addMatcher(
            driverApi.endpoints.create.matchFulfilled,
            (state, { payload }) => {
                state.drivers = [payload.driver, ...state.drivers ]
            }
        )               
        builder.addMatcher(
            driverApi.endpoints.update.matchFulfilled,
            (state, { payload }) => {
                let all_items = [...state.drivers]
                let index = all_items.findIndex(x => x?._id === payload?.driver?._id)
                if(index > -1){
                    all_items[index] = payload.driver
                }
                state.drivers = all_items
            }
        )               
    }
})

export default driverSlice.reducer
