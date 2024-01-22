import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Box, StatusBar, ScrollView, HStack, VStack, Text, IconButton, Heading, Image, AspectRatio } from 'native-base'
import { Icon } from '../../ui'
// import Config from 'react-native-config'
import { assets } from '../../assets'

export default function Candidate(){

    const {params: {data}} = useRoute()
    const { goBack } = useNavigation()
    
    const base_url = 'http://localhost/pti-images/'

    return(
        <Box safeArea flex={1} bg="white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <HStack shadow="tabs" bg="white" px={2} py={3} space={3} alignItems="center">                
                <IconButton onPress={goBack} rounded="full" colorScheme="green" size="sm" alignSelf="flex-start" icon={<Icon size={5} name="arrow-left-2" />} />                
                <Heading size="sm">{data?.number} - {data?.name}</Heading>                
            </HStack>
            <ScrollView flex={1}>   
                
                <HStack px={5} py={5} space={5}>
                    <Box flex={1}>
                        <AspectRatio ratio={1} rounded="lg" bg="gray.200">
                            <Image alt="Candidate" rounded="lg" w="100%" h="100%" resizeMode="cover" source={{ uri: base_url+'candidates/'+data?.number+'.png' }} fallbackSource={assets.placeholder} />
                        </AspectRatio>
                    </Box>
                    <Box flex={1}>
                        <AspectRatio ratio={1}  rounded="lg" bg="gray.100">
                            <Box flex={1} p={10}>
                                <Image alt="Symbol"  rounded="lg" w="100%" h="100%" resizeMode="cover"  source={{ uri: base_url+'symbols/'+data?.number+'.png' }} fallbackSource={assets.placeholder} />
                            </Box>
                        </AspectRatio>
                    </Box>
                </HStack>
                <HStack px={5} py={4} alignItems="flex-start" borderBottomWidth={1} borderColor="gray.200">
                    <Box w="35%">
                        <Text fontSize="sm">Candidate:</Text>                        
                    </Box>
                    <Box flex={1}>
                        <VStack alignItems="flex-start" justifyContent="space-between">
                            <Text fontWeight={700} fontSize="md">{data?.candidate?.name}</Text>
                            <Text fontFamily="NotoSansArabic-Regular">{data?.candidate?.name_ur}</Text>
                        </VStack>
                    </Box>
                </HStack>  
                <HStack px={5} py={2} alignItems="center"  borderBottomWidth={1} borderColor="gray.200">
                    <Box w="35%">
                        <Text fontSize="sm">Symbol:</Text>                        
                    </Box>
                    <Box flex={1}>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text fontWeight={700} fontSize="md">{data?.symbol?.name}</Text>
                            <Text  lineHeight={28} fontFamily="NotoSansArabic-Regular">{data?.symbol?.name_ur}</Text>
                        </HStack>
                    </Box>
                </HStack>  
                <HStack px={5} py={2} alignItems="center"  borderBottomWidth={1} borderColor="gray.200">
                    <Box w="35%">
                        <Text fontSize="sm">Halqa #:</Text>                        
                    </Box>
                    <Box flex={1}>
                        <Text fontSize="sm">{data?.number}</Text>
                    </Box>
                </HStack>  
                <HStack px={5} py={2} alignItems="center"  borderBottomWidth={1} borderColor="gray.200">
                    <Box w="35%">
                        <Text fontSize="sm">Area:</Text>                        
                    </Box>
                    <Box flex={1}>
                        <Text fontSize="sm">{data?.name}</Text>
                    </Box>
                </HStack> 
                           
            </ScrollView>

            
        </Box>
    )
}