import React from "react"
import { Actionsheet, Box, Pressable, Heading } from "native-base"
import { toast, useBoolean } from "../hooks"
import RNImagePicker from 'react-native-image-crop-picker'


export const ImagePicker = ({label, onSelect, title, children, ...rest}) => {

    const [ isOpen, setOpen ] = useBoolean(false)
    // var filename = fullPath.split(/[\\\/]/).pop();


    const onSelectImage = () => {
        RNImagePicker.openPicker({        
            cropping: false
        }).then(image => {            
            onSelect({
                name: image?.filename || image?.path?.split(/[\\/]/).pop(),
                type: image?.mime,
                uri: image?.path,
                // size: image?.size
            })
            setOpen.off()
        });
    }

    const onCamera = () => {
        RNImagePicker.openCamera({        
            cropping: false
        }).then(image => {            
            onSelect({
                filename: image?.filename || image?.path?.split(/[\\/]/).pop(),
                mime: image?.mime,
                path: image?.path,
                size: image?.size
            })
            setOpen.off()
        })
        .catch((error) =>{
            toast.error(error?.message || "Camera not available")
        });
    }

    
    
    return(
        <Box>
            <Pressable onPress={setOpen.on} _pressed={{ opacity: 0.7 }}>
                {children}
            </Pressable>

            <Actionsheet isOpen={isOpen} onClose={setOpen.off}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Heading textAlign="left" size="sm" color="primary.500">{title}</Heading>
                    </Box>
                    <Actionsheet.Item onPress={onSelectImage} py={2.5} rounded="md">Photo Library...</Actionsheet.Item>
                    <Actionsheet.Item onPress={onCamera} py={2.5} rounded="md">Take Photo...</Actionsheet.Item>                    
                    <Actionsheet.Item py={2.5} onPress={setOpen.off} rounded="md">Cancel</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}