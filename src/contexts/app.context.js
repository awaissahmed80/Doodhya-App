import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks'
import { userApi } from '../redux/api'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/slices'


const initialState = {
    user: null,   
    loading: true,    
};

const AppContext = createContext({
    ...initialState,
    init: () => Promise.resolve(),
    login: () => Promise.resolve(),     
    logout: () => Promise.resolve(),
});



export const AppProvider = ({children}) => {
    
    const dispatch = useDispatch()
    const { auth } = useAuth()    
    const [ mount, setMount ] = useState(false)    
    const [reAuth ] = userApi.useReauthMutation();


    useEffect(() => {
        const loader =  async () => {     
            
            console.log("reauth")
            try{                            
                const data =  await reAuth().unwrap()                
                await dispatch(authActions.setUser(data))                                             
            }
            catch(err){
                console.log("Auth Error", err)
                // localStorage.removeItem(accessToken)
                dispatch(authActions.clear())            
                
            }
        }
        if(!mount){
            setMount(true)
            // loader()
            setTimeout(function() { loader() }, 1000);
        }
    }, [mount, reAuth, dispatch])

    // if(isLoading){
    //     return(
    //         <Box flex={1} display="flex" h="100vh" alignItems="center" justifyContent="center">
    //             <Indicator />
    //         </Box>
    //     )
    // }

    const logout = async() => {        
        return new Promise((resolve, reject) => {
            dispatch(authActions.clear())           
                .then(() => resolve())
                .catch(() => reject())
        })
        
    }

    console.log("Auth", auth)
    return (
        <AppContext.Provider
            value={{                
                ...auth,                                
                logout,
            }}>
            {children}
            
        </AppContext.Provider>
    );

}

export {AppContext}
