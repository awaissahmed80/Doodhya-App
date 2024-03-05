import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthQuery } from './baseQuery'

export const entryApi = createApi({
    reducerPath: 'entryApi',
    baseQuery: baseAuthQuery('/entries'),
    endpoints: (builder) => ({               
        get: builder.mutation({
            query: ({filter, page}) => ({
                url: `/${page}`,
                method: "POST",    
                body: filter      
            }),
            transformResponse: (response) => {       
                      
                return response
            },
            transformErrorResponse: (response) => {    
                                         
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }),
        create: builder.mutation({
            query: ({formData, id}) => ({
                url: `/entry/${id}`,
                method: "POST",    
                body: formData      
            }),
            transformResponse: (response) => {       
                      
                return response
            },
            transformErrorResponse: (response) => {    
                                         
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }),
        unbilled: builder.mutation({
            query: (id ) => ({
                url: `/unbilled/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => {       
                console.log("Res", response)  
                return response
            },
            transformErrorResponse: (response) => {    
                    console.log("E Res", response)
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        })      
    }),
    
});