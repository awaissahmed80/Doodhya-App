import { createSlice } from '@reduxjs/toolkit'
import { areaApi } from '../api'

const areaSlice = createSlice({
    name: 'areas',
    initialState: { areas: []},   
    reducers: {       
        clear: (state ) => {        
            state.areas = []              
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            areaApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {
                state.areas = payload.areas
            }
        )               
    }
})

export default areaSlice.reducer
