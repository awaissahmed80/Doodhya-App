import React from "react"
import { Box, ScrollView, StatusBar, HStack, IconButton, Heading, Text } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { itemApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { weekdays } from "../../../helpers"
// import { useApp, useBoolean } from "../../hooks"

import { Icon } from "../../../ui"
// import { setAuthToken } from "../../helpers"

export default function PlaceOrder(){

    
    const { goBack } = useNavigation()
    const { isLoading }  = itemApi.useGetQuery()
    const { items } = useSelector(s => s?.items)

    // const { logout } = useApp()
    // const [ isLoading, setLoading ] = useBoolean(false)

    console.log("items", items, isLoading)
    console.log("Weekdays", weekdays())
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <Box variant="wrapper" _light={{ shadow: "app-bar" }} _dark={{ shadow: "app-bar-dark" }} px={4} py={3}>
                <HStack  space={3}  justifyContent="space-between" alignItems="center">
                    <Box w="10%">
                        <IconButton alignSelf="flex-start" size="sm" rounded="full" variant="ghost" onPress={goBack} icon={<Icon name="arrow-back" type="ionicon" />} />
                    </Box>
                    <Box flex={1}>
                        <Heading size="sm">Place an Order</Heading>
                    </Box>
                    <Box w="20%" />
                </HStack>
            </Box>
            <ScrollView flex={1}>
                
            </ScrollView>
            
        </Box>
    )
}