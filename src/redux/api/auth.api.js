import { createApi } from '@reduxjs/toolkit/query/react'
import { setAuthToken } from '../../helpers'
import { baseQuery } from './baseQuery'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery('/auth'),
    endpoints: (builder) => ({        
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: async (response) => {                                      
                await setAuthToken(response.refresh_token) 
                return response
            },
            transformErrorResponse: (response) => {   
                if(response.status === 'FETCH_ERROR'){
                    return {message: 'An error occured while fetching data from server', status: response?.status }    
                }
                return {...response.data, status: response?.status }
            }
        }),        
        reauth: builder.mutation({
            query: () => ({
                url: '/reauth',
                method: 'GET'                
            }),
            transformResponse: (response) => {                   
                return response
            },
            transformErrorResponse: (response) => {   
                return {...response.data, status: response?.status }
            }
        })
    }),
});