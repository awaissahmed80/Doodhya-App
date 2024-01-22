import React from "react"

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../../screens/Home'


const Stack = createNativeStackNavigator();

export default function GeneralLayout (){


    console.log("Here Main Layout")
    return(       
        <Stack.Navigator initialRouteName="Dashboard"  screenOptions={{gestureEnabled : false, headerShown: false, animation: "fade_from_bottom"}}>                
            <Stack.Screen name="Dashboard" component={Dashboard} />                                
        </Stack.Navigator>                
    )
}