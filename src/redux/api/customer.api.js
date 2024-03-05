import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthQuery } from './baseQuery'

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseAuthQuery('/customers'),
    endpoints: (builder) => ({               
        get: builder.query({
            query: () => ({
              url: ``,
              method: "GET",          
            }),
            transformErrorResponse: (response) => { 
                console.log("Res", response)  
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
          }),  
        create: builder.mutation({
            query: (formData) => ({
              url: ``,
              method: "POST",          
              body: formData,              
              formData:true           
            }),
            transformErrorResponse: (response) => {   
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
          }), 
          update: builder.mutation({
            query: ({formData, id}) => ({
              url: `/${id}`,
              method: "PUT",          
              body: formData,              
              formData:true           
            }),
            transformErrorResponse: (response) => {   
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
          }),  
    }),
    
});