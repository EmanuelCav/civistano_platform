import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { thunk } from 'redux-thunk'

import reducers from './reducer/reducers'

const persistedReducer = persistReducer({
    key: `civistano_key_storage`,
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
    devTools: false
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']