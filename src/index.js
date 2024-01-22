import React, { useEffect} from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {  AppProvider } from './contexts'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {theme} from './theme'
import { AppStore, persistor } from './redux'
import Routes from './routes'
import { LogBox } from 'react-native'

export default function App (){
    
    useEffect(() => {
        LogBox.ignoreLogs(['Require cycle:']);
        LogBox.ignoreLogs(['Warning:']);
        LogBox.ignoreAllLogs();
    })



    return (     
        <Provider store={AppStore}>            
            <SafeAreaProvider>
                <NativeBaseProvider theme={theme}>
                    <PersistGate loading={null} persistor={persistor}>                                                
                        <AppProvider>
                            <Routes/>
                        </AppProvider>
                    </PersistGate>            
                </NativeBaseProvider>
            </SafeAreaProvider>            
        </Provider>
    )
}