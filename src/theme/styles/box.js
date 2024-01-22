export const box = {
    baseStyle: {
        shadow: "none",
        
    },
    variants: {        
        wrapper:{
            _dark:{
                bg: 'gray.900'
             },
            _light:{
                bg: "white"
            }
        },
        container:{
            _dark:{
                bg: 'gray.900'
             },
            _light:{
                bg: "gray.100"
            }
        },
        itemBox:{
            _dark:{
                bg: 'gray.800',
                borderBottomWidth: 0.5,
                borderStyle: 'solid',
                borderColor: 'gray.700',
                p: 5,

             },
            _light:{
                bg: "white",
                borderBottomWidth: 0.5,
                borderStyle: 'solid',
                borderColor: 'gray.200',
                p: 5,
            }
        }

    }
}