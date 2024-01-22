import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../api'

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, { payload: { user, access_token } } ) => {        
            state.user = user
            state.token = access_token
        },
        setUser: (state, {payload: { user} }) => {
            state.user = user
        },
        clear: (state ) => {                 
            state.user = null
            state.token = null
        },
        token_recieved: (state, { payload: { access_token }} ) => {                    
            state.token = access_token
        },
        logout: (state  ) => {                                
            state.token = null
            state.user = null
        }        
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload: { user, access_token } }) => {
                state.user = user
                state.token = access_token
            }
        )
        builder.addMatcher(
            authApi.endpoints.reauth.matchFulfilled,
            (state, { payload: { user } }) => {
                state.user = user                
            }
        )         
    }
})

export const  authActions  = authSlice.actions
export default authSlice.reducer

export const currentUser = (state) => state.auth
