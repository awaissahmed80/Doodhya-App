import React from 'react'
import LottieView from 'lottie-react-native'
import { Box } from 'native-base'

export const Loader = () => {

    const style = {
        width: 100,
        height: 100
    }
    return(
        <Box boxSize="100px">
            <LottieView speed={1.5} style={style} source={require('../../assets/animations/loader.json')} autoPlay loop />
        </Box>
    )
}
