import React, { useState, useRef } from "react"
import { Box, ScrollView, StatusBar, HStack, Image, Button, IconButton, Heading, useToken, Text, FlatList, Pressable, Actionsheet, Spinner } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { itemApi, areaApi, orderApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import DateTimePicker from '@react-native-community/datetimepicker'
import Config from "react-native-config"
import { Icon, QtyInput } from "../../../ui"
import { DaySelector } from "./Components"
import { useBoolean, useApp } from "../../../hooks"
import { showToast } from "../../../helpers"

export default function PlaceOrder(){

    const daysRef = useRef(null)
    const { user } = useApp()
    const { goBack } = useNavigation()
    const [primary] = useToken( 'colors', ['primary.500']);
    const [ show, setShow ] = useBoolean(false)
    const { isLoading }  = itemApi.useGetQuery()
    const { isLoading: isGetting }  = areaApi.useGetQuery()
    const [ createOrder, { isLoading: isSubmitting }] = orderApi.useCreateMutation()    
    const [ state, setState ] = useState({days: [], items: [], type: 'REPEAT', shift: 'MORNING'})
    const { items } = useSelector(s => s?.items)
    const { areas } = useSelector(s => s?.areas)

    const addItem = (val, item) => {
        // console.log("Val", val)
        let all_items = [...state.items]
        let value = parseFloat(val)
        let index = all_items.findIndex(x => x?.item_id === item?._id)
        if(index > -1){
            if(value > 0){
                all_items[index].quantity = value
            }else{
                all_items.splice(index, 1)
            }

        }else{
            all_items.push({
                item_id: item?._id,
                quantity: value
            })
        }        
        setState({...state, items: all_items})
    }

    const getDetails = () => {
        let days = daysRef?.current?.getDays();
        let form_data = {
            items: state?.items || [],
            days: days,
            shift: state?.shift || 'MORNING',
            type: 'REPEAT',
            area_id: state?.area?._id,
            user_id: user?._id,
        }
        createOrder(form_data).unwrap()
            .then(() => {
                showToast.success("Order placed successfully!")
            })
            .catch((err) => {
                console.log("Err", err)
                showToast.error(err?.message)
            })
        
    }
    
    
    
    

    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <Box variant="wrapper" _light={{ shadow: "app-bar" }} _dark={{ shadow: "app-bar-dark" }} px={4} py={3}>
                <HStack  space={3}  justifyContent="space-between" alignItems="center">
                    <Box w="10%">
                        <IconButton alignSelf="flex-start" size="sm" rounded="full" variant="ghost" onPress={goBack} icon={<Icon name="arrow-back" type="ionicon" />} />
                    </Box>
                    <Box flex={1}>
                        <Heading size="sm">Place an Order</Heading>
                    </Box>
                    <Box w="20%" />
                </HStack>
            </Box>
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <Box>
                    {
                        isLoading && <Spinner />
                    }
                    <FlatList                    
                        p={5}
                        data={items}
                        horizontal                                                               
                        showsHorizontalScrollIndicator={false}               
                        // ItemSeparatorComponent={<Box w={2} />}
                        // eslint-disable-next-line react-native/no-inline-styles
                        contentContainerStyle={{paddingRight:20}} 

                        keyExtractor={(_, index) => index.toString()}
                        renderItem={( { item } ) => (
                            <Box mx={3} rounded="lg" shadow="card" _dark={{ bg: "gray.800" }} _light={{ bg: "white" }} w="160px">
                                <Box px={4} py={1}>
                                    <Text>{item?.name}</Text>
                                    <Text>{item?.price}/{item?.unit}</Text>
                                </Box>
                                <Box  mb={1}>
                                    <Image alt={item?.name} boxSize="160px" resizeMode="cover" source={{ uri: Config.STORAGE_PATH+item?.image }} />
                                </Box>
                                <Box rounded="md" borderWidth={0} borderColor="gray.200">
                                    <QtyInput min={item?.min || 0} max={item?.max || 1000} suffix={item?.unit} step={0.5} value={state?.items.find(x => x?.item_id === item?._id)?.quantity || 0} onChange={(val) => addItem(val, item)} />
                                </Box>
                            </Box>
                        )}
                    />            
                </Box>
                <HStack  px={8} py={1}>
                    <Box flex={1}>
                        <Text color="primary.500" fontWeight={800} fontSize="md">Select Days</Text>
                    </Box>
                </HStack>
                <Box  py={3}>
                    <DaySelector ref={daysRef} />                    
                </Box>

                <HStack  px={8} py={1}>
                    <Box flex={1}>
                        <Text color="primary.500" fontWeight={800} fontSize="md">Select Time</Text>
                    </Box>
                </HStack>
                <Box px={8} py={3}>
                    <HStack space={5}>
                        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setState({...state, shift: "MORNING"})} px={4} py={1} bg={state?.shift === "MORNING" ? "accent.600" : "gray.200"}  rounded="lg">
                            <Text color={state?.shift === 'MORNING' ? "white" : "gray.600"}>Morning</Text>
                        </Pressable>
                        <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setState({...state, shift: "EVENING"})} px={4} py={1} bg={state?.shift === "EVENING" ? "accent.600" : "gray.200"}  rounded="lg">
                            <Text color={state?.shift === 'EVENING' ? "white" : "gray.600"}>Evening</Text>
                        </Pressable>
                    </HStack>
                </Box>
                
                <HStack  px={8} py={1}>
                    <Box flex={1}>
                        <Text color="primary.500" fontWeight={800} fontSize="md">Start From</Text>
                    </Box>
                </HStack>

                <Box px={4} py={3}>
                    <Box alignSelf="flex-start">
                        {/* <Pressable onPress={setShowDate.on}>
                            <Text>{dayjs(state?.start_date || new Date()).format('DD MMM YYYY')}</Text>
                        </Pressable>
                        {
                            (showDate) && */}
                            <DateTimePicker                        
                                value={state?.start_date || new Date()}
                                mode="date"    
                                display="compact"                            
                                size="sm"
                                // themeVariant="dark"
                                locale="en-US"
                                
                                // textColor="red"
                                accentColor={primary}
                                // onChange={(e, date) => setState({...state, start_date: date})}
                                onChange={(e, date) => {  setState({...state, start_date: date}) }}
                            />
                        {/* } */}
                        
                    </Box>                                      
    
                        
                </Box>

                <HStack  px={8} py={1}>
                    <Box flex={1}>
                        <Text color="primary.500" fontWeight={800} fontSize="md">Area</Text>
                    </Box>
                </HStack>
                <Box px={5} py={3}>
                    <Box>
                        <Pressable py={2} px={3} bg="gray.200" rounded="lg" onPress={setShow.on} _pressed={{ opacity: 0.5 }}>
                            <Text>{state?.area?.name || "Select..."}</Text>
                        </Pressable>
                    </Box>
                </Box>

                <Box h={50} />


                

                
            </ScrollView>
            <Button isDisabled={!state?.items?.length || !state?.area } isLoading={isSubmitting} onPress={getDetails}>Test</Button>

            <Actionsheet isOpen={show} onClose={setShow.off}>
                <Actionsheet.Content  p={0}>
                    <ScrollView w="full">
                    {
                        isGetting &&
                        <Spinner />
                    }
                    {
                        areas?.map((item, i) =>
                        <Pressable _pressed={{ bg: "gray.200" }}   onPress={() => { setState({...state, area: item}); setShow.off() }} key={i} w="100%"  px={5} rounded="lg" py={3}>                            
                            <Text color="primary.500" fontWeight={700} fontSize={18}>{item?.name}</Text>
                            <Text fontSize={14}>{item?.description}</Text>                            
                        </Pressable>
                        )
                    }   
                    </ScrollView>                     
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}