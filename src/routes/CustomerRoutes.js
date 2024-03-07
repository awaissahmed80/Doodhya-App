import React from 'react'
import { Box, HStack, IconButton } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '../ui'
import { useApp } from '../hooks'

import Main from '../screens/Main'
import Orders from '../screens/CustomerScreens/Orders'

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
                <IconButton colorScheme="surface" icon={<Icon name="person-sharp" />} onPress={() => logout()} />                
            </HStack>            
        </Box>
    )
}
export const CustomerTabs = () => {

    const { logout } = useApp()  

    return(
        <Tab.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade"}} tabBar={(props) => Tabs(props, logout)}>
            <Tab.Screen name="Home" component={Main} />
            <Tab.Screen name="Orders" component={Orders} />
        </Tab.Navigator> 
    )
}


export const CustomerRoutes = () => {
    return(
        <Stack.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>
            <Stack.Screen name="Main" component={CustomerTabs} />            
        </Stack.Navigator>
    )
    
}