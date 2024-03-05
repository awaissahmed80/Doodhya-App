import React, { useState } from "react"
import { Box, StatusBar, HStack, Heading, useToken, Button, IconButton, Text, ScrollView, Pressable } from 'native-base'
import { Icon } from "../../ui"
import { useBasket } from "../../hooks"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { moneyFormat, toTitleCase } from "../../helpers"
import { basketActions } from "../../redux/slices"
import DateTimePicker from '@react-native-community/datetimepicker'
import { OrderType, AreaSelector, WeekdaysSelector, OrderShift } from '../Components'
import dayjs from "dayjs"

export default function DeliveryOptions(){
    
    const dispatch = useDispatch()
    var tomorrow = new Date(); tomorrow.setDate( tomorrow.getDate() + 1 );
    const { items, area, type, days, shift, start_date } = useBasket()
    const [ open, setOpen ] = useState(null)
    const { goBack, navigate } = useNavigation()   
    const [ state, setState ] = useState({type: type || 'One-Time', area: area || '', days: days || [], shift: shift || 'MORNING', start_date: start_date ? new Date(start_date) : tomorrow}) 

    const [primary] = useToken( 'colors', ['primary.500']);
    
    const total = items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)


    const getDays = () => {

        let all_days =  state?.days?.map((d) => dayjs().day(d).format('dd') ) || []
        if(state?.days?.length === 7){
            return ['All Days']
        }
        if(!state?.days?.includes("0") && !state?.days?.includes("6") && state?.days?.length === 5 ){
            return ['Weekdays']
        }
        if(state?.days?.includes("0") && state?.days?.includes("6") && state?.days?.length === 2 ){
            return ['Weekend']
        }

        return all_days
    }
    
    const isValid = () => {
        if(!state?.type){
            return false
        }

        if(!state?.area){
            return false
        }

        if(!state?.days?.length && state?.type !== 'One-Time'){
            return false
        }

        return true
    }

    const handleNext = async() => {
        // console.log("State", state)
        await dispatch(basketActions.setOptions({
            area: state?.area,
            type: state?.type,
            shift: state?.shift,
            days: state?.days || null,
            start_date: dayjs(state?.start_date || tomorrow).format('YYYY-MM-DD')
        }))
        navigate('Checkout')
    }
    return(
        <Box flex={1} safeArea variant="wrapper">
            <StatusBar />
            <HStack alignItems="center" py={4} px={5}>
                <HStack flex={1} alignItems="center" space={3}>
                    <IconButton onPress={goBack} rounded="full" icon={<Icon name="arrow-back" />} />
                    <Heading  size="sm">Delivery Options</Heading>
                </HStack>                
            </HStack>
            {
                (items?.length > 0) ?           
                <ScrollView flex={1} bg="gray.50">
                    <Box p={5}>
                        {
                            items?.map((item, i) =>
                            <HStack position="relative" alignItems="center" my={1} space={3}  key={i} w="100%"  px={5} bg="primary.50" rounded="lg" py={3}>
                                <Box flex={1}>
                                    <Text fontSize={16} fontWeight={600} color="primary.500">{item?.name}</Text>
                                    <Text fontSize={14} fontWeight={400}>{item?.quantity } {item?.unit} x {(item?.price)}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight={700}>{moneyFormat(item?.quantity * item?.price)}</Text>
                                </Box>
                                <Box position="absolute" right={-4} top={-2}>
                                    <IconButton onPress={() => { dispatch(basketActions.removeItem(item?.item_id)) }} colorScheme="red" rounded="full" size="sm" variant="solid" icon={<Icon name="close" />} />
                                </Box>
                            </HStack>
                            )
                        } 
                        <Box my={1} w="100%"  bg="white" borderWidth={1} borderColor="primary.500" rounded="lg">
                            <HStack  px={5} alignItems="center"  space={3}  py={3}>
                                <Box flex={1} >
                                    <Text fontWeight={700} color="primary.500">Total</Text>                            
                                </Box>
                                <Box>
                                    <Text fontWeight={800} color="primary.500">{moneyFormat(total, true)}</Text>
                                </Box>
                            </HStack>                      
                        </Box>

                        <Box my={1} mt={4} w="100%"  bg="white" borderWidth={1} borderColor="gray.300" rounded="lg">
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setOpen('type')} >
                                <HStack  px={3} alignItems="center"  space={3}  py={3}>
                                    <Box>
                                        <Text fontWeight={700} color="gray.700">Order Type:</Text>                            
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <Text color="primary.500" numberOfLines={1} fontWeight={500}>{state?.type}</Text>
                                    </Box>
                                    <Box>
                                        <Icon size={3} name="chevron-forward" />
                                    </Box>
                                </HStack>
                            </Pressable>
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setOpen('area')} >
                                <HStack  px={3} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="gray.300">
                                    <Box >
                                        <Text fontWeight={700} color="gray.700">Area:</Text>                            
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <Text noOfLines={1} fontWeight={500} color="primary.500">{state?.area?.name || 'Select...'} </Text>
                                    </Box>
                                    <Box>
                                        <Icon size={3} name="chevron-forward" />
                                    </Box>
                                </HStack>
                            </Pressable>
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setOpen('shift')} >
                                <HStack  px={3} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="gray.300">
                                    <Box >
                                        <Text fontWeight={700} color="gray.700">Time:</Text>                            
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <Text noOfLines={1} fontWeight={500} color="primary.500">{toTitleCase(state?.shift)} </Text>
                                    </Box>
                                    <Box>
                                        <Icon size={3} name="chevron-forward" />
                                    </Box>
                                </HStack>
                            </Pressable>
                            {
                            (state?.type !== 'One-Time') &&
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setOpen('days')} >
                                <HStack  px={3} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="gray.300">
                                    <Box >
                                        <Text fontWeight={700} color="gray.700">Days:</Text>                            
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <Text noOfLines={1} fontWeight={500} color="primary.500">{getDays()?.join(' - ') || "Select..."}</Text>
                                    </Box>
                                    <Box>
                                        <Icon size={3} name="chevron-forward" />
                                    </Box>
                                </HStack>
                            </Pressable>
                            }
                            <Pressable _pressed={{ opacity: 0.5 }} >
                                <HStack  px={3} alignItems="center"  space={3}  py={3} borderTopWidth={1} borderColor="gray.300">
                                    <Box >
                                        <Text fontWeight={700} color="gray.700">{`${state?.type === 'One-Time' ? 'Date:' : 'Start Date:'}`}</Text>
                                    </Box>
                                    <Box flex={1} alignItems="flex-end">
                                        <DateTimePicker                        
                                            value={state?.start_date || tomorrow}
                                            mode="date"    
                                            display="compact"                            
                                            size="sm"                                        
                                            locale="en-US"
                                            minimumDate={tomorrow}
                                            accentColor={primary}                                        
                                            onChange={(e, date) => {  setState({...state, start_date: date}) }}
                                        />
                                    </Box>                                
                                </HStack>
                            </Pressable>
                        </Box>
                        <Box py={2}  bg="gray.50">
                            <Button isDisabled={!isValid()} onPress={handleNext} rounded="lg">Next...</Button>
                        </Box>
                    </Box>
                </ScrollView>
                :
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Box boxSize="72px" mb={5} alignItems="center" justifyContent="center" rounded="full" bg="red.100">
                        <Icon size={7} color="red.500" name="warning" />
                    </Box>
                    <Text color="red.500">Not items found in basket.</Text>
                </Box>
            }
            
            <OrderType isOpen={open === 'type'} onChange={(val) => { setState({...state, type: val}); setOpen(null) }} onClose={() => setOpen(null)} />
            <OrderShift isOpen={open === 'shift'} onChange={(val) => { setState({...state, shift: val}); setOpen(null) }} onClose={() => setOpen(null)} />
            <AreaSelector isOpen={open === 'area'} onChange={(val) => { setState({...state, area: val}); setOpen(null) }} onClose={() => setOpen(null)} />
            <WeekdaysSelector value={state?.days || []} isOpen={open === 'days'} onChange={(val) => { setState({...state, days: val}); setOpen(null) }} onClose={() => setOpen(null)} />
        </Box>
    )
}