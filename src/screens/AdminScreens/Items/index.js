import React, { useState } from "react"
import { Box, ScrollView, StatusBar, Text, HStack, Pressable, Image, IconButton, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../../../ui"
import { itemApi } from "../../../redux/api"
import { useSelector } from "react-redux"
import { Loader } from "../../Components"
import Config from "react-native-config"
import { moneyFormat } from "../../../helpers"
import { NewItem } from "./NewItem"

export default function Items(){
    
    const { goBack } = useNavigation()
    const { isLoading }  = itemApi.useGetQuery()
    const [ editable, setEditable ] = useState(null)
    const [ isOpen, setOpen ] = useState(false)
    const { items } = useSelector(s => s?.items)

    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack alignItems="center" space={3} px={3} py={3}>
                <Box>
                    <IconButton size="sm" rounded="full" onPress={goBack} icon={<Icon name="arrow-back" />} />
                </Box>
                <Box flex={1}>
                    <Heading size="sm">Products</Heading>
                </Box>
                <Box>
                    <IconButton onPress={() => setOpen(true)} rounded="full" icon={<Icon name="add" />} />
                </Box>
            </HStack>
            <ScrollView flex={1} bg="gray.50">
                {
                    (isLoading) ?
                    <Box flex={1} alignItems="center" justifyContent="center">
                        <Loader />
                    </Box>
                    :
                    <Box>
                        {
                            items?.map((item, i) =>
                            <Pressable key={i} _pressed={{ opacity: 0.5 }} onPress={() => { setEditable(item); setOpen(true) }}>
                            <HStack  my={0} py={4} px={5} alignItems="center" space={5} borderBottomWidth={1} borderColor="gray.100" bg="white">
                                <Box>
                                    <Image boxSize="40px" source={{ uri: Config.STORAGE_PATH+item?.image }} alt={item?.name} resizeMode="contain" />
                                </Box>
                                <Box flex={1}>
                                    <Text fontSize={18}>{item?.name}</Text>
                                </Box>
                                <Box>
                                    <Text fontSize={14} color="primary.500">{moneyFormat(item?.price)} / {item?.unit}</Text>
                                </Box>
                            </HStack>
                            </Pressable>
                        )}
                    </Box>
                }
                                
                
            </ScrollView>
            <NewItem data={editable} isOpen={isOpen} onClose={() => { setOpen(false); setEditable(null) }} />
        </Box>
    )
}