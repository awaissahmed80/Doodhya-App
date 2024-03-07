import React, {useState} from "react"
import { HStack, Input } from "native-base"

export const OTPInput = React.forwardRef(({onChange, ...rest}, ref) => {

    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputs = React.useRef([]);


    const handleChange = (index, value) => {        
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value && index < 5) {
          inputs.current[index + 1].focus()
        }
        
        onChange(newOTP.join(''))
        
    };

    const handleKeyPress = (index, event) => {
        // Move focus to the previous input if the user pressed the delete key
        if (event.nativeEvent.key === 'Backspace' && index > 0) {
          inputs.current[index - 1].focus();
        }
    };

    const renderInputs = () => {
        const inputsJSX = [];
        for (let i = 0; i < 6; i++) {
            const value = otp[i];
            inputsJSX.push(
                <Input 
                    w={10}
                    h={10}
                    key={i}
                    p={0}
                    placeholder={'\u041E'}
                    textAlign="center"
                    maxLength={1}                    
                    keyboardType="numeric"
                    ref={(input) => (inputs.current[i] = input)}
                    value={value || ''}
                    onChangeText={(text) => handleChange(i, text)}
                    onKeyPress={(event) => handleKeyPress(i, event)}
                />            
            );
        }
        return inputsJSX;
    }
    return(
        <HStack alignItems="center" space={1}>
            {renderInputs()}
        </HStack>        
    )

})