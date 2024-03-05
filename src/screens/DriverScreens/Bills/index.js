import React, { useEffect} from "react"
import { Box, HStack, StatusBar, Heading, IconButton, ScrollView, Text, Button } from 'native-base'
import { Icon } from "../../../ui"
import { useNavigation, useRoute  } from "@react-navigation/native"
import { billApi, entryApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import BillItem from "./BillItem"
import { Loader } from "../../Components"


export default function Bills() {
    
    const { order } = useRoute().params
    const { goBack } = useNavigation()
    const [ getUnbilled, { isLoading }] = entryApi.useUnbilledMutation()
    const [ createBill, { isLoading: isCreating }] = billApi.useCreateMutation()
    const { unbilled } = useSelector(s => s?.entries)

    console.log("UnBilled", unbilled)

    console.log("Order", order)
    useEffect(() => {
        if(order?.id){
            getUnbilled(order?.id)
        }
    }, [order, getUnbilled])

    const handleCreateBill = () => {
        let total = 0;

        unbilled?.map((y) => {
            total += y.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)
        })

        let formData = {
            entries: unbilled?.map((x) => (x?._id)),
            order_id: order?.id,
            total       
        }

        createBill({formData}).unwrap()
            .then((res) => console.log('Res', res))
            .then((err) => console.log('Err', err))

    }

    return(
        <Box flex={1} safeArea variant="wrapper">
            <StatusBar />
            <HStack py={4} px={4} space={4} alignItems="center" borderBottomWidth={1} borderColor="gray.200">     
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>                
                <Box flex={1}>
                    <Heading m={0} size="sm">{`Bills & Payments`}</Heading>
                </Box>   
            </HStack>
            <HStack   space={4}  borderBottomWidth={1} borderColor="gray.200">
                <Box py={2} px={4}>
                    <Text>Unbilled</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text>Previous Bills</Text>
                </Box>
            </HStack>
            <ScrollView flex={1} bg="gray.100">
                {
                    (isLoading) ?
                    <Box flex={1} alignItems="center" justifyContent="center">
                        <Loader />
                    </Box>
                    :
                    <Box>
                        {
                            unbilled?.map((entry, e) => (
                                <BillItem key={e} item={entry} />
                            ))
                        }
                    </Box>


                }
                
            </ScrollView>
            <Box>
                <Button isLoading={isCreating} onPress={handleCreateBill}>Create Bill</Button>
            </Box>
        </Box>
    )
}