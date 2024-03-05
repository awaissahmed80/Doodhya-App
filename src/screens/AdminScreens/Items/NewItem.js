import React, { useState, useEffect } from "react"
import { Box, ScrollView, StatusBar, Modal, Image, Button, Text, HStack, IconButton, KeyboardAvoidingView, Heading, Input, Pressable } from 'native-base'
import { Icon, NumberInput, ImagePicker } from "../../../ui"
import { itemApi } from "../../../redux/api"
import { UnitSelector } from "../../Components"
import { assets } from "../../../assets"
import Config from "react-native-config"

export const NewItem = ({data, isOpen, onClose }) => {

    const [ state, setState ] = useState({image: null})    
    const [ createItem, { isLoading }] = itemApi.useCreateMutation()
    const [ updateItem, { isLoading: isUpdating }] = itemApi.useUpdateMutation()
    const [ show, setShow ] = useState(false)
    
    useEffect(() => {
        if(data){
            setState({
                name: data?.name,
                description: data?.description,
                min: `${data?.min || 0}`,
                max: `${data?.max || 20}`,
                price: `${data?.price}`,
                unit: `${data?.unit}`,
                image: {
                    uri: `${data?.image ? Config.STORAGE_PATH+data.image : null}`
                }
            })
        }
    }, [data])


    const handleSubmit = (e) => {

        let formData = new FormData()        
        Object.keys(state).forEach((key) => {
            if(state[key]){
                if(key !== 'image'){
                    formData.append(key, state[key]);
                }
            }
        });  
        
        if(state?.image?.name){
            formData.append('image', state?.image)
        }
        let action = data?._id ? updateItem({formData, id: data?._id}) : createItem(formData)
        
        action.unwrap()
            .then((res) => {
                console.log("Res", res)
                handleClose()
            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    const handleClose = () => {
        setState(null)
        onClose()
    }
        
    return(
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            safeAreaTop={false}
            size="full"            
            bg="white"
            alignItems="stretch"                 
            p={0}            
            animationPreset="slide">
                <Box flex={1} variant="wrapper">
                    <StatusBar />
                    <HStack alignItems="center" space={3} py={3} px={3} bg="white">
                        <Box>
                            <IconButton size="sm" rounded="full" onPress={onClose} icon={<Icon name="arrow-back" />} />
                        </Box>
                        <Box flex={1}>
                            <Heading size="sm">{data?._id ? data?.name : 'New Product'}</Heading>
                        </Box>                    
                    </HStack>
                    
                    <Box flex={1}  variant="wrapper">                        
                        <KeyboardAvoidingView _ios={{ behavior: "padding" }} flex={1}>
                            <ScrollView flex={1} bg="gray.50">
                                <Box px={5}>                                    
                                    <Box my={1} mt={4} w="100%"  bg="white" borderWidth={1} borderColor="gray.300" rounded="lg">                                                                    
                                        <HStack alignItems="center" px={3}>
                                            
                                            <Box flex={2} py={4} alignItems="center">
                                                <ImagePicker onSelect={(img) => setState({...state, image: img})} title="Select Image">
                                                    <Image boxSize="96px" rounded="lg" source={{uri: state?.image?.uri}} fallbackSource={assets.placeholder} alt={state?.name || "Image"} />
                                                </ImagePicker>
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Title/Name</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    value={state?.name}
                                                    onChangeText={(val) => setState({...state, name: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="Enter Name"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text my={1}  color="primary.600" variant="label">Description</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}
                                                    rounded="none"
                                                    h={12}
                                                    value={state?.description}
                                                    
                                                    _input={{ 
                                                        textAlignVertical: "top"
                                                     }}
                                                    textAlignVertical="top"
                                                    justifyContent="flex-start"
                                                    maxLength={255}                                                    
                                                    onChangeText={(val) => setState({...state, description: val})}
                                                    variant="unstyled"    
                                                    
                                                    placeholder="Description"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Unit</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Pressable justifyContent="center" h={12}  px={3} _pressed={{ opacity: 0.5 }} onPress={() => setShow(true)}>
                                                    <Text>{state?.unit || 'Select...'}</Text>
                                                </Pressable>
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Price / Unit</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <NumberInput 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    value={state?.price}
                                                    min={0}
                                                    max={10000}
                                                    onChangeText={(val) => setState({...state, price: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="Price"
                                                />
                                            </Box>
                                        </HStack>

                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Min Qty</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <NumberInput 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    min={0}
                                                    max={10}
                                                    value={state?.min}
                                                    onChangeText={(val) => setState({...state, min: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="0"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Max Qty</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <NumberInput 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    min={1}
                                                    max={100}
                                                    value={state?.max}
                                                    onChangeText={(val) => setState({...state, max: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="0"
                                                />
                                            </Box>
                                        </HStack>                                                                  
                                    </Box>
                                </Box>
                            </ScrollView>       
                            <Box>
                                <Button isLoading={isLoading || isUpdating} onPress={handleSubmit}>Save</Button>
                            </Box>     
                        </KeyboardAvoidingView>
                    </Box>
                </Box>
                <UnitSelector onChange={(val) => { setState({...state, unit: val}); setShow(false) }} isOpen={show} onClose={() => setShow(false)}  />
            
            
        </Modal>
    )
}
