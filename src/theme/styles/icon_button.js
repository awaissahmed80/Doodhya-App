export const icon_button = {
    baseStyle:{
        shadow: "none",
        _disabled:{
            // bg: 'gray.600'
            // colorScheme: "gray"
        }

    },
    variants: {
        "solid": ({colorScheme}) => ({
            ...(
                colorScheme === 'primary' && {
                bg: "primary.500"
            })
        }),
        "star": ({colorScheme}) => ({
            ...({
                    p: 1,
                    _icon: {color: colorScheme+".500", size: 6},
                    _pressed: {bg: colorScheme+".50", _icon:{color: colorScheme+".600"}}
                })
        }),   
        "unstyled":{
            _pressed:{
                opacity: 0.5
            }
        },
        "app-ghost":{                  
            _pressed: {
                opacity: 0.5
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