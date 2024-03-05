import React, { useState, useEffect, useCallback } from "react"
import { Box, Heading, Spinner, Menu, StatusBar, FlatList, Text, HStack, IconButton } from "native-base"
import { entryApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../../../ui"
import { toTitleCase } from "../../../helpers"
import { Pagination, DatePopupPicker } from "../../Components"
import dayjs from "dayjs"
import DeliveryItem from "./DeliveryItem"
const PAGE_SIZE = 10

const MenuTrigger = ({...props}) => {
    return(
        <IconButton rounded="full" icon={<Icon name="ellipsis-horizontal" />} {...props} />
    )
}

const NoData = () => (
    <Box flex={1} alignItems="center" justifyContent="center">
        <Text>No Orders Found</Text>
    </Box>
)
export default function Deliveries(){
    
    const { goBack, navigate } = useNavigation()
    
    const [ getOrders, { isLoading } ] = entryApi.useGetMutation()    
    const { orders, total } = useSelector(s => s?.entries)    
    const [ filter, setFilter ] = useState({})
    const [ page, setPage ] = useState(1)
    

    const fetchData = useCallback((pageNumber = 1, options= {}) => {           
        getOrders({filter: options, page: pageNumber})        
    }, [getOrders])

    useEffect(() => {
        fetchData(page, filter);            
    }, [fetchData, page, filter])


    const handlePagination = (new_page) => {                
        setPage(new_page)
        
    }
    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack py={4} px={4} space={4} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>                
                <Box flex={1}>
                    <Heading m={0} size="sm">{`${toTitleCase(filter?.status || '')} Deliveries`}</Heading>
                </Box>
                <Box>
                    <Menu shadow="tabs" placement="top right" trigger={MenuTrigger}>                        
                        <Menu.Item onPress={() => setFilter({...filter, status: 'PENDING'})}>Pending</Menu.Item>
                        <Menu.Item onPress={() => setFilter({...filter, status: 'DELIVERED'})}>Approved</Menu.Item>
                        <Menu.Item onPress={() => setFilter({...filter, status: 'CANCELLED'})}>Cancelled</Menu.Item>                        
                    </Menu>
                </Box>
            </HStack>   
            <Box borderBottomWidth={1} borderColor="gray.200">
                <HStack alignItems="center" space={0}>                    
                    <Box flex={1} alignItems="center">
                        <DatePopupPicker 
                            value={filter?.from || new Date()}
                            onChange={(date) => setFilter({...filter, from: date}) }
                            >  
                            <HStack alignItems="center" px={4} py={3} space={2}>
                                <Box>
                                    <Icon name="calendar" color="gray.400" />
                                </Box>                                                   
                                <Text fontSize="sm">{dayjs(filter?.from || new Date()).format('DD-MMM-YYYY')}</Text>                        
                            </HStack>       
                        </DatePopupPicker>
                    </Box>
                    <Box>
                        <Icon name="arrow-forward" size={3} />
                    </Box>
                    <Box flex={1} alignItems="center">
                        <DatePopupPicker 
                            value={filter?.to || new Date()}
                            onChange={(date) => setFilter({...filter, to: date}) }
                            >
                            <HStack alignItems="center" px={4} py={3} space={2}>
                                <Box>
                                    <Icon name="calendar" color="gray.400" />
                                </Box>                                                   
                                <Text fontSize="sm">{dayjs(filter?.to || new Date()).format('DD-MMM-YYYY')}</Text>                        
                            </HStack>       
                        </DatePopupPicker>
                    </Box>
                </HStack>
            </Box>                     
            <Box flex={1}>
            {
                (isLoading) ?
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Spinner />
                </Box>
                :                   
                <FlatList                     
                    bg="gray.100"     

                    // refreshControl={<RefreshControl tintColor="red" refreshing={isFetching} onRefresh={refetch} />}
                    data={orders}                    
                    keyExtractor={(_, index) => index.toString()}  
                    ListEmptyComponent={<NoData />}                      
                    renderItem={({item}) => (
                        <DeliveryItem onPress={() =>navigate('DeliveryDetails', { item })} item={item} />
                    )}
                />                                     
            }
            {                            
                (total > PAGE_SIZE) &&
                <Box px={4} py={4} alignItems="center" safeAreaBottom>
                    <Pagination current={page} pageSize={PAGE_SIZE} onChange={handlePagination} total={total} />
                </Box>                        
            } 
            </Box>
        </Box>
    )
}
