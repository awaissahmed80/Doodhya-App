import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../api'


const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, },    
    extraReducers: (builder) => {        
        builder.addMatcher(
            userApi.endpoints.reauth.matchFulfilled,
            (state, { payload: { user } }) => {
                state.user = user                
                console.log("State", state)
                // api.dispatch(authActions.token_recieved(user))
            }
        )        
    }
})

export default userSlice.reducer
