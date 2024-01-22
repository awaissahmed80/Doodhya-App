import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const candidateApi = createApi({
    reducerPath: 'candidateApi',
    baseQuery: baseQuery('/data'),
    endpoints: (builder) => ({               
        getHalqas: builder.query({
            query: (type) => ({
              url: `/${type}.json`,
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