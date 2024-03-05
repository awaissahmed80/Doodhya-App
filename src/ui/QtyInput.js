import React from "react"
import { Box, HStack, IconButton, Input } from 'native-base'
import { Icon } from "."

export const QtyInput = ({vertical = false, value=0, onChange, min=0, max= 100, step=1, suffix=null, ...rest}) => {
        
    if(!vertical){
        return(
            <HStack alignItems="stretch" m={0} space={0}>
                <IconButton m={0} boxSize={12} rounded="full" variant="subtle" isDisabled={parseFloat(value) === min} onPress={() => onChange(parseFloat(value) > min ? parseFloat(value) - step : min)} icon={<Icon name="remove" type="ionicon" />} />
                <Box flex={1}>
                    <Box>
                        <Input   
                            bg="transparent"
                            size="md" 
                            h={12}  
                            rounded="full"  
                            textAlign="center"              
                            value={`${value} ${suffix}`}
                            variant="unstyled"
                            keyboardType="number-pad"
                            readOnly                                            
                        />
                    </Box>
                </Box>
                <IconButton m={0} boxSize={12} rounded="full" variant="subtle" isDisabled={parseFloat(value) === max} onPress={() => onChange(parseFloat(value) < max ? parseFloat(value) + step : max)} icon={<Icon name="add" type="ionicon" />} />
            </HStack>
        )
    }
    return(
        <HStack bg="white" {...rest}>
            <IconButton m={0} size="xs" boxSize={8}  variant="subtle" isDisabled={parseFloat(value) === min} onPress={() => onChange(parseFloat(value) > min ? parseFloat(value) - step : min)} icon={<Icon name="remove" type="ionicon" />} />
            <Box w="auto">
            <Input   
                bg="transparent"
                size="md" 
                h={8}  
                w="60px"
                rounded="full"  
                textAlign="center"              
                value={`${value}`}
                variant="unstyled"
                fontSize={14}
                keyboardType="number-pad"
                readOnly                                            
            />
            </Box>
            <IconButton m={0} size="xs" boxSize={8}  variant="subtle" isDisabled={parseFloat(value) === max} onPress={() => onChange(parseFloat(value) < max ? parseFloat(value) + step : max)} icon={<Icon name="add" type="ionicon" />} />
        </HStack>
    )
}