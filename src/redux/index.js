import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'

import authSlice from './slices/auth.slice'
import userSlice from './slices/user.slice'
import itemSlice from './slices/item.slice'

import { authApi, userApi, itemApi } from './api'



const persistConfig = {
    key: Config.STORAGE_KEY,
    storage: AsyncStorage,
    version: 1,
    whitelist: ['auth']    
};


const  rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,        
    [userApi.reducerPath]: userApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    auth: authSlice,
    items: itemSlice,
    user: userSlice,   

})


const persistedReducer = persistReducer(persistConfig, rootReducer)



const AppStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>    
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(
        authApi.middleware,
        itemApi.middleware,
        userApi.middleware,        
    ),
});

const persistor = persistStore(AppStore)

export { AppStore, persistor}
