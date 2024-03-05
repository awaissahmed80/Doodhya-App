import React, { useEffect } from "react"
import { Tag, Box, HStack, Heading, Text, StatusBar, IconButton, Menu, Pressable } from "native-base"
import { OrderStatus } from "../../Components"
import { moneyFormat } from "../../../helpers"
import { orderApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Icon } from "../../../ui"
import dayjs from "dayjs"
import { DriverSelector } from "../../Components"
import { useBoolean } from "../../../hooks"


const MenuTrigger = ({status, isUpdating, ...props}) => {
    if(isUpdating){
        return(            
            <OrderStatus  status={'Loading'} />                    
        )
    }else{
        return(
            <Pressable {...props}>
                <OrderStatus  icon="caret-down" status={status} />        
            </Pressable>
        )
    }
}

// const MenuTrigger = ({...props}) => {
//     return(
//         <IconButton rounded="full" icon={<Icon name="ellipsis-horizontal" />} {...props} />
//     )
// }

export default function OrderDetails({item, ...rest}){
    
    const { goBack } = useNavigation()
    const { id } = useRoute().params
    const [ isOpen, setOpen ] = useBoolean(false)
    const [ getOrder, { isLoading } ] = orderApi.endpoints.getDetails.useLazyQuery()    
    const [ updateStatus, { isLoading: isUpdating }] = orderApi.useUpdateStatusMutation()
    const [ updateDriver, { isLoading: isUpdatingDriver }] = orderApi.useUpdateDriverMutation()

    const { order } = useSelector(s => s?.orders)
    const total = order?.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)

    useEffect(() => {
        getOrder(id)
    }, [id, getOrder])

    const handleUpdateStatus = (new_status) => {
        if(new_status !== order?.status ){
            updateStatus({id: order?._id, formData: {status: new_status}})
        }
    }

    const handleUpdateDriver = (driver_id) => {
        if(driver_id !== order?.driver?._id ){
            updateDriver({id: order?._id, formData: {driver_id: driver_id}})
            setOpen.off()
        }else{
            setOpen.off()
        }
    }

    console.log(isLoading)
    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack py={4} px={4} space={4} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>                
                <Box flex={1}>
                    <Heading m={0} size="sm">{order?.number || `Order Details`}</Heading>
                </Box>                
            </HStack> 
            <Box  px={6} py={6} bg="gray.100">
                <HStack alignItems="flex-start" space={3} justifyContent="space-between">
                    
                    <Box  alignItems="flex-start">
                        <Tag size="sm" colorScheme="gray"  bg="gray.200">
                            {`#${order?.number}`}
                        </Tag>
                    </Box>
                    <Box>
                        <Menu shadow="tabs" placement="top right" trigger={(props) => MenuTrigger({...props, status: order?.status, isUpdating })}>                            
                            <Menu.Item onPress={() => handleUpdateStatus('PENDING')}>Pending</Menu.Item>
                            <Menu.Item onPress={() => handleUpdateStatus('APPROVED')}>Approved</Menu.Item>
                            <Menu.Item onPress={() => handleUpdateStatus('CANCELLED')}>Cancelled</Menu.Item>
                            <Menu.Item onPress={() => handleUpdateStatus('ON-HOLD')}>On Hold</Menu.Item>                      
                        </Menu>
                        
                    </Box>                    
                </HStack>
                <Box alignItems="flex-start">
                    <Heading mt={3} size="sm" color="gray.700">{order?.address?.first_name} {order?.address?.last_name}</Heading>
                    <Text fontSize="sm">{order?.address?.street_address}, {order?.address?.town}</Text>
                    <Text fontSize="sm">{order?.area?.name}</Text>
                    <Text fontSize="sm" colorScheme="gray">{dayjs(order?.created_at).format('DD MMM YYYY hh:mm a')}</Text>
                </Box>
                <HStack justifyContent="space-between">
                    <Text>Order Total</Text>
                    <Box>
                        <Text fontSize="md" color="primary.500" fontWeight="bold">{moneyFormat(total || 0, true)}</Text>
                    </Box>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text>Driver</Text>
                    <Box>
                        {
                            isUpdatingDriver ?
                            <Text fontSize="sm">Updating....</Text>
                            :
                            <Pressable onPress={setOpen.on}>                            
                                <Text fontSize="md" color="primary.500" fontWeight="bold">
                                    {
                                        (order?.driver) ?
                                        `${order?.driver?.user?.first_name} ${order?.driver?.user?.last_name}`
                                        :
                                        'Select...'
                                    }                                    
                                </Text>
                            </Pressable>
                        }
                        
                    </Box>
                </HStack>
                {
                    order?.items?.map((prod, i) =>
                    <HStack key={i}>
                        <HStack flex={1}>
                            <Text>{prod?.name}</Text>
                            <Text> x </Text>
                            <Text>{prod?.quantity} {prod.unit}</Text>
                        </HStack>
                        <Box>
                            <Text>{moneyFormat(prod.quantity * prod.price)}</Text>
                        </Box>
                    </HStack>
                    )
                }
            </Box>
            
            <DriverSelector isOpen={isOpen} onClose={setOpen.off} onChange={(driver) => handleUpdateDriver(driver?._id)} />
        </Box>
    )
}