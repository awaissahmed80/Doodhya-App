import React from 'react'
import { Box, HStack, IconButton } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '../ui'
import { useApp } from '../hooks'

import Dashboard from '../screens/Home'
import Menu from '../screens/AdminScreens/Menu'
import Items from '../screens/AdminScreens/Items'
import Drivers from '../screens/AdminScreens/Drivers'
import Customers from '../screens/AdminScreens/Customers'
import Orders from '../screens/AdminScreens/Orders'
import OrderDetails from '../screens/AdminScreens/Orders/OrderDetails'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = ({ _, __, navigation }, logout) => {

    const { navigate } = navigation  
    

    return(
        <Box bg="white" py={3}  safeAreaBottom>
            <HStack alignItems="center"  justifyContent="space-between" px={4}>
                <IconButton colorScheme="surface" icon={<Icon name="home-sharp" />} onPress={() => navigate('Home')} />
                <IconButton colorScheme="surface" icon={<Icon name="calendar-sharp" />} onPress={() => navigate('History')} />
                <IconButton colorScheme="surface" icon={<Icon name="file-tray-full-sharp" />} onPress={() => navigate('Orders')} />                
                <IconButton colorScheme="surface" icon={<Icon name="person-sharp" />} onPress={() => navigate('Menu')} />                
            </HStack>            
        </Box>
    )
}
const AdminTabs = () => {

    const { logout } = useApp()  

    return(
        
        <Tab.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade"}} tabBar={(props) => Tabs(props, logout)}>
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Menu" component={Menu} />
            
        </Tab.Navigator> 
    )
}

export const AdminRoutes = () => {
    return(
        <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade"}}>
            <Stack.Screen name="Home" component={AdminTabs} />
            <Stack.Screen name="Items" component={Items} />
            <Stack.Screen name="Drivers" component={Drivers} />
            <Stack.Screen name="Customers" component={Customers} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
    )
    
}

