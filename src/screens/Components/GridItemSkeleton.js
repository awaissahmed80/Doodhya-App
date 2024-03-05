import React from "react"
import { Skeleton, VStack, Box } from "native-base"

export const GridItemSkeleton = ({...rest}) =>{
    return(
        <VStack {...rest}>
            <Box py={5} px={2}>
                <Skeleton mb={5} boxSize="75px" mx="auto" rounded="full" />
                <Skeleton.Text lines={2} alignItems="center" px={5} />
            </Box>
        </VStack>
    )
}