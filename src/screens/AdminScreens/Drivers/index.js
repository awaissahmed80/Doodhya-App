import React, { useState } from "react"
import { Box, ScrollView, StatusBar, Text, HStack, Pressable, IconButton, Heading, Avatar } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../../../ui"
import { driverApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { Loader } from "../../Components"
import { getColor } from "../../../helpers"
import { DriverForm } from "./DriverForm"

export default function Drivers(){
    
    const { goBack } = useNavigation()
    const { isLoading }  = driverApi.useGetQuery()
    const [ editable, setEditable ] = useState(null)
    const [ isOpen, setOpen ] = useState(false)
    const { drivers } = useSelector(s => s?.drivers)
    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack alignItems="center" space={3} px={3} py={3}>
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>
                <Box flex={1}>
                    <Heading size="sm">Drivers</Heading>
                </Box>
                <Box>
                    <IconButton onPress={() => setOpen(true)} rounded="full" icon={<Icon name="add" />} />
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
                            drivers?.map((driver, d) =>
                            <Pressable key={d} _pressed={{ opacity: 0.5 }} onPress={() => { setEditable(driver); setOpen(true) }}>
                            <HStack  my={0} py={4} px={5} alignItems="flex-start" space={5} borderBottomWidth={1} borderColor="gray.100" bg="white">                                
                                <Avatar bg={getColor(driver?.number+"")}>
                                    {`#${driver?.number}`}
                                </Avatar>
                                <Box flex={1}>
                                    <Text fontSize={18}>{driver?.user?.first_name} {driver?.user?.last_name}</Text>
                                    <Text fontSize={14}>{driver?.area?.name} </Text>
                                    <Text fontSize={14}>{driver?.user?.phone} </Text>
                                </Box>
                                
                            </HStack>
                            </Pressable>
                        )}
                    </Box>
                }
                                
                
            </ScrollView>
            <DriverForm data={editable} isOpen={isOpen} onClose={() => { setOpen(false); setEditable(null) }} />
        </Box>
    )
}