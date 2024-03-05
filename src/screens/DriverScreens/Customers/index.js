import React from "react"
import { Box, ScrollView, StatusBar, Text, HStack, Pressable, IconButton, Heading, Avatar } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../../../ui"
import { customerApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { Loader } from "../../Components"
import { getColor, getInitials } from "../../../helpers"


export default function Customers(){
    
    const { goBack } = useNavigation()
    const { isLoading }  = customerApi.useGetQuery()        
    const { customers } = useSelector(s => s?.customers)
    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack alignItems="center" space={3} px={3} py={3}>
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>
                <Box flex={1}>
                    <Heading size="sm">Customers</Heading>
                </Box>                
            </HStack>
            <ScrollView flex={1} bg="gray.50">
                {
                    (isLoading) ?
                    <Box flex={1} alignItems="center" justifyContent="center">
                        <Loader />
                    </Box>
                    :
                    <Box>
                        {
                            customers?.map((customer, c) =>
                            <Pressable key={c} _pressed={{ opacity: 0.5 }}>
                                <HStack  my={0} py={4} px={5} alignItems="flex-start" space={5} borderBottomWidth={1} borderColor="gray.100" bg="white">                                
                                    <Avatar bg={getColor(customer?.first_name+" "+ customer?.last_name)}>
                                        {getInitials(customer?.first_name+" "+ customer?.last_name)}
                                    </Avatar>
                                    <Box flex={1}>
                                        <Text fontSize={18}>{customer?.first_name} {customer?.last_name}</Text>
                                        
                                    </Box>
                                    
                                </HStack>
                            </Pressable>
                        )}
                    </Box>
                }
                                
                
            </ScrollView>            
        </Box>
    )
}