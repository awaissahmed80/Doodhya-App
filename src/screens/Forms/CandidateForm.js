import React, { useState } from 'react'
import { ScrollView, Box, IconButton, StatusBar, KeyboardAvoidingView, Text, Button,
    FormControl, Input, HStack, Heading, Menu, InputGroup, InputLeftAddon, Pressable
} from 'native-base'
import { Icon } from '../../ui'
import { useNavigation } from '@react-navigation/native'
import { PhotoPicker } from '../Components'
import { candidateApi } from '../../redux/api'
import { showToast } from '../../helpers'

const typeTrigger = (triggerProps, value) => {
    return(
        <Pressable {...triggerProps}>
            <HStack alignItems="center" space={3}>
                <Text fontSize="sm">{value}</Text>
                <Icon name="arrow-down-2" />
            </HStack>
        </Pressable>
    )
}
export default function CandidateForm(){

    const { goBack } = useNavigation()
    const inputRefs = {}    
    const [ state, setState ] = useState({type: 'NA'})
    const [ createCandidate , { isLoading }] = candidateApi.useCreateCandidateMutation();        
    const [ errors, setErrors ] = useState(null)
    
    function focusInput(id) {
        inputRefs[id]?.focus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(null)
        let formData = {...state}

        formData ={
            ...formData,
            number: state?.type+'-'+state?.number
        }
        
        createCandidate(formData).unwrap()
            .then(({message}) => {                    
                showToast.success(message || "Record created successfully!")
                setState({type: 'NA'})
            })
            .catch((err) => {                                
                setErrors(err?.errors || [])
                showToast.error(err?.message || "Invalid Request")
            })
    }

    return(
        <Box safeArea flex={1} bg="white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />            
            <HStack px={5} py={3} alignItems="center">
                <Box w="20%">
                    <IconButton onPress={goBack} rounded="full" colorScheme="green" size="sm" alignSelf="flex-start" icon={<Icon size={5} name="arrow-left-2" />} />
                </Box>
                <Box flex={1}>
                    <Heading textAlign="center" size="sm">Page Title</Heading>
                </Box>
                <Box w="20%" />
            </HStack>
            <KeyboardAvoidingView flex={1} _ios={{ behavior: "padding" }}>
                <ScrollView flex={1} keyboardShouldPersistTaps="handled">                
                    <Box p={5}>
                        <HStack alignItems="flex-start" space={5} mb={3}>
                            <Box flex={1}>
                                <PhotoPicker value={state?.photo} onSelect={(photo ) => setState({...state, photo: photo})} title="Candidate Image" />
                            </Box>
                            <Box flex={1}>
                                <PhotoPicker value={state?.symbol} onSelect={(symbol) => setState({...state, symbol: symbol})} title="Select Symbol" />
                            </Box>
                        </HStack>                        
                        <FormControl mb={3} isInvalid={errors?.number}>
                            <FormControl.Label>Halqa #</FormControl.Label>
                                <InputGroup w="100%">
                                    <InputLeftAddon py={0}>
                                        <Menu p={0} placement="bottom left" trigger={(triggerProps) => typeTrigger(triggerProps, state?.type)}>
                                            <Menu.Item fontSize="sm" onPress={() => setState({...state, type: 'NA'})}>NA</Menu.Item>
                                            <Menu.Item fontSize="sm" onPress={() => setState({...state, type: 'PP'})}>PP</Menu.Item>
                                            <Menu.Item fontSize="sm" onPress={() => setState({...state, type: 'PS'})}>PS</Menu.Item>
                                            <Menu.Item fontSize="sm" onPress={() => setState({...state, type: 'PK'})}>PK</Menu.Item>
                                            <Menu.Item fontSize="sm" onPress={() => setState({...state, type: 'PB'})}>PB</Menu.Item>                                            
                                        </Menu>
                                    </InputLeftAddon>
                                    <Input
                                        flex={1}                                      
                                        ref={input => {inputRefs.number = input}}
                                        returnKeyType="next"
                                        autoComplete="off"
                                        inputMode="text"
                                        size="sm"
                                        autoCapitalize="none"
                                        variant="filled"                                            
                                        autoCorrect={false}                                                  
                                        value={state?.number || ''}
                                        onChangeText={(val) => setState({...state, number: val})}
                                        onSubmitEditing={() => focusInput('title')}
                                        placeholder=""
                                                                                
                                    /> 
                                </InputGroup>
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors?.title}>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input
                                flex={1}                                      
                                ref={input => {inputRefs.title = input}}
                                returnKeyType="next"
                                autoComplete="off"
                                inputMode="text"
                                size="sm"                                
                                autoCapitalize="none"
                                variant="filled"                                            
                                autoCorrect={false}                                                  
                                value={state?.title || ''}
                                onChangeText={(val) => setState({...state, title: val})}
                                onSubmitEditing={() => focusInput('city')}
                                placeholder=""                                                                        
                            /> 
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors?.city}>
                            <FormControl.Label>City</FormControl.Label>
                            <Input
                                flex={1}                                      
                                ref={input => {inputRefs.city = input}}
                                returnKeyType="next"
                                autoComplete="off"
                                inputMode="text"
                                size="sm"                                
                                autoCapitalize="none"
                                variant="filled"                                            
                                autoCorrect={false}                                                  
                                value={state?.city || ''}
                                onChangeText={(val) => setState({...state, city: val})}
                                onSubmitEditing={() => focusInput('name')}
                                placeholder=""                                                                        
                            /> 
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors?.name}>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                flex={1}                                      
                                ref={input => {inputRefs.name = input}}
                                returnKeyType="next"
                                autoComplete="off"
                                inputMode="text"
                                size="sm"                                
                                autoCapitalize="none"
                                variant="filled"                                            
                                autoCorrect={false}                                                  
                                value={state?.name || ''}
                                onChangeText={(val) => setState({...state, name: val})}
                                onSubmitEditing={() => focusInput('name_ur')}
                                placeholder=""                                                                        
                            /> 
                        </FormControl>

                        <FormControl mb={3} isInvalid={errors?.name}>
                            <FormControl.Label>Name (UR)</FormControl.Label>
                            <Input
                                flex={1}                                      
                                ref={input => {inputRefs.name_ur = input}}
                                returnKeyType="go"
                                autoComplete="off"
                                inputMode="text"
                                size="sm"                                
                                autoCapitalize="none"
                                variant="filled"                                            
                                autoCorrect={false}                                                  
                                value={state?.name_ur || ''}
                                onChangeText={(val) => setState({...state, name_ur: val})}
                                // onSubmitEditing={() => focusInput('symbol_name')}
                                onSubmitEditing={handleSubmit}
                                placeholder=""                                                                        
                            /> 
                        </FormControl>
                    </Box>                
                </ScrollView>
            </KeyboardAvoidingView>
            <Box p={2}>
                <Button isLoading={isLoading} colorScheme="red" rounded="lg" onPress={handleSubmit}>Create</Button>
            </Box>
        </Box>
    )
}