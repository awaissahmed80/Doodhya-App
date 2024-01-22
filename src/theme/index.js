import { extendTheme } from 'native-base';
import { text, heading, colors, button, shadows, box, input, icon_button, pressable, tag} from './styles'

export const theme = extendTheme({    
    fontConfig: {
        DMSans:{
            300: {
                normal: 'DMSans-Light',
                italic: 'DMSans-LightItalic'
            },            
            400: {
                normal: 'DMSans-Regular',
                italic: 'DMSans-Italic'
            },
            500: {
                normal: 'DMSans-Medium',
                italic: 'DMSans-MediumItalic'
            },
            600: {
                normal: 'DMSans-SemiBold',
                italic: 'DMSans-SemiBoldItalic'
            },
            700: {
                normal: 'DMSans-SemiBold',
                italic: 'DMSans-SemiBoldItalic'
            },
            800: {
                normal: 'DMSans-ExtraBold',
                italic: 'DMSans-ExtraBoldItalic'
            },
        }
    },
    colors: colors,
    shadows: shadows,
    fonts: {
        heading: 'DMSans',
        body: 'DMSans',        
    },    
    config:{
        useSystemColorMode: true,
        // initialColorMode: "light",
    },        
    components: {
        Box: box,
        Input: input,      
        Button: button,        
        Text: text,
        IconButton: icon_button,
        Heading: heading,
        Pressable: pressable,
        Tag: tag,
        ScrollView: {         
            flex: 1,   
            defaultProps:{                
                contentContainerStyle:{                    
                    flexGrow: 1,
                }
            }
        },
        SectionList:{
            defaultProps:{
                contentContainerStyle:{
                    flexGrow: 1
                }
            }
        },
        PopoverArrow: {
            baseStyle: () => ({
              _light: {
                bg: 'muted.50',
                borderColor: 'red.300',
              },
              _dark: {
                bg: 'muted.800',
                borderColor: 'red.700',
              },
            }),
            defaultProps: {
                style: {transform: [{ scale: 0.5 }, { rotate: '45deg'}, {translateY: -12}, { translateX: -15}] }
            }
        }
          
    }
})