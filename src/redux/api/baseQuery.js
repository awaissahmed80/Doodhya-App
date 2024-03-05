import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// import { getAuthToken, setAuthToken } from '../../helpers'
import Config from 'react-native-config'
import { authActions } from '../slices'
import { Mutex } from 'async-mutex'
import { showToast } from '../../helpers'

// create a new mutex
const mutex = new Mutex()

export const baseQuery = (baseUrl) => {    
    
    return fetchBaseQuery({    
        baseUrl: Config.API_URL + baseUrl,
        prepareHeaders: (headers, { getState }) => {        
            const user = (getState()).auth       
            // console.log("User", user) 
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
        
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            // const app_token = await getAuthToken()
            try {

                api.dispatch(authActions.logout())
                // const refreshResult = await baseQuery({
                //     '/auth/refresh_token', api, extraOptions)
                // const refreshResult = await baseQuery('')(
                //     { url: '/auth/refresh_token/', method: 'POST', body: { refresh_token: app_token ?? '' } },
                //     { ...api, endpoint: 'refresh' },
                //     extraOptions
                // )
                // if (refreshResult.data) {
                //     await setAuthToken(refreshResult?.data?.refresh_token)
                //     api.dispatch(authActions.token_recieved(refreshResult.data))
                //     // retry the initial query
                //     result = await baseQuery(args, api, extraOptions)
                // } 
                // else {
                //     api.dispatch(authActions.logout())
                // }
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
    if(result.error && result.error.status !== 401) {
        showToast.error(result?.error?.message || "Invalid Request")
    }

    return result
}