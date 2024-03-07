import React from "react"
import { Box, Actionsheet, ScrollView,
    Heading, HStack, Text, Button, IconButton
} from 'native-base'
import { useBasket, useAuth } from "../../hooks"
import { moneyFormat, showToast } from "../../helpers"
import { useDispatch } from "react-redux"
import { basketActions } from "../../redux/slices"
import { Icon } from "../../ui"
import { navigate } from "../../routes"

export const BasketSheet = ({ isOpen, onClose }) => {
      
    const { items } = useBasket()
    const dispatch = useDispatch()    
    const { auth: { user} } = useAuth()
    
    const total = items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)

    const handleNavigate = () => {
        onClose();
        showToast.info('Please login to place an order');
        navigate('Login')
    }
    return(
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content  p={0} pb={4}>            
                <HStack py={5} space={4} alignItems="center" w="full" px={5}>
                    <HStack flex={1} space={2}>
                        <Heading  size="sm">My Basket</Heading>                    
                        <Text fontSize={14} color="gray.500">[{moneyFormat(total)}]</Text>
                    </HStack>
                    <Box>
                        {
                            (total > 0) &&
                            <Button py={1} px={5} rounded="full" onPress={() => { dispatch(basketActions.clear()); onClose() }} variant="outline" size="sm">Clear</Button>
                        }
                        
                    </Box>
                </HStack>                
                <ScrollView w="full" keyboardShouldPersistTaps="always">
                    <Box px={5}>
                        {
                            (items?.length > 0) ?                        
                            <>
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
                            </> 
                            :
                            <Box p={2} px={4} rounded="lg" bg="blue.100" borderWith={1} borderColor="blue.300">
                                <Text color="blue.500">No items found in basket</Text>
                            </Box>
                        }
                    </Box>
                </ScrollView>    
                <Box w="full" px={5} py={2}>
                    {
                        (items?.length > 0) ?
                        <>
                            {user ?
                                <Button onPress={() => { onClose(); navigate('DeliveryOptions') }} rounded="full">{`Select Delivery Options... `}</Button>
                            :
                                <Button onPress={handleNavigate} rounded="full">{`Select Delivery Options... `}</Button>
                            }
                        </>
                        :
                        <Button onPress={() => onClose()} rounded="full">{`Continue... `}</Button>
                    }
                    
                </Box>         
                
            </Actionsheet.Content>            
        </Actionsheet>
    )
}