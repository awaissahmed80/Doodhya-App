import React, { useState } from "react"
import { Box, StatusBar, VStack, FormControl, Input, Button, Image, ScrollView, 
    KeyboardAvoidingView, useColorModeValue, HStack
} from 'native-base'
import { useNavigation } from "@react-navigation/native"
import { Icon, InputPassword } from '../../ui'
import { authApi } from "../../redux/api"
import { showToast } from "../../helpers"
import { assets } from "../../assets"

export default function Signup(){
        
    const inputRefs = {}    
    const { navigate } = useNavigation()
    const [register, { isLoading }] = authApi.useRegisterMutation();
    const [ errors, setErrors ] = useState(null)    
    const [ state, setState ] = useState({})

    const logo = useColorModeValue(assets.logo, assets.logo_dark)

    const handleSubmit = () => {        
        setErrors(null)
        register({...state}).unwrap()
            .then((res) => {                
            })
            .catch((error) => {                
                setErrors(error?.error|| null)                                        
                showToast.error(error?.message || error?.error || "Invalid Request")
                
            })
    }

    function focusInput(id) {
        inputRefs[id]?.focus()
    }
    
    console.log("Errors", errors)
    return(
        
        <Box flex={1} safeArea variant="wrapper">
            <StatusBar  />         
            <HStack px={4} py={3} justifyContent="flex-end">
                <Button size="sm" rightIcon={<Icon name="chevron-forward" />}  py={1} onPress={() => navigate('Main')} variant="outline">Skip</Button>
            </HStack>               
            <KeyboardAvoidingView flex={1} _ios={{ behavior: "padding" }}>
                <ScrollView flex={1} keyboardShouldPersistTaps="always">
                    <Box w="100%" maxW={340} flex={1} mx="auto">
                        <Box p={5} flex={2} justifyContent="center">
                            <Image mx="auto" source={logo} alt="Dwelling Doctors" w={180} h={120} resizeMode="contain" />
                        </Box>                    
                        <Box flex={2}  px={5} pb={5} alignItems="center">
                            <VStack w="100%" space={5}>
                                <HStack alignItems="flex-start" space={3}>
                                    <Box flex={1}>
                                        <FormControl  isInvalid={errors?.first_name}>                                                                            
                                            <Input 
                                                ref={input => {inputRefs.first_name = input}}
                                                returnKeyType="next"
                                                autoComplete="name-given"
                                                inputMode="text"
                                                h={12}                                                                                        
                                                autoCapitalize="none"
                                                variant="filled"                                                                         
                                                autoCorrect={false}                                                  
                                                value={state?.first_name || ''}
                                                onChangeText={(val) => setState({...state, first_name: val})}
                                                onSubmitEditing={() => focusInput('last_name')}
                                                placeholder="First Name"
                                                                                        
                                            />        
                                            <FormControl.ErrorMessage>{errors?.first_name?.message}</FormControl.ErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box flex={1}>
                                        <FormControl isInvalid={errors?.last_name}>                                
                                            <Input 
                                                ref={input => {inputRefs.last_name = input}}
                                                returnKeyType="next"
                                                autoComplete="family-name"
                                                inputMode="text"
                                                h={12}                                                
                                                autoCapitalize="none"
                                                variant="filled"                                                                         
                                                autoCorrect={false}                                                  
                                                value={state?.last_name || ''}
                                                onChangeText={(val) => setState({...state, last_name: val})}
                                                onSubmitEditing={() => focusInput('email_address')}
                                                placeholder="Last Name"
                                                                                        
                                            />       
                                            <FormControl.ErrorMessage>{errors?.last_name?.message}</FormControl.ErrorMessage>                     
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl  isInvalid={errors?.username}>                                
                                    <Input 
                                        ref={input => {inputRefs.email = input}}
                                        returnKeyType="next"
                                        autoComplete="email"
                                        inputMode="text"
                                        h={12}
                                        InputLeftElement={<Icon ml={3} size="md" name="person" type="ionicon" />}
                                        autoCapitalize="none"
                                        variant="filled"                                                                         
                                        autoCorrect={false}                                                  
                                        value={state?.username || ''}
                                        onChangeText={(val) => setState({...state, username: val})}
                                        onSubmitEditing={() => focusInput('password')}
                                        placeholder="Email address..."
                                                                                
                                    />     
                                    <FormControl.ErrorMessage>{errors?.username?.message}</FormControl.ErrorMessage>                       
                                </FormControl>

                                <FormControl isInvalid={errors?.password}>                                    
                                    <InputPassword
                                        ref={input => {inputRefs.password = input}}
                                        placeholder="Password"                                                
                                        returnKeyType="next"                                            
                                        autoCapitalize="none"                                                
                                        autoCorrect={false}     
                                        variant="filled"
                                        InputLeftElement={<Icon ml={3} size="md" name="key" type="ionicon" />}                                           
                                        value={state?.password || ''}
                                        onChangeText={(val) => setState({...state, password: val})}
                                        onSubmitEditing={() => focusInput('confirm_password')}
                                    />
                                    <FormControl.ErrorMessage>{errors?.password?.message}</FormControl.ErrorMessage>                                    
                                </FormControl>

                                <FormControl isInvalid={errors?.confirm_password}>                                    
                                    <InputPassword
                                        ref={input => {inputRefs.confirm_password = input}}
                                        placeholder="Confirm Password"                                                
                                        returnKeyType="go"                                            
                                        autoCapitalize="none"                                                
                                        autoCorrect={false}     
                                        variant="filled"
                                        InputLeftElement={<Icon ml={3} size="md" name="key" type="ionicon" />}                                           
                                        value={state?.confirm_password || ''}
                                        onChangeText={(val) => setState({...state, confirm_password: val})}
                                        onSubmitEditing={handleSubmit}
                                    />
                                    
                                </FormControl>
        
                                <Button rounded="lg" leftIcon={<Icon name="lock-closed" type="ionicon" />} isLoading={isLoading} onPress={handleSubmit}>Create Account</Button>

                                <HStack alignItems="center" justifyContent="center"  my={0.5}>
                                    <Button size="sm" px={0}  onPress={() => navigate('Login')} variant="link">Already have an account?</Button>
                                </HStack>                                    
                            </VStack>
                        </Box>
                    </Box>                    
                </ScrollView>            
            </KeyboardAvoidingView>
        </Box>
    )
}

