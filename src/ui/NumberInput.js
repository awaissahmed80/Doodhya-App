import React from "react"
import { Input } from "native-base"

export const NumberInput = ({value, min=0, max=20, onChangeText, ...rest}) => {

    const handleChangeText = (text) => {  
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(text)) {    
            if(parseFloat(text) <= min){
                onChangeText(min+"")
            }
            else if(parseFloat(text) >= max){
                onChangeText(max+"")
            }else{
                onChangeText(text)
            }
            
            
        }
    };

    const handleKeyPress = (nativeEvent) => {
        
        const { key } = nativeEvent;
        // Allow only numbers (0-9) and a single decimal point
        if ((key >= '0' && key <= '9') || key === '.') {
          // Allow the key press
          return;
        }
        // Prevent the default action for other key presses
        nativeEvent.preventDefault();
    };
    

    return(
        <Input                         
            value={value || ''}
            onChangeText={handleChangeText}  
            onKeyPress={handleKeyPress}         
            {...rest}
        />
    )
}