import React, { useState } from "react"
import { Box, StatusBar, VStack, FormControl, Input, Button, Image, ScrollView, 
    KeyboardAvoidingView, useColorModeValue, HStack
} from 'native-base'
import { useNavigation } from "@react-navigation/native"
import { Icon, OTPInput, InputPassword } from '../../ui'
import { authApi } from "../../redux/api"
import { showToast } from "../../helpers"
import { assets } from "../../assets"

export default function ForgotPassword(){
        
    const inputRefs = {}    
    const { navigate } = useNavigation()
    const [ resetRequest, { isLoading }] = authApi.useResetRequestMutation();
    const [ verifyOtp, { isLoading: isVerifying }] = authApi.useVerifyOtpMutation();
    const [ updatePassword, { isLoading: isUpdating }] = authApi.useUpdatePasswrodMutation();
    const [ errors, setErrors ] = useState(null)    
    const [ state, setState ] = useState({otp: ''})
    const [ step, setStep ] = useState(0)

    const logo = useColorModeValue(assets.logo, assets.logo_dark)

    const handleSubmit = () => {        
        setErrors(null)
        resetRequest({...state}).unwrap()
            .then((res) => {                
                showToast.success(res?.message  || "Request submitted successfully!")
                setStep(1)
            })
            .catch((error) => {                
                setErrors(error?.errors?.errors || null)                        
                console.log("Error", error)
                showToast.error(error?.message || error?.error || "Invalid Request")
                
            })
    }

    const handleVerification = () => {
        setErrors(null)        
        verifyOtp({otp: state?.otp, email_address: state?.email_address}).unwrap()
            .then((res) => {
                setState({...state, id: res?.id})
                setStep(2) 
            })
            .catch((error) => showToast.error(error?.message || error?.error || "Invalid Request"))
    }

    const handleUpdatePassword = () => {
        setErrors(null)        
        updatePassword({otp: state?.otp, id: state?.id, password: state?.password, confirm_password: state?.confirm_password}).unwrap()
            .then((res) => {
                showToast.success(res?.message || 'Password Updated. Please login to continue')
                navigate('Login')
            })
            .catch((error) => {
                console.log(error)
                setErrors(error?.error|| null)
                showToast.error(error?.message || error?.error || "Invalid Request")
            })
    }

    function focusInput(id) {
        inputRefs[id]?.focus()
    }
    
    
    return(
        
        <Box flex={1} safeArea variant="wrapper">
            <StatusBar  />         
            <HStack px={4} py={3} justifyContent="space-between">
                <Button size="sm" leftIcon={<Icon name="chevron-back" />}  py={1} onPress={() => navigate('Login')} variant="ghost">Back</Button>                
            </HStack>               
            <KeyboardAvoidingView flex={1} _ios={{ behavior: "padding" }}>
                <ScrollView flex={1} keyboardShouldPersistTaps="always">
                    <Box w="100%" maxW={340} flex={1} mx="auto">
                        <Box p={10} flex={2} justifyContent="center">
                            <Image mx="auto" source={logo} alt="Dwelling Doctors" w={220} h={150} resizeMode="contain" />
                        </Box>                    
                        <Box flex={2}  px={5} pb={5} alignItems="center">

                            {
                                (step === 0) &&                            
                                <VStack w="100%" space={5}>
                                    <FormControl  isInvalid={errors?.email}>                                
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
                                            value={state?.email_address || ''}
                                            onChangeText={(val) => setState({...state, email_address: val})}
                                            onSubmitEditing={() => focusInput('password')}
                                            placeholder="Enter username/email address"                                                                                    
                                        />                            
                                    </FormControl>                                            
                                    <Button rounded="lg"  isLoading={isLoading} onPress={handleSubmit}>Submit</Button>                                    
                                </VStack>
                            }
                            {
                                (step === 1) &&
                                <Box>
                                    <OTPInput onChange={(otp) => setState({...state, otp})} />
                                    <Box my={10}>
                                        <Button isLoading={isVerifying} rounded="lg"  onPress={handleVerification}>Verify</Button>
                                    </Box>
                                </Box>

                            }

                            {
                                (step === 2) &&
                                <VStack w="full" space={5}>
                                    <FormControl isInvalid={errors?.password}>                                    
                                        <InputPassword
                                            ref={input => {inputRefs.password = input}}
                                            placeholder="New Password"                                                
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
                                            placeholder="Confirm New Password"                                                
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

                                    <Button rounded="lg" leftIcon={<Icon name="lock-closed" type="ionicon" />} isLoading={isUpdating} onPress={handleUpdatePassword}>Update Password</Button>
                                </VStack>

                            }
                        </Box>
                    </Box>                    
                </ScrollView>            
            </KeyboardAvoidingView>
        </Box>
    )
}

