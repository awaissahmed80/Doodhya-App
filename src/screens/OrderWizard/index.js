import React, { useState, useEffect } from "react"
import { Box, ScrollView, StatusBar, HStack,
    Heading, IconButton, Image, Text, Button
} from 'native-base'
import { useRoute, useNavigation } from "@react-navigation/native"
import { Icon, QtyInput } from "../../ui"
import { basketActions } from "../../redux/slices"
import { useBasket } from "../../hooks"
import { useApp } from "../../hooks"
import { useDispatch } from "react-redux"
import Config from "react-native-config"
import { moneyFormat } from "../../helpers"

export default function OrderWizard(){

    const item  = useRoute().params
    const dispatch = useDispatch()
    const { openBasket } = useApp()
    const [ state, setState ] = useState({})  
    
    const { navigate } = useNavigation()    
    const { items } = useBasket()

    useEffect(() => {
        if(item && items){                        
            let prev_item = items?.find(x => x?.item_id === item?._id)            
            setState( s => ({
                ...s,
                ...prev_item,
                // quantity: prev_item?.quantity || 0
            }))            
        }        
    }, [item, items])

    const addItem = (val) => {
        // console.log("Val", val)
        let value = parseFloat(val)
        if(value > 0){
            setState({
                ...state,
                name: item?.name,
                unit: item?.unit,
                item_id: item?._id,
                quantity: value,
                price: item.price,
            })

        }else{
            setState({})
        }                
    }

    const handleAddItem =  () => {      
        if(state?.item_id){  
            dispatch(basketActions.addItem(state))
            // dispatch(basketActions.clear())
            openBasket()
        }
    }    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack borderBottomWidth={1} borderColor="gray.100"  py={4} px={3} alignItems="center" justifyContent="space-between" space={2}>
                <Box w="20%" alignItems="flex-start">
                    <IconButton rounded="full" onPress={() => navigate('Main')} size="md" icon={<Icon name="arrow-back" />} />
                </Box>
                <Box flex={1} alignItems="center">
                    <Heading textAlign="center" size="sm">{item?.name}</Heading>
                </Box>
                <Box w="20%" />
            </HStack>
            <ScrollView flex={1} bg="gray.100" bounces={false}>
                <Box p={5} bg="white" flex={1} justifyContent="center">
                    <Image mx="auto" alt={item?.name} boxSize="180px" resizeMode="cover" source={{ uri: Config.STORAGE_PATH+item?.image }} />
                    <Box alignItems="center" my={5}>                        
                        <Text fontSize={18} fontWeight={600}>{moneyFormat(item?.price)}/{item?.unit}</Text>
                        <Box w={200} shadow={"card"} bg="white" mt={2} rounded="full">
                            <QtyInput min={item?.min || 0} max={item?.max || 1000} suffix={item?.unit} step={0.5} value={state?.quantity || 0} onChange={(val) => addItem(val)} />
                        </Box>
                    </Box>
                    <Box my={5} alignItems="center">
                        <Button  isDisabled={!state?.quantity || !state?.item_id} onPress={handleAddItem} rounded="full" w={200}>Add To Basket</Button>
                    </Box>
                </Box>
            </ScrollView>                   
        </Box>
    )
}