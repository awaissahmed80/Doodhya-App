import  AsyncStorage  from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'

export const getAuthToken = async () => {
    try {
        let token = await AsyncStorage.getItem(Config.TOKEN_NAME);
        return Promise.resolve(token)
    }
    catch (error) {
        return Promise.reject(error);
    }
}