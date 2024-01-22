import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// const MainLayout = lazy(() => import('../layouts/MainLayout'))
import Dashboard from '../screens/Home'

import Splash from '../screens/Splash'
import Login from '../screens/Auth/Login'
import { useApp } from '../hooks'

const Stack = createNativeStackNavigator();


export default function Routes ()  {
    
    const app = useApp();    
    const [ isLoading, setLoading ] = useState(true)


    useEffect(() => {      
        SplashScreen.hide()
    }, [])

    useEffect(() => {
        if(app.loading){
            setLoading(true)
        }        
    }, [app.loading])

    useEffect(() => {
        if(isLoading){
            setTimeout(function(){            
                setLoading(false)
            }, 2000)
        }
    }, [isLoading])


    if(isLoading){
        return <Splash />
    }

    
    const { user, token } = app
    
    console.log("User Role", user)
    return(
        <NavigationContainer>
            {                
                (!user || !token) ?
                <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
                :
                <Stack.Navigator initialRouteName="Dashboard"  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>                
                    <Stack.Screen name="Dashboard" component={Dashboard} />                                
                </Stack.Navigator>                
                

            }
           
        </NavigationContainer>
    )
    
   

    // return (<></>)
}