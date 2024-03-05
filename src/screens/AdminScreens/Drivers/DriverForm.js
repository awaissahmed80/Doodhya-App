import React, { useState, useEffect } from "react"
import { Box, ScrollView, StatusBar, Modal, Button, Text, HStack, IconButton, KeyboardAvoidingView, Heading, Input, Pressable } from 'native-base'
import { Icon, InputPassword } from "../../../ui"
import { driverApi } from "../../../redux/api"
import { AreaSelector } from "../../Components"
import { TextInputMask } from 'react-native-masked-text'

export const DriverForm = ({data, isOpen, onClose }) => {

    const [ state, setState ] = useState()    
    const [ errors, setErrors ] = useState(null)
    const [ createDriver, { isLoading }] = driverApi.useCreateMutation()
    const [ updateDriver, { isLoading: isUpdating }] = driverApi.useUpdateMutation()
    const [ show, setShow ] = useState(false)
        
    useEffect(() => {
        if(data){
            setState({
                first_name: data?.user?.first_name,
                last_name: data?.user?.last_name,
                email_address: data?.user?.email,
                username: data?.user?.username,
                phone_number: data?.user?.phone,
                area: data?.area,
                vehicle_number: data?.vehicle_number,                          
            })
        }else{
            setState(null)
        }
    }, [data])


    const handleSubmit = (e) => {


        const formData = {
            ...state,
            area_id: state?.area?._id,            
        }
                
        let action = data?._id ? updateDriver({formData, id: data?._id}) : createDriver(formData)
        
        action.unwrap()
            .then((res) => {
                console.log("Res", res)
                handleClose()
            })
            .catch((err) => {
                setErrors(err?.error || null)             
                console.log("Error", err)
            })
    }

    const handleClose = () => {
        setState(null)
        onClose()
    }

    console.log("State", state)
        
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
                            <Heading size="sm">{data?._id ? 'Update Driver' : 'Add New Driver'}</Heading>
                        </Box>                    
                    </HStack>
                    
                    <Box flex={1}  variant="wrapper">                        
                        <KeyboardAvoidingView _ios={{ behavior: "padding" }} flex={1}>
                            <ScrollView flex={1} bg="gray.50">
                                <Box px={5}>                        
                                    {
                                        (errors) && 
                                        <Box bg="red.100" p={5} rounded="lg">
                                            {/* <Text>{JSON.stringify(errors)}</Text> */}
                                            {
                                                Object.keys(errors).map((key) =>  
                                                    // console.log("Key", key);                                                
                                                    (errors[key]?.message) &&
                                                    <Text my={1} fontSize="sm" textTransform="capitalize" color="red.500">{errors[key]?.message}</Text>                                                    
                                                )
                                            }
                                        </Box>
                                    }            
                                    <Box my={1} mt={4} w="100%"  bg="white" borderWidth={1} borderColor="gray.300" rounded="lg">                                                                    
                                        
                                        <HStack alignItems="center" px={3}>
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">First Name</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    value={state?.first_name}
                                                    onChangeText={(val) => setState({...state, first_name: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="e.g. Ali"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3}  borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Last Name</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    value={state?.last_name}
                                                    onChangeText={(val) => setState({...state, last_name: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="e.g. Khan"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3}  borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Email</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    autoCorrect={false}
                                                    autoCapitalize="none"
                                                    autoComplete="email"
                                                    keyboardType="email-address"
                                                    value={state?.email_address}
                                                    onChangeText={(val) => setState({...state, email_address: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="e.g. john.smith@email.com"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text my={1}  color="primary.600" variant="label">Phone</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <TextInputMask
                                                    type="custom"
                                                    // ref={input => {inputRefs.phone = input}}
                                                    customTextInput={Input}
                                                    options={{mask: '9999-9999999'}}
                                                    value={state?.phone_number} 
                                                    onChangeText={(val) => setState({...state, phone_number: val})}
                                                    // onSubmitEditing={() => focusInput('cnic')}
                                                    customTextInputProps={{ 
                                                        m: 0,     
                                                        h: 12,                                                   
                                                        variant: "unstyled",
                                                        placeholder: 'Phone Number',
                                                        rounded: 'md',
                                                        autoComplete:"tel",
                                                        keyboardType:"phone-pad",
                                                        autoCapitalize:"none",
                                                        autoCorrect: false,                                            
                                                    }}
                                                />                                               
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3}  borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Vehicle #:</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Input 
                                                    m={0}                                        
                                                    h={12}
                                                    rounded="none"
                                                    value={state?.vehicle_number}
                                                    onChangeText={(val) => setState({...state, vehicle_number: val})}
                                                    variant="unstyled"                                        
                                                    placeholder="e.g. ABC 1234"
                                                />
                                            </Box>
                                        </HStack>
                                        <HStack alignItems="center" px={3} borderTopWidth={1} borderColor="gray.300">
                                            <Box flex={1}>
                                                <Text  color="primary.600" variant="label">Area</Text>
                                            </Box>
                                            <Box flex={2}>
                                                <Pressable justifyContent="center" h={12}  px={3} _pressed={{ opacity: 0.5 }} onPress={() => setShow(true)}>
                                                    <Text>{state?.area?.name || 'Select...'}</Text>
                                                </Pressable>
                                            </Box>
                                        </HStack>                                                                                                        
                                    </Box>
                                    {
                                        (!data?._id) &&
                                        <Box my={1} mt={4} w="100%"  bg="white" borderWidth={1} borderColor="gray.300" rounded="lg">                                                                    
                                        
                                            <HStack alignItems="center" px={3}>
                                                <Box flex={1}>
                                                    <Text  color="primary.600" variant="label">Username</Text>
                                                </Box>
                                                <Box flex={2}>
                                                    <Input 
                                                        m={0}                                        
                                                        h={12}
                                                        rounded="none"
                                                        autoCorrect={false}
                                                        autoCapitalize="none"
                                                        autoComplete="username"
                                                        keyboardType="default"
                                                        value={state?.username}
                                                        onChangeText={(val) => setState({...state, username: val})}
                                                        variant="unstyled"                                        
                                                        placeholder=""
                                                    />
                                                </Box>
                                            </HStack>
                                            <HStack alignItems="center" px={3}  borderTopWidth={1} borderColor="gray.300">
                                                <Box flex={1.5}>
                                                    <Text  color="primary.600" variant="label">Password</Text>
                                                </Box>
                                                <Box flex={2}>
                                                    <InputPassword 
                                                        m={0}                                        
                                                        h={12}
                                                        rounded="none"
                                                        autoCapitalize="none"
                                                        autoComplete=""
                                                        value={state?.password}
                                                        onChangeText={(val) => setState({...state, password: val})}
                                                        variant="unstyled"                                        
                                                        placeholder="********"
                                                    />
                                                </Box>
                                            </HStack>
                                            <HStack alignItems="center" px={3}  borderTopWidth={1} borderColor="gray.300">
                                                <Box flex={1.5}>
                                                    <Text  color="primary.600" variant="label">Confirm Password</Text>
                                                </Box>
                                                <Box flex={2}>
                                                    <InputPassword 
                                                        m={0}                                        
                                                        h={12}
                                                        rounded="none"
                                                        value={state?.confirm_password}
                                                        onChangeText={(val) => setState({...state, confirm_password: val})}
                                                        variant="unstyled"                                        
                                                        placeholder="********"
                                                    />
                                                </Box>
                                            </HStack>
                                        </Box>
                                    }
                                    
                                </Box>
                            </ScrollView>       
                            <Box>
                                <Button isLoading={isLoading || isUpdating} onPress={handleSubmit}>Save</Button>
                            </Box>     
                        </KeyboardAvoidingView>
                    </Box>
                </Box>
                <AreaSelector onChange={(val) => { setState({...state, area: val}); setShow(false) }} isOpen={show} onClose={() => setShow(false)}  />
            
            
        </Modal>
    )
}
