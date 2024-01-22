import React from 'react';
import { Box, Toast as NBToast, Text } from 'native-base'


export const showToast = {
    
    show: (message) => {
        NBToast.show({
            render: () => {
              return (
                <Box bg="blueGray.500" w="100%" minW="100%"  rounded="sm" mb={1}>
                  {message}
                </Box>
              )
            },
            placement: "top"
          })
    },

    error: (message) => {        
        NBToast.show({
            render: () => {
              return (
                <Box  zIndex={999} left={0} right={0} bg="red.500" top={0} mt="-50px" minW="100%"  shadow="md" px="15px" py={5} pt={10}  rounded="none" mb={1}>
                    <Text color="white" fontSize="sm">{message}</Text>
                </Box>
              )
            },      
            width: "100%",
            avoidKeyboard: true,
            placement: "top",
            duration: 3000,
            collapsable: true
          })
    },
    info: (message) => {        
        NBToast.show({
            render: () => {
              return (
                <Box  zIndex={999} left={0} right={0} bg="blue.500" top={0} mt="-50px" minW="100%"  shadow="md" px="15px" py={5} pt={10}  rounded="none" mb={1}>
                    <Text color="white" fontSize="sm">{message}</Text>
                </Box>
              )
            },      
            width: "100%",
            avoidKeyboard: true,
            placement: "top",
            duration: 3000,
            collapsable: true
          })
    },
    warning: (message) => {        
        NBToast.show({
            render: () => {
              return (
                <Box  zIndex={999} left={0} right={0} bg="yellow.500" top={0} mt="-50px" minW="100%"  shadow="md" px="15px" py={5} pt={10}  rounded="none" mb={1}>
                    <Text color="white" fontSize="sm">{message}</Text>
                </Box>
              )
            },      
            width: "100%",
            avoidKeyboard: true,
            placement: "top",
            duration: 3000,
            collapsable: true
          })
    },

    notify_offline: (message, dismiss = null, position="bottom" ) => {
        if (!NBToast.isActive("net_status_online")){
            NBToast.show({
                render: () => {
                return (
                    <Box bg="red.500" top={0}  minW="100%"  shadow="md" w="100%" px="15px" py={3}  rounded="none">
                        <Text color="white" fontSize="sm">{message}</Text>
                    </Box>
                )
                },
                id: "net_status_online",
                placement: position,
                duration: 6000,
                collapsable: true
            })
        }
    },
    notify_online: (message, dismiss = null, position="bottom" ) => {
        NBToast.show({
            render: () => {
              return (
                <Box bg="green.500" bottom={0} minW="100%"  shadow="md" w="100%" px="15px" py={3} rounded="none">
                    <Text color="white" fontSize="sm">{message}</Text>
                </Box>
              )
            },
            id: "net_status_offline",
            placement: position,
            duration: 5000,
            collapsable: true
          })
    },
    success: (message) => {
        NBToast.show({
            render: () => {
              return (
                <Box bg="green.700" zIndex={9999}  bottom={0} shadow="md" w="100%" px="15px" py="8px"  rounded="md" mb={1}>
                    <Text color="white" fontSize="sm">{message}</Text>
                </Box>
              )
            },
            placement: "top",
            duration: 3000
          })
    }

  };