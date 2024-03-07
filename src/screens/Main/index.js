import React from "react"
import { Box, Image, HStack, ScrollView, StatusBar, Badge,
    useColorModeValue, Pressable, IconButton, Text
} from "native-base"
import { assets } from "../../assets"
import { itemApi } from "../../redux/api"
import { useSelector } from "react-redux"
import Config from "react-native-config"
import { useApp, useAuth, useBasket } from "../../hooks"
// import { moneyFormat } from "../../helpers"
import { Icon } from "../../ui"
// import { GridItemSkeleton } from "../Components"
import { useNavigation } from "@react-navigation/native"
import { Slider } from "./Slider"

export default function Main(){

    const { navigate } = useNavigation()
    const { openBasket } = useApp()
    const { items: prods } = useBasket()
    const { auth : { user }} = useAuth()
    const logo = useColorModeValue(assets.logo, assets.logo_dark)
    const { isLoading }  = itemApi.useGetQuery()
    const { items } = useSelector(s => s?.items)

    console.log(user, isLoading)
    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <HStack alignItems="center" py={4} px={5} borderBottomWidth={1} borderColor="gray.200">
                <Box flex={1}>
                    <Image source={logo} alt="Doodhya" w="150px" resizeMode="contain" h="35px" />
                </Box>
                <HStack alignItems="center" space={4}>
                    <IconButton rounded="full" onPress={() => navigate('Login')} size="sm" icon={<Icon name="person" />} />
                    <Pressable onPress={openBasket} rounded="full" _pressed={{ opacity: 0.5 }}>
                        <Box>
                            <IconButton rounded="full" onPress={openBasket}  size="sm" icon={<Icon name="bag-outline" />} />                        
                            <Badge position="absolute" boxSize="18px" p={0} colorScheme="primary" right={-3} top={-3}  rounded="full" variant="solid">
                                <Text fontSize="10" color="white">{prods?.length}</Text>
                            </Badge>
                        </Box>
                    
                    
                    </Pressable>
                    {/* <Pressable onPress={openBasket} boxSize="32px" _pressed={{ opacity: 0.5 }}>
                        <Icon size={5} name="bag-outline" />
                        <Badge position="absolute" boxSize="20px" p={0} colorScheme="primary" right={-3} top={-3}  rounded="full" variant="solid">
                            {prods?.length}
                        </Badge>
                    </Pressable> */}
                </HStack>
            </HStack>
            <ScrollView flex={1} bg="gray.100">
                <Box px={4} py={3}>                                        
                    <Slider h="180px" rounded="xl" />
                </Box>
                <HStack px={3} flexWrap="wrap" space={0} justifyContent="space-between">
                    {
                        items?.map((item, i) =>
                        <Box key={i} p={1} w="50%">
                            <Pressable _pressed={{ opacity:0.5 }}  p={5} shadow="1" bg="white" rounded="lg" onPress={() => navigate('OrderWizard', item )} key={i}>
                                <Image mx="auto" boxSize="64px" source={{ uri: Config.STORAGE_PATH+item?.image }} />
                                <Text color="gray.400" textAlign="center" mt={4}>{item?.name}</Text>

                                <Text color="primary.500" fontWeight={600} textAlign="center" mt={0}>Rs. {item?.price}/{item.unit}</Text>
                            </Pressable>
                        </Box>
                    )}
                </HStack>
            </ScrollView>
            
            
        </Box>
    )
}