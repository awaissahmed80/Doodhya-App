export const icon_button = {
    baseStyle:{
        shadow: "none",
        _disabled:{
            bg: 'gray.600'
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
    }
}