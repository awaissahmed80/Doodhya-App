import React from "react"
import { Box, HStack, Text } from "native-base"
import dayjs from "dayjs"
import { moneyFormat } from "../../../helpers"

export default function BillItem({item, ...rest}){

    const total = item?.items?.reduce((prev, curr) => prev + (curr?.quantity * curr?.price), 0)
    return(
        <Box my={1}>
            <HStack px={5} py={2} bg="white" justifyContent="space-between">
                <Text>{dayjs(item?.created_at).format('DD MMM YYYY')}</Text>
                <Text>{moneyFormat(total, true)}</Text>
            </HStack>
            <Box bg="white" px={5} py={2} borderTopWidth={1} borderColor="gray.200">
                {
                    item?.items?.map((prod, p) =>
                    <HStack key={p} justifyContent="space-between">
                        <Text>{prod?.name}</Text>
                        <Text>{prod?.price * prod?.quantity}</Text>
                    </HStack>
                    )
                }
            </Box>
        </Box>
    )
}