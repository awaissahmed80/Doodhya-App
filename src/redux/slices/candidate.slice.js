import { createSlice } from '@reduxjs/toolkit'
import { candidateApi } from '../api'

const candidateSlice = createSlice({
    name: 'candidates',
    initialState: { candidates: []},   
    reducers: {       
        clear: (state ) => {        
            state.candidates = []  
            state.halqas = []                 
        },
    }, 
    extraReducers: (builder) => {        
        builder.addMatcher(
            candidateApi.endpoints.getHalqas.matchFulfilled,
            (state, { payload }) => {
                state.candidates = payload
            }
        )               
    }
})

export default candidateSlice.reducer
