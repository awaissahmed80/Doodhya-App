import React, { useState, useEffect } from "react"
import { useSelector  } from "react-redux"
import { Box, Popover, Text, } from "native-base"

const Trigger = ( {children, ...props} ) => {
    return(
        <Box>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                return React.cloneElement(child, { ...props });
                }
                return child;
            })}
        </Box>
    )
}
export const DriverPopup = ({id, children, ...rest}) => {
    
    const { drivers } = useSelector(s => s?.drivers)    
    const [ driver, setDriver ] = useState(null)

    useEffect(() => {
      if(id){
        setDriver(drivers?.find(x => x?._id === id))
      }
    }, [id, drivers])

    
    return(       
        <Popover trigger={(props) => Trigger({...props, children})} placement="bottom right">
            <Popover.Content accessibilityLabel="Delete Customerd" w="56">                                    
                <Popover.Body>
                    <Text>{driver?._id}</Text>
                </Popover.Body>        
            </Popover.Content>
      </Popover>        
    )
}