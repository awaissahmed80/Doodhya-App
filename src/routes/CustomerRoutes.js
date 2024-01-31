import React from 'react'
import { Box, HStack, IconButton } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '../ui'

import Home from '../screens/CustomerScreens/Home'

const Tab = createBottomTabNavigator();

const Tabs = ({ state, descriptors, navigation }) => {

    const { navigate } = navigation    
    return(
        <Box bg="white" py={1} shadow="footerDark" safeAreaBottom>
            <HStack alignItems="center"  justifyContent="space-between" px={4}>
                <IconButton icon={<Icon name="home" />} onPress={() => navigate('Home')} />
                {/* <TabItem label="Explore" color="gray" onPress={() => navigate('MainDashboard')} icon="search" isActive={state?.index === 0} />                
                <TabItem label="Profile" color="gray" onPress={() => navigate('Profile')} icon="person-circle-outline" isActive={state?.index === 2} />                                 */}
            </HStack>            
        </Box>
    )
}
export const CustomerRoutes = () => {
    return(
        <Tab.Navigator  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade"}} tabBar={(props) => Tabs(props)}>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator> 
    )
}