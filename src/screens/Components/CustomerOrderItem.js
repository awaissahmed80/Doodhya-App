import React from "react"
import { Box, HStack, Text } from "native-base"
import dayjs from "dayjs"
import { OrderStatus } from "."

export const CustomerOrderItem = ({data}) => {

    const order_total = () => {
       return  data?.items?.reduce((prev, curr) => prev + (curr?.price * curr?.quantity), 0)
    }

    return(
        <Box>
            <Box p={5} bg="gray.50" borderTopWidth={1} borderColor="gray.200">
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Text>{data?.number}</Text>
                        <Text fontSize="sm">{dayjs(data?.created_at).format('DD MMM YYYY hh:mm a')}</Text>
                    </Box>
                    <OrderStatus status={data?.status} />
                </HStack>
                <Box>
                    <Text>{data?.area?.name}</Text>
                    <Text>Total {order_total()}</Text>
                    <HStack space={1} mt={4}> 
                        {
                            data?.days?.map((d) =>
                            <Box key={d} rounded="full" alignItems="center" justifyContent="center" boxSize="32px" bg="primary.500">
                                <Text fontWeight={600} color="white" fontSize={11} key={d}>{dayjs().day(d).format('dd').toUpperCase()}</Text>
                            </Box>
                            )
                        }
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}