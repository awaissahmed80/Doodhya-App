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
import areaSlice from './slices/area.slice'
import orderSlice from './slices/order.slice'
import basketSlice from './slices/basket.slice'
import driverSlice from './slices/driver.slice'
import customerSlice from './slices/customer.slice'
import entrySlice from './slices/entry.slice'
import billSlice from './slices/bill.slice'


import { authApi, userApi, itemApi, 
    areaApi, orderApi, driverApi, 
    customerApi, entryApi, billApi
} from './api'



const persistConfig = {
    key: Config.STORAGE_KEY,
    storage: AsyncStorage,
    version: 1,
    whitelist: ['auth', 'basket']    
};


const  rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,        
    [userApi.reducerPath]: userApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [entryApi.reducerPath]: entryApi.reducer,
    [billApi.reducerPath]: billApi.reducer,
    auth: authSlice,
    basket: basketSlice,
    items: itemSlice,
    user: userSlice,   
    areas: areaSlice,
    orders: orderSlice,
    drivers: driverSlice,
    customers: customerSlice,
    entries: entrySlice,
    bills: billSlice

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
        areaApi.middleware,
        orderApi.middleware,
        driverApi.middleware,
        customerApi.middleware,
        entryApi.middleware,
        billApi.middleware 
    ),
});

const persistor = persistStore(AppStore)

export { AppStore, persistor}
