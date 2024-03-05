export const tag = {
    baseStyle:{
        shadow: "none",        
        _text:{            
            fontWeight: 500,        
        },        
    },
    sizes:{              
        sm:{
            px: 3,
            py:0.5,
            _text:{
                fontSize:14
            }
        },
        md:{
            _text:{
                fontSize: 18
            }
        }
    },
    variants: {               
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
        })        
    }
}