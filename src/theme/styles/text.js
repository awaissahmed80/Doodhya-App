export const text={
    baseStyle:{           
        color: 'gray.700',
        fontWeight: 400,
        _dark:{
            color: "gray.300"
        },
        _light: {
            color: "gray.600"
        },
        fontSize: 16
    },
    sizes:{
        sm: {
            fontSize: 12
        },
        md: {
            fontSize: 15
        },
        lg:{
            fontSize: 16
        }
    },
    variants: {        
        caption_label:{
            textTransform: 'uppercase',
            fontSize: '13px',
            mb: 1,
            fontWeight:800
        },
        caption:{
            textTransform: 'uppercase',
            fontSize: '12px',
            color: 'primary.500'
        },
        caption_small:{
            fontSize: 11,
            fontWeight: 600,            
        },
        "item-caption":{
            fontSize: 13,
            fontWeight: 600,     
            opacity: 0.6       
        },
        value:{            
            fontSize: 15,
            opacity:1,
        },
        label:{
            fontSize: 14,
            fontWeight: 700,
            opacity: 0.55,            
        },
        title:{
            fontSize: 16,
            fontWeight: 600,
            my:1
        },
        "item-title":{
            fontSize: 16,
            fontWeight: 600,
            my:1
        },
        "sub-title":{
            fontSize: 16,
            fontWeight: 800,            
        },
        dim:{
            fontSize: 14,
            fontWeight: 400,
            opacity: 0.65,
            my:1
        },
        info:{
            fontSize: 13,
            opacity:0.75,
            my:1
        },
        small:{
            fontSize: 13,
            opacity:0.55,
            my:1
        },
        price:{
            fontSize: 12,
            fontWeight: 800,
            // _dark:{
            //     color: "primary.500"
            // },
            // _light: {
            //     color: "primary.600"
            // }
        }
    }
}