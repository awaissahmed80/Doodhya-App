import React from "react"
import { Box, Actionsheet, 
    Heading, Pressable, Text
} from 'native-base'
import { toTitleCase } from "../../helpers"

export const OrderShift = ({onChange, isOpen, onClose}) => {
  
    const shifts = ['MORNING', 'EVENING']
    
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Order</Heading>                    
                </Box>                
                <Box w="full">
                {
                    shifts?.map((shift, t) =>
                    <Pressable onPress={() => onChange(shift)}  _pressed={{ opacity: 0.5 }}  key={t} w="100%"  px={5} rounded="lg" py={3}>
                        <Box>
                            <Text fontSize={16} fontWeight={600} color="primary.500">{toTitleCase(shift)}</Text>                            
                        </Box>
                        
                    </Pressable>
                    )
                }   
                </Box>    
                             
                
            </Actionsheet.Content>            
        </Actionsheet>
    )
}