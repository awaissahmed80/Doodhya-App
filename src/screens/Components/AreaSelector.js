import React from "react"
import { Box, Actionsheet, ScrollView, 
    Heading, Pressable, Text, HStack, Spinner
} from 'native-base'
import { areaApi } from "../../redux/api"
import { useSelector } from "react-redux"


export const AreaSelector = ({onChange, isOpen, onClose}) => {

    const { isLoading } = areaApi.useGetQuery()
    const { areas } = useSelector(s => s?.areas)    
    
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Delivery Area</Heading>                    
                </Box>                
                <ScrollView w="full" keyboardShouldPersistTaps="always">
                {
                    isLoading && <Spinner />
                }
                {
                    areas?.map((area, a) =>
                    <Pressable onPress={() => onChange(area)} _pressed={{ opacity: 0.5 }}  key={a} w="100%"  px={5} rounded="lg" py={2}>
                        <HStack>
                            <Box flex={1}>
                                <Text fontSize={16} fontWeight={600} color="primary.500">{area?.name}</Text>
                                <Text fontSize={12}>{area?.description}</Text>
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