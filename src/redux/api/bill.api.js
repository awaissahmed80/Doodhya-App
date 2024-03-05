import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthQuery } from './baseQuery'

export const billApi = createApi({
    reducerPath: 'billApi',
    baseQuery: baseAuthQuery('/bills'),
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
            query: ({formData}) => ({
                url: `/`,
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
        })            
    }),
    
});