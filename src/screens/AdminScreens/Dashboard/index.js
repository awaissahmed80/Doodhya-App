import React from "react"
import { Box, Image, ScrollView, Button, StatusBar, useColorModeValue } from "native-base"
// import { useNavigation } from "@react-navigation/native"
// import { useApp, useBoolean } from "../../hooks"
import { assets } from "../../../assets"
import { useApp, useBoolean } from "../../../hooks"
// import { setAuthToken } from "../../helpers"

export default function Dashboard(){

    // const { logout } = useApp()
    // const { navigate } = useNavigation()
    const [ isLoading, setLoading ] = useBoolean(false)
    const logo = useColorModeValue(assets.logo, assets.logo_dark)
    const { logout } = useApp()
    // const [ isLoading, setLoading ] = useBoolean(false)

    

    const handleLogout = async() => {
        setLoading.on()    
        logout()
            .then(() => {
                setLoading.off()                
            })
            .catch(() => {
                setLoading.off()                
            });        
    }

    return(
        <Box safeArea flex={1} variant="wrapper">
            <StatusBar  />
            <Box alignItems="center" py={2}>
                <Image source={logo} alt="PTI Candidates List" w="130px" resizeMode="contain" h="36px" />
            </Box>
            <ScrollView flex={1}>

                                
                {/* <Button onPress={() => navigate('Login')}>Login</Button> */}
                <Button isLoading={isLoading} onPress={() => handleLogout()}>Logout</Button>
            </ScrollView>
            
        </Box>
    )
}