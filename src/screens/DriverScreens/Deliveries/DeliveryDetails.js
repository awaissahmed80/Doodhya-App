import React, { useState, useEffect } from "react"
import { Box, HStack, Heading, Text, StatusBar, useToast, IconButton, Button, Tag, ScrollView, Menu} from "native-base"
import { moneyFormat } from "../../../helpers"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Icon } from "../../../ui"
import { DriverPopup } from "../../Components"
import { entryApi } from "../../../redux/api"


const MenuTrigger = ({...props}) => {
    return(
        <Button size="sm" variant="outline" rounded="lg" leftIcon={<Icon name="ellipsis-horizontal" />} {...props}>
            Options
        </Button>
    )
}

export default function DeliveryDetails({...rest}){
    
    const toast = useToast()
    const { goBack, navigate } = useNavigation()
    const { item } = useRoute().params    
    const [ items, setItems ] = useState([])
    const [ createEntry, { isLoading }] = entryApi.useCreateMutation()
    const total = item?.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)
    
    
    useEffect(() => {
        if(item?.items){
            
            let new_items = item?.items?.map((prod)  => 
                                ({
                                    _id: prod?._id,
                                    name: prod?.name,
                                    unit: prod?.unit,
                                    price: prod?.price,
                                    quantity: prod?.quantity || 1
                                })
                            )
            setItems(new_items)
        }
    }, [item])

    const handleSubmit = () => {

        let entry_items = items?.map((x) => ({item_id: x?._id, name: x?.name, price: x?.price, quantity: x?.quantity, unit: x?.unit}))
        let formData = {
            order_id: item?._id,
            driver_id: item?.driver?._id,
            items: entry_items,
            status: 'DELIVERED',
            total
        }
        
        createEntry({formData, id: item._id}).unwrap()
            .then((res) => {
                console.log("Res", res)
                toast.show({                    
                    title: 'Delivery added successfully!',
                    bg: "green.500",
                    minW: '90%',       
                    rounded: "full",             
                    shadow: "none",
                    _title: { px: 5},
                    placement: 'top',
                    isClosable: true,                                        
                })
                navigate('Deliveries')
            })
            .catch((err) => {
                console.log('Error', err)
            })
    }

   
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack py={4} px={4} space={4} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>                
                <Box flex={1}>
                    <Heading m={0} size="sm">{item?.code || `Order Details`}</Heading>
                </Box>   
                <Box>
                    <Menu shadow="tabs" placement="top right" trigger={MenuTrigger}>                        
                        <Menu.Item >History</Menu.Item>
                        <Menu.Item >Payments</Menu.Item>
                        <Menu.Item >Collect Payment</Menu.Item>                        
                    </Menu>
                </Box>             
            </HStack> 
            <ScrollView flex={1}>
                <Box>                
                <Box  px={6} py={4}>
                    <HStack alignItems="flex-start" space={3} justifyContent="flex-start">
                        <HStack flex={1} space={4}>
                            <Box  alignItems="flex-start">
                                <Tag size="sm" colorScheme="gray"  bg="gray.200">
                                    {`#${item?.number}`}
                                </Tag>
                            </Box>                        
                        </HStack>
                        <Box>
                            <Text fontSize="md" color="primary.500" fontWeight="bold">{moneyFormat(total || 0, true)}</Text>
                        </Box>
                    </HStack>
                    <Box alignItems="flex-start">                        
                        <Heading mt={3} size="sm" color="gray.700">{item?.address?.first_name} {item?.address?.last_name}</Heading>                                                    
                        <Text fontSize="sm">{item?.address?.street_address}, {item?.address?.town}</Text>
                        <Text fontSize="sm">{item?.area?.name}</Text>
                        {/* <Text fontSize="sm" colorScheme="gray">{dayjs(item?.created_at).format('DD MMM YYYY hh:mm a')}</Text> */}
                    </Box>
                </Box>                
                   
                <Box  bg="white" borderTopWidth={1} borderColor="gray.100">
                    <ScrollView horizontal   showsHorizontalScrollIndicator={false}>
                        <HStack  space={3} px={6} py={3}>                        
                            <Button onPress={() => navigate('Bills', { order: { id: item?._id, customer: item?.customer, number: item?.number, code: item?.code}})}  size="sm" variant="outline" colorScheme="orange" leftIcon={<Icon color="orange.500" name="wallet" />}>{moneyFormat(item?.customer?.balance || 0)}</Button>
                            <Button size="sm" variant="outline" colorScheme="blue" leftIcon={<Icon color="blue.500" name="time" />}>History</Button>                            
                            <DriverPopup id={item?.driver?._id}>
                                <Button size="sm" variant="outline" colorScheme="gray" leftIcon={<Icon color="gray.500" name="bicycle" />}>{`${item?.driver?.user?.first_name} ${item?.driver?.user?.last_name}` }</Button>                                                                    
                            </DriverPopup>
                        </HStack>
                    </ScrollView>
                </Box>
            </Box>
            
                <Box flex={1}  px={6} py={6} bg="gray.100">
                {
                    items?.map((prod, i) =>
                    <HStack key={i}>
                        <Box flex={1} alignItems="flex-start">
                            <HStack>
                                <Text>{prod?.name}</Text>
                                <Text> x </Text>
                                <Text>{prod?.quantity} {prod.unit}</Text>
                            </HStack>
                            {/* <QtyInput onChange={(val) => handleQuantity(val, i) } min={prod?.min || 0.5} step={0.5} max={prod?.max} my={2} vertical={true} suffix={prod?.unit} value={prod?.quantity} /> */}
                        </Box>
                        <Box>
                            <Text>{moneyFormat(prod.quantity * prod.price, true)}</Text>
                        </Box>
                    </HStack>
                    )
                }
                </Box>  
            </ScrollView>   
            <Box>
                <Button isDisabled={item?.entries?.length > 0} onPress={handleSubmit} isLoading={isLoading}>
                    { item?.entries?.length > 0 ? 'Delivered' : 'Confirm Delivery' }
                    
                </Button>
            </Box>                   
        </Box>
    )
}