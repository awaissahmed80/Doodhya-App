import React from "react"
import { Tag, Box, HStack, Heading, Text, Pressable, Button } from "native-base"
import { moneyFormat } from "../../../helpers"
// import dayjs from "dayjs"
import { Icon } from "../../../ui"

export default function DeliveryItem({item, onPress, ...rest}){
    
    // const total = item?.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)

    return(
        <Box  my={1}>
            <Pressable onPress={onPress} _pressed={{ opacity: 0.5 }} bg="white">
                <>
                <Box  px={6} py={4}>
                    <HStack alignItems="flex-start" space={3} justifyContent="flex-start">
                        <HStack flex={1} space={4}>
                            <Box  alignItems="flex-start">
                                <Tag size="sm" colorScheme="gray"  bg="gray.200">
                                    {`#${item?.code}`}
                                </Tag>
                            </Box>                        
                        </HStack>
                        <Box>
                            <Text fontSize="md" color="primary.500" fontWeight="bold">{`${(item?.entries?.length > 0) ? 'Delivered' : 'Pending' }`}</Text>
                        </Box>
                    </HStack>
                    <Box alignItems="flex-start">
                        <Heading mt={3} size="sm" color="gray.700">{item?.address?.first_name} {item?.address?.last_name}</Heading>
                        <Text fontSize="sm">{item?.address?.street_address}, {item?.address?.town}</Text>
                        <Text fontSize="sm">{item?.area?.name}</Text>
                        {/* <Text fontSize="sm" colorScheme="gray">{dayjs(item?.created_at).format('DD MMM YYYY hh:mm a')}</Text> */}
                    </Box>
                </Box>                
                </>            
            </Pressable>
            <Box  px={6} py={3} bg="white" borderTopWidth={1} borderColor="gray.100">
                <HStack  space={3}>
                    
                    <Button  size="xs" variant="outline" colorScheme="orange" leftIcon={<Icon color="orange.500" name="wallet" />}>{moneyFormat(item?.customer?.balance || 0)}</Button>
                    <Button size="xs" variant="outline" colorScheme="blue" leftIcon={<Icon color="blue.500" name="time" />}>History</Button>
                    <Button size="xs" variant="outline" colorScheme="gray" leftIcon={<Icon color="gray.500" name="bicycle" />}>{`${item?.driver?.user?.first_name} ${item?.driver?.user?.last_name}` }</Button>                                        

                </HStack>
            </Box>
        </Box>
    )
}