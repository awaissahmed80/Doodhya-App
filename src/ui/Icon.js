import React from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import {Icon as NBIcon} from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import iconlyConfig from './selection.json'

const Iconly = createIconSetFromIcoMoon(iconlyConfig, 'iconly','iconly.ttf');
Iconly.loadFont();
  


const Icon = React.forwardRef(({name, size, type="ionicon", ...props}, ref) => {      
    let innerSize = 5
    switch(size){
        case "lg":
            innerSize = 6
        break;
        case "sm":
            innerSize = 4
        break;
        case "md":        
            innerSize = 5
        break;
        default:
            innerSize= size
        break;
    }
    
    if(type === "ionicon")
        return(<NBIcon  as={<Ionicon name={name} size={innerSize} />} size={innerSize}  {...props} />)
    if(type === "entypo")
        return(<NBIcon  as={<Entypo name={name} size={innerSize}  />}  size={innerSize} {...props} />)
    if(type === 'fontisto')
        return(<NBIcon  as={<Fontisto name={name} size={innerSize} />} size={innerSize} {...props} />)
    if(type === 'feather')
        return(<NBIcon  as={<Feather name={name} size={innerSize} />} size={innerSize} {...props} />)

    return(<NBIcon  as={<Iconly name={name} size={innerSize} />} size={innerSize} {...props} />)
})
export {Icon}