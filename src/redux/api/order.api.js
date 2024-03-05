import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthQuery } from './baseQuery'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseAuthQuery('/orders'),
    endpoints: (builder) => ({               
        get: builder.query({
            query: () => ({
              url: `/my-orders`,
              method: "GET",          
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
        getDetails: builder.query({
            query: (id) => ({
              url: `/${id}`,
              method: "GET",          
            }),
            transformResponse: (response) => {                       
                console.log("Response", response)         
                return response
            },
            transformErrorResponse: (response) => {  
                console.log("Response", response)                  
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }), 
        getAll: builder.mutation({
            query: ({filter, page}) => ({
              url: `/${page}`,
              method: "POST",    
              body: filter      
            }),
            transformResponse: (response) => {                                       
                return response
            },
            transformErrorResponse: (response) => {    
                // console.log("error res", response)                             
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }),  
        create: builder.mutation({
            query: (form_data) => ({
              url: ``,
              method: "POST",    
              body: form_data      
            }),
            transformErrorResponse: (response) => {   
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }),  
        updateStatus: builder.mutation({
            query: ({id, formData}) => ({
              url: `/status/${id}`,
              method: "PATCH",    
              body: formData      
            }),
            transformErrorResponse: (response) => {   
                  if(response.status === 'FETCH_ERROR'){
                      return {message: 'An error occured while fetching data from server', status: response?.status }    
                  }
                  return {...response.data, status: response?.status }
              }
        }), 
        updateDriver: builder.mutation({
            query: ({id, formData}) => ({
              url: `/driver/${id}`,
              method: "PATCH",    
              body: formData      
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