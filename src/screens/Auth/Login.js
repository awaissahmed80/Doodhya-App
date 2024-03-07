import React, { useState } from "react"
import { Box, StatusBar, VStack, FormControl, Input, Button, Image, ScrollView, 
    KeyboardAvoidingView, useColorModeValue, HStack
} from 'native-base'
import { useNavigation } from "@react-navigation/native"
import { Icon, InputPassword } from '../../ui'
import { authApi } from "../../redux/api"
import { showToast } from "../../helpers"
import { assets } from "../../assets"

export default function Login(){
        
    const inputRefs = {}    
    const { navigate } = useNavigation()
    const [login, { isLoading }] = authApi.useLoginMutation();
    const [ errors, setErrors ] = useState(null)    
    const [ state, setState ] = useState({})

    const logo = useColorModeValue(assets.logo, assets.logo_dark)

    const handleSubmit = () => {        
        setErrors(null)
        login({...state}).unwrap()
            .then((res) => {                
            })
            .catch((error) => {                
                setErrors(error?.errors?.errors || null)                        
                console.log("Error", error)
                showToast.error(error?.message || error?.error || "Invalid Request")
                
            })
    }

    function focusInput(id) {
        inputRefs[id]?.focus()
    }
    
    return(
        
        <Box flex={1} safeArea variant="wrapper">
            <StatusBar  />         
            <HStack px={4} py={3} justifyContent="flex-end">
                <Button size="sm" rightIcon={<Icon name="chevron-forward" />}  py={1} onPress={() => navigate('Main')} variant="outline">Skip</Button>
            </HStack>               
            <KeyboardAvoidingView flex={1} _ios={{ behavior: "padding" }}>
                <ScrollView flex={1} keyboardShouldPersistTaps="always">
                    <Box w="100%" maxW={340} flex={1} mx="auto">
                        <Box p={10} flex={2} justifyContent="center">
                            <Image mx="auto" source={logo} alt="Dwelling Doctors" w={220} h={150} resizeMode="contain" />
                        </Box>                    
                        <Box flex={2}  px={5} pb={5} alignItems="center">
                            <VStack w="100%" space={5}>
                                <FormControl  isInvalid={errors?.email}>                                
                                    <Input 
                                        ref={input => {inputRefs.email = input}}
                                        returnKeyType="next"
                                        autoComplete="username"
                                        inputMode="text"
                                        h={12}
                                        InputLeftElement={<Icon ml={3} size="md" name="person" type="ionicon" />}
                                        autoCapitalize="none"
                                        variant="filled"                                                                         
                                        autoCorrect={false}                                                  
                                        value={state?.username || ''}
                                        onChangeText={(val) => setState({...state, username: val})}
                                        onSubmitEditing={() => focusInput('password')}
                                        placeholder="Enter username/email address"
                                                                                
                                    />                            
                                </FormControl>

                                    <FormControl isInvalid={errors?.password}>                                    
                                            <InputPassword
                                                ref={input => {inputRefs.password = input}}
                                                placeholder="Password"                                                
                                                returnKeyType="go"                                            
                                                autoCapitalize="none"                                                
                                                autoCorrect={false}     
                                                variant="filled"
                                                InputLeftElement={<Icon ml={3} size="md" name="key" type="ionicon" />}                                           
                                                value={state?.password || ''}
                                                onChangeText={(val) => setState({...state, password: val})}
                                                onSubmitEditing={handleSubmit}
                                            />
                                        {/* <FormControl.ErrorMessage>{errors?.password}</FormControl.ErrorMessage>                                     */}
                                    </FormControl>

                                    
        
                                    <Button rounded="lg" leftIcon={<Icon name="lock-open" type="ionicon" />} isLoading={isLoading} onPress={handleSubmit}>Login</Button>

                                    <HStack alignItems="center" justifyContent="space-between"  my={0.5}>
                                        <Button size="sm" px={0}  onPress={() => navigate('Signup')} variant="link">Create account</Button>
                                        <Button size="sm" px={0}  onPress={() => navigate('ForgotPassword')} variant="link">Forgot Password?</Button>
                                        
                                    </HStack>
                                    
                                </VStack>
                            </Box>
                        </Box>                    
                    </ScrollView>            
                </KeyboardAvoidingView>
            </Box>
    )
}

