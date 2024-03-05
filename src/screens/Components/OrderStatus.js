import React from "react"
import { Tag } from "native-base"
import { toTitleCase } from "../../helpers"
import { Icon } from "../../ui"

export const OrderStatus = ({status, icon}) => {

    switch(status){
        case 'PENDING':
            return(
                <Tag variant="solid" size="sm" colorScheme="yellow">
                    {toTitleCase(status)}
                    {
                        icon &&
                        <Icon ml={2} color="white" size={3} name={icon} />
                    }
                </Tag>
            )
        case 'APPROVED':
            return(
                <Tag variant="solid" size="sm" colorScheme="green">
                    {toTitleCase(status)}
                    {
                        icon &&
                        <Icon ml={2} color="white" size={3} name={icon} />
                    }
                </Tag>
            )
        case 'CANCELLED':
            return(
                <Tag variant="solid" size="sm" colorScheme="red">
                    {toTitleCase(status)}
                    {
                        icon &&
                        <Icon ml={2} color="white" size={3} name={icon} />
                    }
                </Tag>
            )
        case 'ON-HOLD':
            return(
                <Tag variant="solid" size="sm" colorScheme="blue">
                    {toTitleCase(status)}
                    {
                        icon &&
                        <Icon ml={2} color="white" size={3} name={icon} />
                    }
                </Tag>
            )
        case 'Loading':
            return(
                <Tag variant="solid" size="sm" colorScheme="gray">
                    {toTitleCase(status)}...
                </Tag>
            )
        default:
            return(
                <Tag variant="solid" size="sm" colorScheme="gray">{status}</Tag>
            )
        
    }
}
