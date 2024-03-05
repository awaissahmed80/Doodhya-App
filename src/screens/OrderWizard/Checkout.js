import React, { useState } from "react"
import { Box, StatusBar, HStack, IconButton, Heading, Button, Input, ScrollView, useToast, KeyboardAvoidingView, Text } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../../ui"
import { orderApi } from "../../redux/api"
import { basketActions } from "../../redux/slices"
import { useDispatch } from "react-redux"
import { useBasket, useApp } from "../../hooks"
import { moneyFormat } from "../../helpers"
import dayjs from "dayjs"
// import { useBasket } from "../../hooks"



export default function Checkout(){

    const { goBack, navigate } = useNavigation()  
    const { user } = useApp()  
    const dispatch = useDispatch()
    const toast = useToast()
    const [ state, setState ] = useState({first_name: '', last_name: '', phone_number: '', street_address: '', town: ''})
    const [ errors, setErrors ] = useState(null)
    const [ createOrder, { isLoading }] = orderApi.useCreateMutation()    
    
    const { items, area, type, days, shift, start_date} = useBasket()    
    const total = items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)


    const getDays = () => {

        let all_days =  days?.map((d) => dayjs().day(d).format('dd') ) || []
        if(days?.length === 7){
            return ['All Days']
        }
        if(!days?.includes("0") && !days?.includes("6") && days?.length === 5 ){
            return ['Weekdays']
        }
        if(days?.includes("0") && days?.includes("6") && days?.length === 2 ){
            return ['Weekend']
        }

        return all_days
    }

    const handlePlaceOrder = () => {
        setErrors(null)
        let form_data = {
            items,
            area_id: area?._id,
            type,
            days,
            shift, 
            start_date,
            user_id: user?._id,
            address:{
                ...state
            }
        }

        createOrder(form_data).unwrap()
            .then(async () => {                
                toast.show({                    
                    title: 'Order placed successfully!',
                    bg: "green.500",
                    minW: '90%',       
                    rounded: "full",             
                    shadow: "none",
                    _title: { px: 5},
                    placement: 'top',
                    isClosable: true,                                        
                })
                await dispatch(basketActions.clear())
                navigate('Dashboard')
            })
            .catch((err) => {
                // console.log("Err", err)
                // showToast.error(err?.message)   
                setErrors(err?.error || null)             
                toast.show({                    
                    title: err?.message,
                    bg: "red.500",
                    minW: '90%',       
                    rounded: "full",             
                    shadow: "none",
                    _title: { px: 5},
                    placement: 'top',
                    isClosable: true,                    
                    
                })
            })
    }

    return(
        <Box flex={1} variant="wrapper" safeArea>
            <StatusBar />
            <HStack alignItems="center" py={4} px={5}>
                <HStack flex={1} alignItems="center" space={3}>
                    <IconButton onPress={goBack} rounded="full" icon={<Icon name="arrow-back" />} />
                    <Heading  size="sm">Place Order</Heading>
                </HStack>                
            </HStack>
            <KeyboardAvoidingView flex={1} _ios={{ behavior: "padding" }}>
                <ScrollView flex={1} bg="gray.50">
                    <Box px={5} py={2}>
                        <Box my={1} w="100%"  bg="white" borderWidth={1} borderColor="primary.500" rounded="lg">
                            <HStack  px={5} alignItems="center"  space={3}  py={3}>
                                <Box flex={1} >
                                    <Text fontWeight={700} color="primary.500">Total</Text>                            
                                </Box>
                                <Box>
                                    <Text fontWeight={800} color="primary.500">{moneyFormat(total, true)} {type !== 'One-Time' && `/day`}</Text>
                                </Box>
                            </HStack>
                            <HStack  px={5} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="primary.500">
                                <Box flex={1} >
                                    <Text fontWeight={700} color="primary.500">Delivery Charges:</Text>                            
                                </Box>
                                <Box>
                                    <Text fontWeight={800} color="primary.500">FREE</Text>
                                </Box>
                            </HStack>  
                            {
                                (type !== 'One-Time') &&
                                
                                <HStack  px={5} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="primary.500">
                                    <Box >
                                        <Text fontWeight={700} color="primary.500">Days:</Text>                            
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <Text noOfLines={1} fontWeight={500} color="primary.500">{getDays()?.join(' - ') || "Select..."}</Text>
                                    </Box>                                        
                                </HStack>                                
                            }                    
                        </Box>

                        <Box my={1} mt={4} w="100%"  bg="white" borderWidth={1} borderColor="gray.300" rounded="lg">                            
                            <HStack>
                                <Box flex={1} borderRightWidth={1} borderColor="gray.300">
                                    <Text px={3} color="primary.600" variant="label" pt={2}>First Name</Text>
                                    <Input 
                                        m={0}                                        
                                        h={10}
                                        rounded="none"
                                        value={state?.first_name}
                                        onChangeText={(val) => setState({...state, first_name: val})}
                                        variant="unstyled"                                        
                                        placeholder="Enter First Name"
                                    />
                                    {
                                        (errors && errors['address.first_name']?.message) && 
                                        <Text px={3} fontSize={13} color="red.500">{errors['address.first_name']?.message}</Text>
                                    }
                                </Box>
                                <Box flex={1}>
                                    <Text px={3} color="primary.600" variant="label" pt={2}>Last Name</Text>
                                    <Input 
                                        m={0}
                                        // borderTopWidth={1}
                                        h={10}
                                        value={state?.last_name}
                                        onChangeText={(val) => setState({...state, last_name: val})}
                                        rounded="none"
                                        variant="unstyled"
                                        placeholder="Enter Last Name"
                                    />
                                    {
                                        (errors && errors['address.last_name']?.message) && 
                                        <Text px={3} fontSize={13} color="red.500">{errors['address.last_name']?.message}</Text>
                                    }
                                </Box>
                            </HStack>
                            <Box flex={1} borderTopWidth={1} borderColor="gray.300">
                                <Text px={3} color="primary.600" variant="label" pt={2}>Street Address</Text>
                                <Input 
                                    m={0}
                                    value={state?.street_address}
                                        onChangeText={(val) => setState({...state, street_address: val})}
                                    h={10}
                                    rounded="none"
                                    variant="unstyled"
                                    placeholder="Enter Email Address..."
                                />
                                {
                                    (errors && errors['address.street_address']?.message) && 
                                    <Text px={3} fontSize={13} color="red.500">{errors['address.street_address']?.message}</Text>
                                }
                            </Box>
                            <Box flex={1} borderTopWidth={1} borderColor="gray.300">
                                <Text px={3} color="primary.600" variant="label" pt={2}>Town</Text>
                                <Input 
                                    m={0}
                                    value={state?.town}
                                    onChangeText={(val) => setState({...state, town: val})}
                                    h={10}
                                    rounded="none"
                                    variant="unstyled"
                                    placeholder="Enter Town..."
                                />
                                {
                                    (errors && errors['address.town']?.message) && 
                                    <Text px={3} fontSize={13} color="red.500">{errors['address.town']?.message}</Text>
                                }
                            </Box>  
                            <Box flex={1} borderTopWidth={1} borderColor="gray.300">
                                <Text px={3} color="primary.600" variant="label" pt={2}>Phone Number</Text>
                                <Input 
                                    m={0}
                                    value={state?.phone_number}
                                    onChangeText={(val) => setState({...state, phone_number: val})}
                                    h={10}
                                    rounded="none"
                                    variant="unstyled"
                                    placeholder="Enter Phone Number..."
                                />
                                {
                                    (errors && errors['address.phone_number']?.message) && 
                                    <Text px={3} fontSize={13} color="red.500">{errors['address.phone_number']?.message}</Text>
                                }
                            </Box>                          
                        </Box>                       
                    </Box>
                </ScrollView>
                <Box p={5}>
                    <Button isLoading={isLoading} onPress={handlePlaceOrder} rounded="lg">Place Order</Button>
                </Box>
            </KeyboardAvoidingView>
        </Box>
    )
}