import React, {useState} from "react"
import { Input } from "native-base"
import { Icon } from "."

export const InputPassword = React.forwardRef(({...rest}, ref) => {

    const [ show, setShow ] = useState(false)
    return(
        <Input 
            type={show ? "text" : "password"}
            InputRightElement={<Icon mr={2} name={show ? "eye" : "eye-off"}  onPress={() => setShow(!show)} color={show ? "primary.500" : "gray.500"} size={5} />}
            {...rest}
        />
    )
})