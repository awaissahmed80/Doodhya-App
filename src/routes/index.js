import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CustomerRoutes } from './CustomerRoutes'
// const MainLayout = lazy(() => import('../layouts/MainLayout'))

import Dashboard from '../screens/Home'
import Splash from '../screens/Splash'
import Login from '../screens/Auth/Login'
import PlaceOrder from '../screens/CustomerScreens/PlaceOrder'
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
    
    return(
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>
            {                
                (!user || !token) &&             
                <Stack.Screen name="Login" component={Login} />            
            }{
                (user?.role === 'ADMIN' || user?.role === 'DRIVER') &&
                <Stack.Screen name="Dashboard" component={Dashboard} />
            }{
                (user?.role === 'CUSTOMER') &&  
                <>
                    <Stack.Screen name="Dashboard" component={CustomerRoutes} />
                    <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
                </>           
            }
            </Stack.Navigator> 
        </NavigationContainer>
    )
    
   

    // return (<></>)
}