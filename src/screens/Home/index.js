import React from "react"
import { Box, Image, HStack, ScrollView, StatusBar, Badge,
    Text, useColorModeValue, Pressable
} from "native-base"
import { assets } from "../../assets"
import { itemApi } from "../../redux/api"
import { useSelector } from "react-redux"
import Config from "react-native-config"
import { useApp, useBasket } from "../../hooks"
import { moneyFormat } from "../../helpers"
import { Icon } from "../../ui"
import { GridItemSkeleton } from "../Components"
import { useNavigation } from "@react-navigation/native"

export default function Home(){

    const { navigate } = useNavigation()
    const { openBasket } = useApp()
    const { items: prods } = useBasket()
    const logo = useColorModeValue(assets.logo, assets.logo_dark)
    const { isLoading }  = itemApi.useGetQuery()
    const { items } = useSelector(s => s?.items)

    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack alignItems="center" py={4} px={5}>
                <Box flex={1}>
                    <Image source={logo} alt="Doodhya" w="150px" resizeMode="contain" h="36px" />
                </Box>
                <Pressable onPress={openBasket} boxSize="32px" _pressed={{ opacity: 0.5 }}>
                    <Icon size={5} name="bag-outline" />
                    <Badge position="absolute" boxSize="20px" p={0} colorScheme="primary" right={-3} top={-3}  rounded="full" variant="solid">
                        {prods?.length}
                    </Badge>
                </Pressable>
            </HStack>
            {
                (isLoading) ?
                <Box flex={1}  bg="gray.100">
                    {/* <Loader /> */}
                    <HStack flexWrap="wrap" space={0} borderTopWidth={1} borderColor="gray.200">
                        <GridItemSkeleton w="50%" borderBottomWidth={1} borderRightWidth={1} borderColor="gray.200" />
                        <GridItemSkeleton w="50%" borderBottomWidth={1} borderColor="gray.200" />
                        <GridItemSkeleton w="50%" borderBottomWidth={1} borderRightWidth={1} borderColor="gray.200" />
                        <GridItemSkeleton w="50%" borderBottomWidth={1} borderColor="gray.200" />
                    </HStack>
                </Box>
                :            
                <ScrollView flex={1} bg="gray.50">
                    {/* <Box p={5}>
                        <Heading>Products</Heading>
                    </Box> */}
                    <HStack flexWrap="wrap" space={0} borderTopWidth={1} borderColor="gray.200">
                        {
                            items?.map((item, i) =>
                            <Pressable _pressed={{ bg: 'primary.50' }} onPress={() => navigate('OrderWizard', item )} w="50%" bg="white" key={i} borderBottomWidth={1} borderRightWidth={i%2 === 0 ? 1 : 0}  borderColor="gray.200">
                                <Box flex={1} my={3}>
                                    <Image w="100%" h="100px" source={{ uri: Config.STORAGE_PATH+item?.image }} alt={item?.name} resizeMode="contain" />
                                </Box>
                                <Box alignItems="center" p={3}>
                                    <Text fontWeight={600} color="primary.500">{item?.name}</Text>
                                    <Text>{moneyFormat(item?.price)}/{item?.unit}</Text>
                                </Box>
                            </Pressable>
                            )
                        }
                    </HStack>
                                    
                    
                    
                </ScrollView>
            }
            
        </Box>
    )
}