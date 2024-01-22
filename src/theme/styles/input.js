export const input = {
    baseStyle:{
        // shadow: "none",  
        rounded: "lg"      
    },
    sizes:{
        sm: {
            fontSize: 14,
        },
        md: {
            h: 12,
            fontSize: 16
        }
        
    },
    variants: {
        address:{
            // bg: "red.500",
            rounded: "none",
            borderBottomWidth: 1,
            borderBottomColor: "gray.300",            
        },
        outline:{
            _focus:{
                bg: "white"
            }
        },
        underlined: {            
            borderWidth: 0,
            pl: 5,            
        },
        filled: { 
            px: 5,
            borderWidth: 0,
            fontSize: 20,
            _dark:{
                bg: "gray.800",
                color: "gray.200",
                placeholderTextColor: "gray.500",
                _focus:{
                    bg: "gray.700"
                },
                _input:{
                    selectionColor: '#EC1952'
                }
            },
            _light:{
                bg: "gray.100",
                color: "gray.600",
                placeholderTextColor: "gray.400",
                _focus:{
                    bg: "gray.200"
                },
                _input:{
                    selectionColor: '#EC1952'
                }
            },
             
            
        }
    },
    defaultProps:{
        size: "md"        
    }
}