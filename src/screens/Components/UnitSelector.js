import React from "react"
import { Box, Actionsheet, 
    Heading, Pressable, Text
} from 'native-base'


export const UnitSelector = ({onChange, isOpen, onClose}) => {
  
    const units = ['Ltr', 'Kg', 'Bottle', 'Dozen', 'Lbs', 'Oz', 'Pack']
    
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Unit</Heading>                    
                </Box>                
                <Box w="full">
                {
                    units?.map((unit, u) =>
                    <Pressable onPress={() => onChange(unit)}  _pressed={{ opacity: 0.5 }}  key={u} w="100%"  px={5} rounded="lg" py={3}>
                        <Box>
                            <Text fontSize={16} fontWeight={600} color="primary.500">{unit}</Text>                            
                        </Box>
                        
                    </Pressable>
                    )
                }   
                </Box>    
                             
                
            </Actionsheet.Content>            
        </Actionsheet>
    )
}