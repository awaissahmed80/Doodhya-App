import React from "react"
import { Box, Image, ScrollView, StatusBar, useColorModeValue, Text, Pressable } from "native-base"
import { assets } from "../../../assets"
import { useNavigation } from "@react-navigation/native"
import { useApp } from "../../../hooks"

export default function Menu(){

    const { navigate } = useNavigation()
    const logo = useColorModeValue(assets.logo, assets.logo_dark)
    const { logout } = useApp()

    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <Box alignItems="center" py={2}>
                <Image source={logo} alt="PTI Candidates List" w="130px" resizeMode="contain" h="36px" />
            </Box>
            <ScrollView flex={1} bg="gray.50">

                <Pressable p={5} onPress={() => navigate('Items')} _pressed={{ opacity: 0.5 }}>
                    <Text>Products</Text>
                </Pressable>

                <Pressable p={5} onPress={() => navigate('Customers')} _pressed={{ opacity: 0.5 }}>
                    <Text>Customers</Text>
                </Pressable>

                <Pressable p={5} onPress={() => navigate('Drivers')} _pressed={{ opacity: 0.5 }}>
                    <Text>Drivers</Text>
                </Pressable>

                <Pressable p={5} onPress={() => navigate('Orders')} _pressed={{ opacity: 0.5 }}>
                    <Text>All Orders</Text>
                </Pressable>

                <Pressable p={5} onPress={() => navigate('Deliveries')} _pressed={{ opacity: 0.5 }}>
                    <Text>Deliveries</Text>
                </Pressable>

                <Pressable p={5} onPress={() => logout()} _pressed={{ opacity: 0.5 }}>
                    <Text>Logout</Text>
                </Pressable>
            </ScrollView>
            
        </Box>
    )
}