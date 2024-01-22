import  AsyncStorage  from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'

export const setAuthToken = async (token) => {
    try {
        if(token){
            let app_token = await AsyncStorage.setItem(Config.TOKEN_NAME, token)
            return Promise.resolve(app_token)
        }else{
            await AsyncStorage.removeItem(Config.TOKEN_NAME)
            return Promise.resolve()
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
}
