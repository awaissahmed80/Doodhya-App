import React, { useRef, useState } from 'react'
import { Box, View, Heading } from 'native-base'
import { ImageBackground } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useAuth } from '../../../hooks'
import { assets } from '../../../assets'

const slides = [
    {
        image: assets.slides[2],
        title: 'Fresh & Organic',        
    },
    {
        image: assets.slides[3],
        title: 'Farm Fresh',        
    },    
];

export const Slider = ({...rest}) => {

    const sliderRef = useRef();
    const [active, setActive ] = useState(0)
    const { auth: { user } } = useAuth()

    const  pageScroll = (e) => {
        setActive(e.nativeEvent.position)
    }

    // const paginate =() =>{
    //     return(
    //         <HStack alignItems="center"  space={2}>
    //             {
    //                 slides.map((_, c) =>
    //                     <Box w={active === c ? 7 : 2} h={2} rounded="full" bg={active === c ? "primary.500" : "rgba(255,255,255,0.5)"} key={c} />
    //                 )
    //             }
    //         </HStack>
    //     )                  
    // }

    console.log("User", user, active)
    return(
        <Box {...rest} overflow="hidden">
            <PagerView onPageSelected={pageScroll} style={styles.flex} ref={sliderRef}  initialPage={0}>
                {slides?.map((slide, s) => 
                <View key={s} flex={1} h="100%">
                    <ImageBackground source={slide?.image} resizeMode="cover" style={styles.background}>                                
                        <Box flex={1} h="100%">
                            <Box flex={1} pb={5}   px={2}  alignItems="flex-start" justifyContent="flex-end">
                                <Box bg="primary.500:alpha.80" px={5} py={2} rounded="full">
                                    <Heading size="sm" color="white" >{slide.title}</Heading>
                                </Box>
                                
                            </Box>
                        </Box>
                    </ImageBackground>
                </View>
                )}
            </PagerView>
        </Box>
    )

}

const styles = {
    flex: {
        flex: 1
    },
    background: {
        width: '100%', height: '100%'
    },
}