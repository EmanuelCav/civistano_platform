import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { thunk } from 'redux-thunk'
import { EXPO_STORAGE, NODE_ENV } from '@env'

import reducers from './reducer/reducers'

const persistedReducer = persistReducer({
    key: `${EXPO_STORAGE}`,
    version: 1,
    storage: AsyncStorage
}, reducers)

export const makeStore = () => {
    return configureStore({
      reducer: {}
    })
  }

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
    devTools: NODE_ENV !== 'production',
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']