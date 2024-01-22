import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthQuery } from './baseQuery'

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseAuthQuery('/users'),
    endpoints: (builder) => ({
        // Define your API endpoints here
        getUsers: builder.query({
            query: () => '/',
        }),
        reauth: builder.mutation({
            query: () => ({
                url: '/reauth',
                method: 'GET'                
            }),
            transformResponse: (response) => {   
                console.log("Response Reauth", response)
                return response
            },
            transformErrorResponse: (response) => {   
                return {...response.data, status: response?.status }
            }
        })        
    }),
});