import React from "react"
import { Box, Actionsheet, ScrollView, 
    Heading, Pressable, Text, HStack, Spinner
} from 'native-base'
import { driverApi } from "../../redux/api"
import { useSelector } from "react-redux"


export const DriverSelector = ({onChange, isOpen, onClose}) => {

    const { isLoading } = driverApi.useGetQuery()
    const { drivers } = useSelector(s => s?.drivers)    
    
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Driver</Heading>                    
                </Box>                
                <ScrollView w="full" keyboardShouldPersistTaps="always">
                {
                    isLoading && <Spinner />
                }
                {
                    drivers?.map((driver, d) =>
                    <Pressable onPress={() => onChange(driver)} _pressed={{ opacity: 0.5 }}  key={d} w="100%"  px={5} rounded="lg" py={2}>
                        <HStack>
                            <Box flex={1}>
                                <Text fontSize={16} fontWeight={600} color="primary.500">{driver?.user?.first_name} {driver?.user?.last_name}</Text>
                                <Text fontSize={14}>{driver?.vehicle_number} { driver?.area?.name}</Text>
                            </Box>
                        </HStack>
                        
                    </Pressable>
                    )
                }   
                </ScrollView>    
                             
                
            </Actionsheet.Content>            
        </Actionsheet>
    )
}