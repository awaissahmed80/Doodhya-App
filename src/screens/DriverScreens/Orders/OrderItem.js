import React from "react"
import { Tag, Box, HStack, Heading, Text, Pressable } from "native-base"
import { OrderStatus } from "../../Components"
import { moneyFormat } from "../../../helpers"
import dayjs from "dayjs"

export default function OrderItem({item, onPress, ...rest}){
    
    const total = item?.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)

    return(
        <Pressable onPress={onPress} _pressed={{ opacity: 0.5 }} bg="white"  my={1}>
            <Box  px={6} py={6}>
                <HStack alignItems="flex-start" space={3} justifyContent="flex-start">
                    <HStack flex={1} space={4}>
                        <Box  alignItems="flex-start">
                            <Tag size="sm" colorScheme="gray"  bg="gray.200">
                                {`#${item?.number}`}
                            </Tag>
                        </Box>
                        <Box>
                            <OrderStatus status={item?.status} />                    
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
                    <Text fontSize="sm" colorScheme="gray">{dayjs(item?.created_at).format('DD MMM YYYY hh:mm a')}</Text>
                </Box>
            </Box>
            
            
        </Pressable>
    )
}