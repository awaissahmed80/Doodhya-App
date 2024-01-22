import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Box, StatusBar, ScrollView, HStack, Text, Pressable, IconButton, Heading, Spinner, Input } from 'native-base'
import { Icon } from '../../ui'
import { useSelector } from 'react-redux'
import { candidateApi } from '../../redux/api'

export default function Constituencies(){

    const {params: {type, title}} = useRoute()
    const { navigate, goBack } = useNavigation()
    const [ getData, { isFetching }] = candidateApi.endpoints.getHalqas.useLazyQuery()
    const [ keywords, setKeywords ] = useState(null)
    const { candidates } = useSelector(s => s?.candidates)

    useEffect(() => {
        if(type){
            getData(type).unwrap()
                .then(() => {})
                .catch((err) => 
                    console.log("Error", err)
                )
        }
    }, [type, getData])

    
    let filtered = candidates
    if(keywords){
        filtered = candidates.filter((x) => 
            x?.number?.toUpperCase()?.includes(keywords?.toUpperCase()) ||
            x?.name?.toUpperCase()?.includes(keywords?.toUpperCase()) ||
            x?.candidate?.name?.toUpperCase()?.includes(keywords?.toUpperCase()) ||
            x?.symbol?.name?.toUpperCase()?.includes(keywords?.toUpperCase())
        )
    }else{
        filtered = candidates
    }


    return(
        <Box safeArea flex={1} bg="white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Box shadow="tabs" bg="white">
                <HStack bg="white" px={2} py={3} space={3} alignItems="center">                
                    <IconButton onPress={goBack} rounded="full" colorScheme="green" size="sm" alignSelf="flex-start" icon={<Icon size={5} name="arrow-left-2" />} />                
                    <Heading size="sm">{title}</Heading>                
                </HStack>
                {
                (candidates?.length > 0) &&
                <Box borderTopWidth={1} borderColor="gray.200">
                    <Input 
                        onChangeText={(val) => setKeywords(val)} 
                        px={4} 
                        value={keywords || ""}
                        placeholder="Enter halqa #, area, name, symbol ..." 
                        variant="unstyled" 
                        {...keywords && {InputRightElement: <IconButton mr={2} colorScheme="red" onPress={() => setKeywords(null)} icon={<Icon  name="close-square" />} size="sm" rounded="full" /> }}
                        
                    />
                </Box>
                }            
            </Box>
            
            {
                isFetching ?
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Spinner color="green.500" />
                </Box>
                :   
                <>
                    {
                        (candidates?.length > 0) ?                    
                        <ScrollView flex={1}>                
                        {
                            filtered?.map((halqa, h) =>
                            <Pressable _pressed={{ opacity: 0.6 }} onPress={() => navigate('Candidate', { data: halqa})} px={5} py={3} borderBottomWidth={1} borderColor="gray.200">
                                <HStack  key={h} alignItems="center" space={5}>
                                    <Box w="20%">
                                        <Text fontWeight={700}>{halqa.number}</Text>
                                    </Box>
                                    <Box flex={1}>
                                        <Text>{halqa.name}</Text>
                                    </Box>
                                    <Box w="20%" alignItems="flex-end">
                                        <Icon color="gray.400" size={3} name="arrow-right-2" />
                                    </Box>
                                </HStack>
                            </Pressable>
                            )
                        }
                        </ScrollView> 
                        :
                        <Box flex={1} alignItems="center" justifyContent="center">
                            <Box p={5} textAlign="center">
                                <Icon mx="auto" my={3} name="time-square-outline" size={12} color="yellow.500" />
                                <Text fontSize="sm" textAlign="center">List will be updated soon.</Text>
                            </Box>
                        </Box>
                    }
                </>         
            }           
        </Box>
    )
}