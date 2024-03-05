import React from "react"
import { Box, Actionsheet, 
    Heading, Pressable, Text
} from 'native-base'


export const OrderType = ({onChange, isOpen, onClose}) => {
  
    const types = ['One-Time', 'Weekly', 'Monthly']
    
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Order</Heading>                    
                </Box>                
                <Box w="full">
                {
                    types?.map((type, t) =>
                    <Pressable onPress={() => onChange(type)}  _pressed={{ opacity: 0.5 }}  key={t} w="100%"  px={5} rounded="lg" py={3}>
                        <Box>
                            <Text fontSize={16} fontWeight={600} color="primary.500">{type}</Text>                            
                        </Box>
                        
                    </Pressable>
                    )
                }   
                </Box>    
                             
                
            </Actionsheet.Content>            
        </Actionsheet>
    )
}