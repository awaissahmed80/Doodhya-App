import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: baseQuery('/items'),
    endpoints: (builder) => ({               
        get: builder.query({
            query: () => ({
              url: ``,
              method: "GET",          
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