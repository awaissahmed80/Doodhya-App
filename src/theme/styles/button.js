export const button = {
    baseStyle:{
        shadow: "none",
        
        _text:{            
            fontWeight: 600,        
        },
        _disabled:{
            bg: 'gray.600'
        }
    },
    sizes:{      
        "primary":{
            h:12,            
            _text:{
                fontWeight: 700,
                fontSize: 15,
                px:5,
                py:3
            }
        },  
        xs:{
            px: 3,
            py: 1.5,
            _text:{
                fontSize:12
            }
        },
        sm:{
            px: 3,
            py:1.5,
            _text:{
                fontSize:14
            }
        },
        md:{
            _text:{
                fontSize: 17
            }
        }
    },
    variants: {        
        "solid": ({colorScheme}) => ({            
            ...(
                colorScheme === 'primary' && {
                bg: "primary.500",                
            }),            
        }),
        "subtle": ({colorScheme}) => ({            
            ...(
                {
                    _text:{
                        color: colorScheme+".500",                
                    },
                    _pressed:{
                        color: colorScheme+".500",                
                        bg: colorScheme+".200"
                    }
                }
            ),            
        }),
        "outline": ({colorScheme}) => ({            
            ...(
                {
                borderColor: colorScheme+".500",                
            }),            
        }),

        "tab": ({isActive}) => ({      
            px: 0,      
            borderBottomWidth: 2,
            rounded: "none",

            borderColor: isActive ? "primary.500" : "transparent",            
            _text:{
                px: 0,
                color: "white",
                textTransform: "uppercase"
            }
        }),
        link:{
            px: 0,
            _text:{
                textDecorationLine: 'underline',
                px: 0
            },
            _pressed: {
                opacity: 0.6,
                _text:{
                    textDecorationLine: 'none',
                    px: 0
                },
            }

        },
        "app-ghost":{      
            paddingStart:0,
            _pressed: {
                opacity: 0.5
            },
            _icon:{
                color: "primary.500",
            },
            dark:{
                _text: {color: "white"}
            },
            light:{
                _text: {color: "gray.600"}
            }

        }
    }
}