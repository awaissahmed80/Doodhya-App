import React from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Box, useToken, Modal, Pressable } from "native-base"
import { useBoolean } from "../../hooks"

export const DatePopupPicker = ({value, onChange, children, ...rest}) => {

    const [primary] = useToken( 'colors', ['primary.500']);
    const [ isOpen, setOpen ] = useBoolean(false)
    return(
        <Box>   
            <Pressable _pressed={{ opacity: 0.5 }} onPress={setOpen.on}>
                {children}
            </Pressable>         
            <Modal
                isOpen={isOpen}
                onClose={setOpen.off}                
                // bg="white"                        
                p={0}            
                animationPreset="slide">
                    <Box variant="wrapper" p={3} rounded="lg">
                    <DateTimePicker                        
                        value={value || new Date()}
                        mode="date"    
                        display="inline"                            
                        size="sm"                                        
                        locale="en-US"
                        maximumDate={new Date()}
                        accentColor={primary}                                        
                        onChange={(e, date) => { onChange(date); setOpen.off() }}
                        {...rest}
                    />
                    </Box>
            </Modal>
        </Box>
    )
}