import React from 'react'
import { Box, HStack, IconButton } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '../ui'
import { useApp } from '../hooks'

import Dashboard from '../screens/Home'
// import Orders from '../screens/CustomerScreens/Orders'
import Menu from '../screens/AdminScreens/Menu'
import Orders from '../screens/DriverScreens/Orders'
import Deliveries from '../screens/DriverScreens/Deliveries'
import DeliveryDetails from '../screens/DriverScreens/Deliveries/DeliveryDetails'
import Bills from '../screens/DriverScreens/Bills'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = ({ _, __, navigation }, logout) => {

    const { navigate } = navigation  
    

    return(
        <Box bg="white" py={3}  safeAreaBottom>
            <HStack alignItems="center"  justifyContent="space-between" px={4}>
                <IconButton colorScheme="surface" icon={<Icon name="home-sharp" />} onPress={() => navigate('Home')} />
                <IconButton colorScheme="surface" icon={<Icon name="calendar-sharp" />} onPress={() => navigate('Deliveries')} />
                <IconButton colorScheme="surface" icon={<Icon name="file-tray-full-sharp" />} onPress={() => navigate('Orders')} />                
                <IconButton colorScheme="surface" icon={<Icon name="person-sharp" />} onPress={() => navigate('Menu')} />                
            </HStack>            
        </Box>
    )
}
const DriverTabs = () => {

    const { logout } = useApp()  

    return(
        
        <Tab.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade"}} tabBar={(props) => Tabs(props, logout)}>
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Deliveries" component={Deliveries} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Menu" component={Menu} />
        </Tab.Navigator> 
    )
}

export const DriverRoutes = () => {
    return(
        <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>
            <Stack.Screen name="Home" component={DriverTabs} />   
            <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />            
            <Stack.Screen name="Bills" component={Bills} />            
        </Stack.Navigator>
    )
    
}

