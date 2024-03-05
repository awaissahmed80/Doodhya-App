import React, { useState } from "react"
import { Box, Actionsheet, Button,
    Heading, Pressable, Text, HStack
} from 'native-base'
import { weekdays, addOrRemove } from '../../helpers'
import dayjs from "dayjs"
import { Icon } from "../../ui"


export const WeekdaysSelector = ({isOpen, value,  onChange,  onClose }) => {
      
    const [ selected, setSelected ] = useState(value || [])
    const days = weekdays()

    const numericalSort = (a, b) => {
        return parseInt(a, 10) - parseInt(b, 10);
      };

    const handleOnChange = () => {
        onChange(selected.sort(numericalSort))        
    }
    
    

    return(
        
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={0}>            
                <Box alignItems="flex-start" w="full" px={4} py={2}>
                    <Heading my={2} size="sm">Select Days</Heading>                    
                </Box>                
                <Box w="full">
                    {
                        days?.map((item, t) =>
                        <Pressable onPress={() => setSelected([...addOrRemove([...selected], dayjs(item).format('d'))])}   _pressed={{ opacity: 0.5 }}  key={t} w="100%"  px={5} rounded="lg" py={3}>
                            <HStack>
                            <Box flex={1}>
                                <Text fontSize={18} fontWeight={400} color="gray.500">{dayjs(item).format('dddd')}</Text>                                                        
                            </Box>      
                            <Box>
                                { 
                                    selected.includes(dayjs(item).format('d')) ? 
                                    <Icon size={7} name="checkmark-circle" color="primary.500" />
                                    :
                                    <Icon size={7} color="gray.300" name="ellipse-outline" />
                                }
                            </Box>  
                            </HStack>                
                        </Pressable>
                        )
                    }                      
                </Box>    
                <Button w="full" onPress={handleOnChange}>Done</Button>
                
            </Actionsheet.Content>            
        </Actionsheet>
        
    )
}