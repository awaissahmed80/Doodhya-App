import React from "react"
import {HStack, Pressable, Box} from 'native-base'
import { Icon } from "../../ui"

import {  useSafeAreaInsets } from 'react-native-safe-area-context'

const TabItem = ({onPress, label, isActive, centered=false, avatar, icon, color, ...rest}) => {
    
    return(
        <Pressable onPress={onPress} py={3} px={3} _pressed={{ opacity: 0.6 }}>                    
            {
                centered ?
                <Box boxSize="48px" display="flex" alignItems="center" justifyContent="center" rounded="full" bg="accent.500">
                    <Icon size={6} color="white" name="add"  type="ionicon" />
                </Box>
                :
                <Icon mx="auto" name={isActive ? icon : icon+'-outline'}  size={6} color={isActive ? `${"accent.500"}` : `${color+".400"}`}  type="iconly" />
            }
            
        </Pressable>
    )
}

export default function TabBar({ state, navigation }){

    const { navigate } = navigation    
    const insets = useSafeAreaInsets();
    
    console.log("State", state?.index)
    return(
        <Box bg="white" py={1} pb={insets.bottom} shadow="footerLight">
            <HStack alignItems="center"  justifyContent="space-between" px={4}>
                <TabItem color="gray" onPress={() => navigate('Home')} icon="home" isActive={state?.index === 0} />
                <TabItem color="gray" onPress={() => navigate('Calendar')} icon="document" isActive={state?.index === 1} />
                <TabItem centered={true} color="gray" onPress={() => navigate('CandidateForm')} icon="plus" isActive={state?.index === 2} />
                <TabItem color="gray" onPress={() => navigate('Chat')} icon="chat" isActive={state?.index === 2} />                
                <TabItem color="gray" onPress={() => navigate('Profile')} icon="folder" isActive={state?.index === 3} />
            </HStack>            
        </Box>
    )
}