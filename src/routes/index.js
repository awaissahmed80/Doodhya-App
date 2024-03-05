import React, { useState, useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CustomerRoutes } from './CustomerRoutes'
import { AdminRoutes } from './AdminRoutes'
import { DriverRoutes } from './DriverRoutes'
// const MainLayout = lazy(() => import('../layouts/MainLayout'))

import Home from '../screens/Home'
// import Dashboard from '../screens/Dashboard'
import Splash from '../screens/Splash'
import Login from '../screens/Auth/Login'
import OrderWizard from '../screens/OrderWizard'
import DeliveryOptions from '../screens/OrderWizard/DeliveryOptions'
// import PlaceOrder from '../screens/CustomerScreens/PlaceOrder'
import Checkout from '../screens/OrderWizard/Checkout'
import { useApp } from '../hooks'

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
}
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
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>
                {                
                    (!user || !token) &&       
                    <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />            
                    </> 
                }{
                    (user?.role === 'ADMIN') &&
                    <Stack.Screen name="Dashboard" component={AdminRoutes} />                        

                }{
                    (user?.role === 'DRIVER') &&
                    <Stack.Screen name="Dashboard" component={DriverRoutes} />                        

                }
                {
                    (user?.role === 'CUSTOMER') &&  
                    <Stack.Screen name="Dashboard" component={CustomerRoutes} />
                }
                
                <Stack.Screen name="OrderWizard" component={OrderWizard} />
                <Stack.Screen name="DeliveryOptions" component={DeliveryOptions} />
                <Stack.Screen name="Checkout" component={Checkout} />
            </Stack.Navigator> 
        </NavigationContainer>
    )
    
   

    // return (<></>)
}