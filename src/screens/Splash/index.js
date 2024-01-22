import React from 'react'
import { Box, StatusBar, Image, useColorModeValue} from 'native-base'
import { assets } from '../../assets'




export default function Splash () {

    const logo = useColorModeValue(assets.logo, assets.logo_dark)
    

    return(
        <Box flex={1} variant="wrapper">
            <StatusBar animated backgroundColor="transparent" />            
            <Box flex={1}  justifyContent="center" alignItems="center"> 
                <Box flex={1} justifyContent="center">
                    <Image source={logo} alt="Dwelling Doctors" w={215} h={50} resizeMode="contain" />
                </Box>                
            </Box>
        </Box>
    )

}
