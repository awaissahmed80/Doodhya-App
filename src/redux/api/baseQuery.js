import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { getAuthToken, setAuthToken } from '../../helpers'
import Config from 'react-native-config'
import { authActions } from '../slices'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()

export const baseQuery = (baseUrl) => {    
    return fetchBaseQuery({    
        baseUrl: Config.API_URL + baseUrl,
        prepareHeaders: (headers, { getState }) => {        
            const user = (getState()).auth        
            headers.set('Accept', 'application/json')        
            if (user) {            
                headers.set('Authorization', `Bearer ${user.token}`)
            }
            return headers
        }        
    })  
}

export const baseAuthQuery = (baseUrl) => async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it    
    await mutex.waitForUnlock()
    let result = await baseQuery(baseUrl)(args, api, extraOptions)
    
    console.log("Result Auth Query", result)
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            const app_token = await getAuthToken()
            try {
                // const refreshResult = await baseQuery({
                //     '/auth/refresh_token', api, extraOptions)
                const refreshResult = await baseQuery('')(
                    { url: '/auth/refresh_token/', method: 'POST', body: { refresh_token: app_token ?? '' } },
                    { ...api, endpoint: 'refresh' },
                    extraOptions
                )
                if (refreshResult.data) {
                    await setAuthToken(refreshResult?.data?.refresh_token)
                    api.dispatch(authActions.token_recieved(refreshResult.data))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } 
                else {
                    api.dispatch(authActions.logout())
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        }
        else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }   
    }
    return result
}


// export const baseQuery = (baseUrl) =>  async (args, api, extraOptions) => {    
//     try {          
//         const result = await customBaseQuery(baseUrl)(args, api, extraOptions);
//         return result;
//     }catch (error) {        
//         console.error('Error occurred:', error);
//         throw error; // Rethrow the error or return a modified error
//     }
// };

// const customBaseQuery = (baseUrl) => {

//     console.log(Config.API_URL)
//     return fetchBaseQuery({    
//         baseUrl: Config.API_URL + baseUrl,
//         prepareHeaders: (headers, { getState }) => {        
//             const user = (getState()).auth        
//             headers.set('Accept', 'application/json')        
//             if (user) {            
//                 headers.set('Authorization', `Bearer ${user.token}`)
//             }
//             return headers
//         }        
//     })  
// }

// export const baseQueryWithReauth = async (args, api, extraOptions) => {
//     // wait until the mutex is available without locking it    
//     await mutex.waitForUnlock()
//     let result = await baseQuery(args, api, extraOptions)
    
//     if (result.error && result.error.status === 401) {
//         // checking whether the mutex is locked
//         if (!mutex.isLocked()) {
//             const release = await mutex.acquire()
//             try {
//                 // const refreshResult = await baseQuery({
//                 //     '/auth/refresh_token', api, extraOptions)
//                 const refreshResult = await customBaseQuery('/auth/refresh-token')(args, api, extraOptions);
//                 const refreshResult = await baseQuery(
//                     { url: '/auth/refresh_token/', method: 'POST', body: { refresh_token: localStorage.getItem('auth-flow_token') ?? '' } },
//                     { ...api, endpoint: 'refresh' },
//                     extraOptions
//                 )
//                 if (refreshResult.data) {
//                     api.dispatch(authActions.token_recieved(refreshResult.data))
//                     // retry the initial query
//                     result = await baseQuery(args, api, extraOptions)
//                 } 
//                 else {
//                     api.dispatch(authActions.logout())
//                 }
//             } finally {
//                 // release must be called once the mutex should be released again.
//                 release()
//             }
//         }
//         else {
//             // wait until the mutex is available without locking it
//             await mutex.waitForUnlock()
//             result = await baseQuery(args, api, extraOptions)
//         }   
//     }
//     return result
// }

// export const baseAuthQuery = (baseUrl) =>  async (args, api, extraOptions) => {    
//     try {          
//         const result = await customBaseQuery(baseUrl)(args, api, extraOptions);
//         return result;
//     }catch (error) {
//         if (error.status === 401) {
//             // Handle unauthorized errors (e.g., redirect to login)
//             console.error('Unauthorized request. Redirecting to login...');
//             // Example: You can redirect to the login page
//             // window.location.href = '/login'; // Replace '/login' with your login route        
//         }
  
//         // Handle other errors or transform the error
//         console.error('Error occurred:', error);
//         throw error; // Rethrow the error or return a modified error
//     }
// };

// export const baseQuery = (baseUrl) =>  async (args, api, extraOptions) => {    
//     try {          
//         const result = await customBaseQuery(baseUrl)(args, api, extraOptions);
//         return result;
//     }catch (error) {        
//         console.error('Error occurred:', error);
//         throw error; // Rethrow the error or return a modified error
//     }
// };
  