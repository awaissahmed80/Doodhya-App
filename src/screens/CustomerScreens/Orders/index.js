import React from "react"
import { Box, Heading, Spinner, StatusBar, FlatList } from "native-base"
import { orderApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { CustomerOrderItem } from "../../Components"
import { RefreshControl } from "react-native"



export default function Orders(){
    
    const { isLoading, isFetching, refetch  } = orderApi.useGetQuery()    
    const { orders } = useSelector(s => s?.orders)    
    
    
    
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <Box alignItems="center" py={2}>
                <Heading size="sm">My Orders</Heading>
            </Box>
            {
                (isLoading) ?
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Spinner />
                </Box>
                :                
                <FlatList 
                    // flex={1}
                    // bg="gray.100"                    
                    refreshControl={<RefreshControl tintColor="red" refreshing={isFetching} onRefresh={refetch} />}
                    data={orders}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item}) => <CustomerOrderItem data={item} />}
                />                                           
            }
            
            
        </Box>
    )
}