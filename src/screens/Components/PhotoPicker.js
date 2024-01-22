import React from "react"
import { Actionsheet, Box,  Heading, Image, AspectRatio, Text, Pressable } from "native-base"
import { useBoolean } from "../../hooks"
import ImagePicker from 'react-native-image-crop-picker'
import { Icon } from "../../ui"

export const PhotoPicker = ({value, onSelect, title}) => {

    const [ isOpen, setOpen ] = useBoolean(false)

    const onSelectImage = () => {               
        ImagePicker.openPicker({        
            cropping: true,
            multiple: false,
            compressImageMaxWidth: 600,
            compressImageMaxHeight: 600,
            includeBase64: true
        }).then(image => {
            // console.log(image);
            let imageData = {
                data: image.data,
                type: image.mime,                
                name: image?.filename || image.path.split(/[\\/]/).pop()
            }
            onSelect(imageData)
            setOpen.off()
        })
        .catch((error) => {
            console.log("Error", error)
            setOpen.off()
        });
    }

   
    
    
    return(
        <Box w="100%">
            {title && <Text fontSize="sm" fontWeight={600}>{title}</Text>}
            <AspectRatio ratio={1} bg="gray.200" rounded="lg">
                <Pressable flex={1} onPress={setOpen.on}  _pressed={{ opacity: 0.5 }}>
                    <Box flex={1}>
                    {
                        value ?
                        <Image rounded="lg" resizeMode="cover" flex={1} source={{ uri: value?.data ? `data:image/png;base64,${value?.data}` : null }} w="100%" h="100%" alt="image" />
                        :
                        <Box flex={1}  alignItems="center" justifyContent="center">
                            <Icon color="gray.500" size={8} name="image-2" />
                        </Box>
                    }
                    </Box>
                </Pressable>
            </AspectRatio>



            <Actionsheet isOpen={isOpen} onClose={() => setOpen.off()}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Heading textAlign="center" size="md" color="primary.500">{title}</Heading>
                    </Box>
                    <Actionsheet.Item onPress={onSelectImage} py={2.5}   rounded="md">Photo Library...</Actionsheet.Item>                
                    <Actionsheet.Item py={2.5} onPress={setOpen.off} _text={{ color: 'red.500' }}  rounded="md">Cancel</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}